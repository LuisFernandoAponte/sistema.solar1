import { useEffect, useRef } from "react";
import { useSimStore } from "@/store/useSimStore";
import { PLANETS } from "@/data/planets";

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function getMasterGain(): GainNode {
  getAudioCtx();
  return masterGain!;
}

function rampTo(param: AudioParam, value: number, timeConst: number) {
  param.setTargetAtTime(value, getAudioCtx().currentTime, timeConst);
}

function createPhaser(ctx: AudioContext, destination: AudioNode) {
  const stages = 6;
  const inputGain = ctx.createGain();
  inputGain.gain.value = 1;

  const allpassFilters: BiquadFilterNode[] = [];
  let lastNode: AudioNode = inputGain;

  for (let i = 0; i < stages; i++) {
    const filter = ctx.createBiquadFilter();
    filter.type = "allpass";
    filter.frequency.value = 400 + i * 300;
    filter.Q.value = 2;
    lastNode.connect(filter);
    lastNode = filter;
    allpassFilters.push(filter);
  }

  lastNode.connect(destination);

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 1200;
  lfo.connect(lfoGain);

  allpassFilters.forEach((f) => {
    lfoGain.connect(f.frequency);
  });

  lfo.start();
}

function createReverb(ctx: AudioContext, destination: AudioNode) {
  const dryGain = ctx.createGain();
  dryGain.gain.value = 1;
  dryGain.connect(destination);

  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.35;

  const delay1 = ctx.createDelay(2);
  delay1.delayTime.value = 0.08;
  const delay2 = ctx.createDelay(2);
  delay2.delayTime.value = 0.12;
  const delay3 = ctx.createDelay(2);
  delay3.delayTime.value = 0.17;
  const delay4 = ctx.createDelay(2);
  delay4.delayTime.value = 0.23;

  const feedback1 = ctx.createGain();
  feedback1.gain.value = 0.4;
  const feedback2 = ctx.createGain();
  feedback2.gain.value = 0.35;
  const feedback3 = ctx.createGain();
  feedback3.gain.value = 0.3;
  const feedback4 = ctx.createGain();
  feedback4.gain.value = 0.25;

  const filter1 = ctx.createBiquadFilter();
  filter1.type = "lowpass";
  filter1.frequency.value = 3000;
  const filter2 = ctx.createBiquadFilter();
  filter2.type = "lowpass";
  filter2.frequency.value = 3000;

  const merger = ctx.createChannelMerger(2);
  const splitter = ctx.createChannelSplitter(2);

  const leftDelay = ctx.createDelay(2);
  leftDelay.delayTime.value = 0.07;
  const rightDelay = ctx.createDelay(2);
  rightDelay.delayTime.value = 0.11;

  wetGain.connect(splitter);
  splitter.connect(leftDelay, 0);
  splitter.connect(rightDelay, 1);

  leftDelay.connect(delay1);
  rightDelay.connect(delay2);
  leftDelay.connect(delay3);
  rightDelay.connect(delay4);

  delay1.connect(feedback1);
  delay2.connect(feedback2);
  delay3.connect(feedback3);
  delay4.connect(feedback4);

  feedback1.connect(merger, 0, 0);
  feedback2.connect(merger, 0, 1);
  feedback3.connect(merger, 0, 0);
  feedback4.connect(merger, 0, 1);

  feedback1.connect(filter1);
  filter1.connect(leftDelay);
  feedback2.connect(filter2);
  filter2.connect(rightDelay);

  merger.connect(destination);

  return { wetGain, dryGain };
}

function createStarTwinkler(ctx: AudioContext, destination: AudioNode, starCount: number) {
  const starData: {
    panner: StereoPannerNode;
    gain: GainNode;
    freq: number;
    nextTime: number;
    interval: number;
    vol: number;
  }[] = [];

  for (let i = 0; i < starCount; i++) {
    const panner = ctx.createStereoPanner();
    panner.pan.value = Math.random() * 1.6 - 0.8;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 800 + Math.random() * 2400;
    filter.Q.value = 6 + Math.random() * 4;

    gain.connect(filter);
    filter.connect(panner);
    panner.connect(destination);

    starData.push({
      panner,
      gain,
      freq: 800 + Math.random() * 2400,
      nextTime: Math.random() * 5,
      interval: 2 + Math.random() * 6,
      vol: 0.04 + Math.random() * 0.06,
    });
  }

  let running = true;

  function scheduleTwinkle(starIdx: number) {
    if (!running) return;
    const star = starData[starIdx];
    const now = ctx.currentTime;

    if (star.nextTime <= now) {
      const attack = 0.3 + Math.random() * 0.5;
      const sustain = 0.4 + Math.random() * 0.8;
      const release = 0.6 + Math.random() * 1.2;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = star.freq + (Math.random() - 0.5) * 100;

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(star.vol, now + attack);
      oscGain.gain.linearRampToValueAtTime(star.vol * 0.6, now + attack + sustain);
      oscGain.gain.linearRampToValueAtTime(0, now + attack + sustain + release);

      osc.connect(oscGain);
      oscGain.connect(star.gain);
      osc.start(now);
      osc.stop(now + attack + sustain + release + 0.05);

      star.nextTime = now + 1.5 + Math.random() * 5;
    }

    const delay = Math.max(0, star.nextTime - ctx.currentTime);
    setTimeout(() => scheduleTwinkle(starIdx), delay * 1000 + 50);
  }

  for (let i = 0; i < starCount; i++) {
    const delay = starData[i].nextTime * 1000;
    setTimeout(() => scheduleTwinkle(i), delay);
  }

  return { starData };
}

function createSpaceWind(ctx: AudioContext, destination: AudioNode) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter1 = ctx.createBiquadFilter();
  filter1.type = "lowpass";
  filter1.frequency.value = 400;
  filter1.Q.value = 1;

  const filter2 = ctx.createBiquadFilter();
  filter2.type = "highpass";
  filter2.frequency.value = 80;
  filter2.Q.value = 1;

  const gain = ctx.createGain();
  gain.gain.value = 0.06;

  const lfoFreq = ctx.createOscillator();
  const lfoFreqGain = ctx.createGain();
  lfoFreq.type = "sine";
  lfoFreq.frequency.value = 0.03;
  lfoFreqGain.gain.value = 350;
  lfoFreq.connect(lfoFreqGain);
  lfoFreqGain.connect(filter1.frequency);
  lfoFreq.start();

  const lfoVol = ctx.createOscillator();
  const lfoVolGain = ctx.createGain();
  lfoVol.type = "sine";
  lfoVol.frequency.value = 0.06;
  lfoVolGain.gain.value = 0.03;
  lfoVol.connect(lfoVolGain);
  lfoVolGain.connect(gain.gain);
  lfoVol.start();

  noise.connect(filter1);
  filter1.connect(filter2);
  filter2.connect(gain);
  gain.connect(destination);
  noise.start();

  return { noise, gain, lfoFreq, lfoFreqGain, lfoVol, lfoVolGain, filter1, filter2 };
}

function createPadTone(ctx: AudioContext, destination: AudioNode, baseFreq: number, detuneAmount: number) {
  const mixGain = ctx.createGain();
  mixGain.gain.value = 0;
  mixGain.connect(destination);

  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = baseFreq;
  osc1.detune.value = -detuneAmount;

  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = baseFreq;
  osc2.detune.value = detuneAmount;

  const osc3 = ctx.createOscillator();
  osc3.type = "triangle";
  osc3.frequency.value = baseFreq * 2.01;
  osc3.detune.value = -detuneAmount * 0.5;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;
  filter.Q.value = 3;

  const gain1 = ctx.createGain();
  gain1.gain.value = 0.12;
  const gain2 = ctx.createGain();
  gain2.gain.value = 0.12;
  const gain3 = ctx.createGain();
  gain3.gain.value = 0.04;

  osc1.connect(gain1);
  osc2.connect(gain2);
  osc3.connect(gain3);
  gain1.connect(filter);
  gain2.connect(filter);
  gain3.connect(filter);
  filter.connect(mixGain);

  osc1.start();
  osc2.start();
  osc3.start();

  return mixGain;
}

function createPlanetTone(planetId: string, baseFreq: number) {
  const ctx = getAudioCtx();
  const master = getMasterGain();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.value = baseFreq;

  filter.type = "lowpass";
  filter.frequency.value = baseFreq * 4;
  filter.Q.value = 2;

  gain.gain.value = 0;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start();

  return { osc, gain };
}

const planetTones = new Map<string, { osc: OscillatorNode; gain: GainNode }>();

export function useSpatialAudio() {
  const { soundEnabled, soundVolume, timeScale } = useSimStore();
  const initialized = useRef(false);
  const reverbWetRef = useRef<GainNode | null>(null);
  const windRef = useRef<ReturnType<typeof createSpaceWind> | null>(null);
  const padGainRef = useRef<GainNode | null>(null);
  const twinklerRef = useRef<ReturnType<typeof createStarTwinkler> | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const ctx = getAudioCtx();
    const master = getMasterGain();

    const fxBus = ctx.createGain();
    fxBus.gain.value = 1;
    fxBus.connect(master);

    const starsBus = ctx.createGain();
    starsBus.gain.value = 1;
    starsBus.connect(master);

    const { wetGain, dryGain } = createReverb(ctx, fxBus);
    reverbWetRef.current = wetGain;

    createPhaser(ctx, dryGain);

    const wind = createSpaceWind(ctx, fxBus);
    windRef.current = wind;

    const padGain = createPadTone(ctx, fxBus, 32, 5);
    padGainRef.current = padGain;

    const lowPad = createPadTone(ctx, fxBus, 24, 8);

    const twinkler = createStarTwinkler(ctx, starsBus, 16);
    twinklerRef.current = twinkler;

    setTimeout(() => {
      rampTo(padGain.gain, 0.25, 1);
      rampTo(lowPad.gain, 0.2, 1.5);
    }, 500);
  }, []);

  useEffect(() => {
    const ctx = getAudioCtx();
    if (soundEnabled) {
      masterGain!.gain.setValueAtTime(soundVolume, ctx.currentTime);
    } else {
      masterGain!.gain.setValueAtTime(0, ctx.currentTime);
    }
  }, [soundEnabled, soundVolume]);

  useEffect(() => {
    const t = timeScale;
    if (windRef.current) {
      rampTo(windRef.current.gain.gain, 0.04 + t * 0.004, 0.5);
      rampTo(windRef.current.filter1.frequency, 200 + t * 20, 0.5);
    }
  }, [timeScale]);

  useEffect(() => {
    if (!soundEnabled) return;

    PLANETS.forEach((p) => {
      if (!planetTones.has(p.id)) {
        const freq = 60 + (PLANETS.indexOf(p) * 30);
        const tone = createPlanetTone(p.id, freq);
        planetTones.set(p.id, tone);
      }
    });
  }, [soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) return;

    const interval = setInterval(() => {
      if (!useSimStore.getState().soundEnabled) return;

      const selected = useSimStore.getState().selectedPlanet;
      const vol = useSimStore.getState().soundVolume;

      PLANETS.forEach((p) => {
        const entry = planetTones.get(p.id);
        if (!entry) return;

        if (selected === p.id) {
          rampTo(entry.gain.gain, vol * 0.5, 0.08);
          rampTo(entry.osc.frequency, 80 + (PLANETS.indexOf(p) * 40), 0.05);
        } else if (selected) {
          rampTo(entry.gain.gain, vol * 0.03, 0.08);
        } else {
          rampTo(entry.gain.gain, vol * 0.07, 0.08);
          rampTo(entry.osc.frequency, 60 + (PLANETS.indexOf(p) * 30), 0.05);
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  return null;
}
