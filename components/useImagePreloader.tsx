"use client";

import { useEffect, useState } from "react";

export function useImagePreloader(srcs: string[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [firstFrameReady, setFirstFrameReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasTimedOut, setHasTimedOut] = useState<boolean>(false);

  useEffect(() => {
    if (!srcs || srcs.length === 0) return;

    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];

    // ✅ Load first frame fast
    const firstImg = new Image();
    firstImg.src = srcs[0];
    firstImg.onload = () => {
      if (!isMounted) return;

      setFirstFrameReady(true);
      loadedImages[0] = firstImg;
      setImages([firstImg]);
    };

    // ✅ Load rest in background
    const loadRest = () => {
      srcs.slice(1).forEach((src, index) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
          if (!isMounted) return;

          loadedImages[index + 1] = img;

          setImages((prev) => {
            const updated = [...prev];
            updated[index + 1] = img;
            return updated;
          });
        };
      });

      setIsLoading(false);
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(loadRest);
    } else {
      setTimeout(loadRest, 500);
    }

    const timeout = setTimeout(() => {
      if (isMounted) setHasTimedOut(true);
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [srcs]);

  return { images, firstFrameReady, isLoading, hasTimedOut };
}
