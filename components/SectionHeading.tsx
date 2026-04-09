"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto max-w-3xl px-6 text-center"
    >
      <p className="text-xs uppercase tracking-[0.45em] text-white/55">{eyebrow}</p>
      <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] text-white md:text-6xl">{title}</h2>
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/65 md:text-base">{description}</p>
    </motion.div>
  );
}
