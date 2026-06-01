import { motion } from "framer-motion";
import { X, Calendar, Zap } from "lucide-react";
import { useSimStore } from "@/store/useSimStore";
import React from "react";

type EventData = {
  title: string;
  date: string;
  aproxima: string;
  speed: string;
  probability: string;
  description?: string;
};

export function EventModal({ open, onClose, event }: { open: boolean; onClose: () => void; event: EventData | null }) {
  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-2xl glass p-6 text-white shadow-2xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
        <button className="absolute right-4 top-4 p-2 rounded-md hover:bg-white/5" onClick={onClose} aria-label="Cerrar">
          <X />
        </button>

        <div className="flex gap-6">
          <div className="w-32 flex-shrink-0 flex items-center justify-center">
            <div className="meteor relative w-20 h-20">
              <div className="meteor-core w-6 h-6 rounded-full bg-[#e6b75a] shadow-[0_0_20px_rgba(230,183,90,0.25)] absolute left-6 top-6" />
              <div className="meteor-tail absolute left-0 top-10 w-24 h-1 bg-gradient-to-r from-[#e6b75a]/0 to-[#e6b75a] rotate-[-20deg]" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-display font-bold">{event.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2"><Calendar className="size-4" /> {event.date}</div>
            <p className="mt-3 text-sm text-white/90">{event.description}</p>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Aproximación</div>
                <div className="font-bold mt-1">{event.aproxima}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Velocidad</div>
                <div className="font-bold mt-1">{event.speed}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-xs text-muted-foreground">Probabilidad</div>
                <div className="font-bold mt-1">{event.probability}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-solar text-black font-medium">Seguir evento</button>
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10">Ver detalles</button>
            </div>
          </div>
        </div>
      </motion.div>
      </div>

      <style>{`
        .meteor { filter: drop-shadow(0 6px 18px rgba(0,0,0,0.6)); }
        .meteor-core { transform: translate(-50%, -50%); left: 50%; top: 30%; }
        .meteor-tail { opacity: 0.9; }
      `}</style>
    </div>
  );
}

export default EventModal;
