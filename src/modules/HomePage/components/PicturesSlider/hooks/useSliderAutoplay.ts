import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

type UserSliderAutoplayParams = {
  autoplayMs?: number;
  hasLoop?: boolean;
  slidesLength: number;
  indexRef: MutableRefObject<number>;
  normalizeIndex: () => void;
  startAnimatedTransition: (nextIndex: number) => boolean;
}

export const useSliderAutoplay = ({
  autoplayMs,
  hasLoop,
  slidesLength,
  indexRef,
  normalizeIndex,
  startAnimatedTransition,
}: UserSliderAutoplayParams) => {
    const intervalRef = useRef<number | null>(null);

    const stopAutoplay = useCallback(() => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);

    const startAutoplay = useCallback(() => {
      if (!autoplayMs || !hasLoop) return;
      stopAutoplay();
      intervalRef.current = window.setInterval(() => {
        startAnimatedTransition(indexRef.current + 1);
      }, autoplayMs);
    }, [autoplayMs, hasLoop, startAnimatedTransition, stopAutoplay, indexRef]);


    useEffect(() => {
      if (!autoplayMs || !hasLoop) {
        stopAutoplay();
        return;
      }

      const run = () => {
        if (document.hidden) {
          stopAutoplay();
          return;
        }

        if (indexRef.current <= 0 || indexRef.current >= slidesLength - 1) {
          normalizeIndex();
        }

        startAutoplay();
      };

      run();
      document.addEventListener('visibilitychange', run);

      return () => {
        document.removeEventListener('visibilitychange', run);
        stopAutoplay();
      };
    }, [
      autoplayMs,
      hasLoop,
      indexRef,
      normalizeIndex,
      slidesLength,
      startAutoplay,
      stopAutoplay,
    ]);

  return { stopAutoplay, startAutoplay };
};
