"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getFrameList } from "@/lib/framePaths";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { useCanvasFrameScrub } from "@/components/useCanvasFrameScrub";
import { LoadingFallback } from "@/components/LoadingFallback";

export function PlaneMorph() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const srcs = useMemo(() => getFrameList("sequence-2", 120), []);
  const { images, firstFrameReady, isLoading, hasTimedOut } =
    useImagePreloader(srcs);
  const [showStaticFallback, setShowStaticFallback] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!firstFrameReady) setShowStaticFallback(true);
    }, 3000);
    return () => clearTimeout(id);
  }, [firstFrameReady]);

  useCanvasFrameScrub({ canvasRef, images, sectionRef });

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(to_bottom,#0b0b0b,#050505_45%,#020202)]" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black" />
        {!firstFrameReady || isLoading || hasTimedOut ? (
          <LoadingFallback label="Plane Sequence" />
        ) : null}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">
              ENGINEERED MOTION
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.06em] md:text-6xl">
              Form in flight, tuned to intent.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 md:text-base">
              Every frame communicates refinement, speed, and absolute
              composure.
            </p>
          </motion.div>
        </div>
        {showStaticFallback && !firstFrameReady ? (
          <div className="absolute inset-0 z-10 flex items-center bg-[#050505] px-6">
            <div className="mx-auto max-w-7xl">
              <p className="text-xs uppercase tracking-[0.45em] text-white/60">
                ENGINEERED MOTION
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.06em] md:text-6xl">
                Form in flight, tuned to intent.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 md:text-base">
                Every frame communicates refinement, speed, and absolute
                composure.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
