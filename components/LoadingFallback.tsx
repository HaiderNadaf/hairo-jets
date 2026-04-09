"use client";

import { motion } from "framer-motion";

export function LoadingFallback({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),rgba(5,5,5,0.96)_65%)]">
      <div className="text-center">
        <motion.div
          className="mx-auto h-10 w-10 rounded-full border border-white/15 border-t-white/80"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-5 text-[10px] uppercase tracking-[0.45em] text-white/55">{label}</p>
        <p className="mt-2 text-sm text-white/75">Preparing cinematic frames</p>
      </div>
    </div>
  );
}
