import { useEffect, useState } from "react";

const cache = new Map<string, HTMLImageElement>();

export function useImagePreloader(srcs: string[]) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const firstFrameReady = Boolean(images[0]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function preload() {
      setIsLoading(true);
      setError(null);
      setImages([]);
      setHasTimedOut(false);

      timeoutId = setTimeout(() => {
        if (!cancelled) setHasTimedOut(true);
      }, 3000);

      try {
        const loadImage = (src: string) =>
          new Promise<HTMLImageElement | null>((resolve) => {
            const cached = cache.get(src);
            if (cached?.complete) {
              resolve(cached);
              return;
            }

            const img = new Image();
            img.src = src;
            img.onload = () => {
              cache.set(src, img);
              resolve(img);
            };
            img.onerror = () => {
              if (!cancelled) setError(new Error(`Failed to load ${src}`));
              resolve(null);
            };
          });

        const first = await loadImage(srcs[0]);
        if (!cancelled && first) setImages([first]);

        void Promise.all(
          srcs.slice(1).map(async (src, offset) => {
            const img = await loadImage(src);
            if (!cancelled && img) {
              setImages((current) => {
                const next = current.slice();
                next[offset + 1] = img;
                return next.filter(Boolean);
              });
            }
          }),
        );
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error("Failed to preload images"));
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
        if (!cancelled) setIsLoading(false);
      }
    }

    void preload();
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [srcs]);

  return {
    images,
    firstFrameReady,
    isLoading,
    hasTimedOut,
    error,
  };
}
