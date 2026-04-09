"use client";

import { motion } from "framer-motion";

export function Globe() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] px-6 py-24 md:py-36">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-45"
          src="/globe-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">GLOBAL REACH</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.06em] md:text-6xl">
            A world that moves at your pace.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Hairo Jets pairs private aviation with white-glove coordination across every touchpoint.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a className="rounded-full border border-white/20 bg-white px-6 py-3 text-xs uppercase tracking-[0.3em] text-black transition hover:bg-white/90" href="#">
              Request Charter
            </a>
            <a className="rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:border-white/35" href="#fleet">
              View Fleet
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
