"use client";

import { RefObject, useEffect, useState } from "react";

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const width = canvas.width;
  const height = canvas.height;
  const imageRatio = img.width / img.height;
  const canvasRatio = width / height;

  let sx = 0;
  let sy = 0;
  let sWidth = img.width;
  let sHeight = img.height;

  if (imageRatio > canvasRatio) {
    sWidth = img.height * canvasRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    sHeight = img.width / canvasRatio;
    sy = (img.height - sHeight) / 2;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
}

export function useCanvasFrameScrub({
  canvasRef,
  images,
  sectionRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  images: (HTMLImageElement | null)[];
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const current = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? current / total : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const index = Math.round(progress * (images.length - 1));
    let fallback: HTMLImageElement | null = null;
    for (let i = images.length - 1; i >= 0; i -= 1) {
      if (images[i]) {
        fallback = images[i];
        break;
      }
    }
    const img = images[index] ?? fallback;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      drawCover(ctx, img, canvas);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [canvasRef, images, progress]);
}
