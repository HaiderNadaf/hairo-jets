"use client";

import { useEffect } from "react";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  images: HTMLImageElement[];
  sectionRef: React.RefObject<HTMLElement>;
};

export function useCanvasFrameScrub({ canvasRef, images, sectionRef }: Props) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let ticking = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frame);
    };

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height,
      );

      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const updateFrame = () => {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const sectionTop = scrollTop + rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      const progress = Math.min(
        Math.max((scrollTop - sectionTop) / sectionHeight, 0),
        1,
      );

      const newFrame = Math.floor(progress * (images.length - 1));

      if (newFrame !== frame) {
        frame = newFrame;
        drawFrame(frame);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateFrame();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    drawFrame(0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [images, canvasRef, sectionRef]);
}
