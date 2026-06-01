import { useState, useEffect, useRef, useCallback } from "react";
import { BookOpen, Send, X, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { askAstronomer, SUGGESTED } from "@/data/faq";

interface Msg { id: number; role: "user" | "bot"; text: string; }

function TypeWriter({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setDisplayed("");
    if (!text) return;
    const speed = 15 + Math.random() * 25;
    const interval = setInterval(() => {
      idxRef.current++;
      setDisplayed(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="inline-block w-[2px] h-[14px] bg-solar/70 ml-0.5 animate-pulse-soft align-middle" />}
    </span>
  );
}

export function FaqPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: Date.now(), role: "bot", text: "¡Hola! Soy tu guía de astronomía 🌟 Aquí puedes consultar cualquier duda sobre el Sistema Solar: ¿cómo funciona un eclipse? ¿de qué está hecho Saturno? ¿cuánto dura un día en Marte? Escribe tu pregunta o elige un tema de los sugeridos. ¡Estoy listo!" },
  ]);
  const [botThinking, setBotThinking] = useState(false);
  const [streamingId, setStreamingId] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botThinking]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = useCallback((text?: string) => {
    const q = (text ?? input).trim();
    if (!q || botThinking) return;
    setInput("");
    const userMsg: Msg = { id: Date.now(), role: "user", text: q };
    const botId = Date.now() + 1;
    setMessages((m) => [...m, userMsg, { id: botId, role: "bot", text: "" }]);
    setStreamingId(botId);
    setBotThinking(true);
    setTimeout(() => {
      const answer = askAstronomer(q);
      setMessages((m) => m.map((msg) => msg.id === botId ? { ...msg, text: answer } : msg));
      setBotThinking(false);
      setStreamingId(null);
    }, 400 + Math.random() * 600);
  }, [input, botThinking]);

  const streamingText = messages.find((m) => m.id === streamingId)?.text;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-3 sm:right-5 z-50 size-12 sm:size-14 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition-transform shadow-2xl btn-solar group"
        style={{ background: "linear-gradient(135deg, #FDB813, #F59E0B)" }}
        aria-label="Abrir preguntas frecuentes"
      >
        {open ? <X className="size-6 text-black" /> : <HelpCircle className="size-6 text-black group-hover:animate-spin-soft" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-2 sm:right-5 z-50 w-[calc(100vw-16px)] sm:w-[22rem] h-[60vh] sm:h-[32rem] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-slide-in-up border border-white/10">
          {/* Header */}
          <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-gradient-to-r from-solar/5 via-transparent to-transparent">
            <div className="size-8 rounded-full bg-gradient-to-br from-solar/30 to-amber-500/10 flex items-center justify-center border border-solar/20">
              <BookOpen className="size-4 text-solar" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-display font-semibold flex items-center gap-1.5">
                Preguntas Frecuentes
                <Sparkles className="size-3 text-solar/60" />
              </div>
              <div className="text-[10px] text-muted-foreground">Astronomía · Sistema Solar</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin p-3 space-y-3">
            {messages.map((m, idx) => {
              const isStreaming = m.id === streamingId;
              return (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} ${idx > 0 ? "animate-fade-in" : ""}`}>
                  <div className={`max-w-[90%] text-xs leading-relaxed px-3 py-2.5 rounded-2xl transition-all ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-solar to-amber-400 text-black rounded-br-sm shadow-[0_0_15px_rgba(253,184,19,0.2)]"
                      : "bg-white/[0.04] text-foreground rounded-bl-sm border border-white/5"
                  }`}>
                    {isStreaming && m.text
                      ? <TypeWriter text={m.text} />
                      : m.text || (isStreaming ? <span className="inline-flex gap-1"><span className="size-1.5 rounded-full bg-solar/60 animate-bounce" style={{ animationDelay: "0ms" }} /><span className="size-1.5 rounded-full bg-solar/60 animate-bounce" style={{ animationDelay: "150ms" }} /><span className="size-1.5 rounded-full bg-solar/60 animate-bounce" style={{ animationDelay: "300ms" }} /></span> : null)
                    }
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {!botThinking && (
            <div className="px-3 pb-2 border-t border-white/5 bg-white/[0.02]">
              <div className="text-[10px] text-muted-foreground mb-1.5 font-medium">💡 Preguntas sugeridas:</div>
              <div className="flex flex-wrap gap-1">
                {SUGGESTED
                  .filter((s) => !messages.some((m) => m.role === "user" && m.text.toLowerCase() === s.toLowerCase()))
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 3)
                  .map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-solar/20 hover:border-solar/40 hover:text-solar text-foreground/80 transition-all btn-solar"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-white/10 flex gap-2 bg-white/[0.02]">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-solar/40 focus:bg-white/10 focus:ring-1 focus:ring-solar/20 transition-all placeholder:text-muted-foreground/50"
            />
            <Button type="submit" size="icon" className="size-9 shrink-0 btn-solar" disabled={!input.trim() || botThinking}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
