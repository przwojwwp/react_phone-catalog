import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  key: string;
  src: string;
  clone?: 'head' | 'tail';
};

type Options = {
  images: string[];
  autoplayMs?: number;
  startDot?: number;
};

export const useInfinitySlider = ({
  images,
  autoplayMs = 5000,
  startDot = 0,
}: Options) => {
  const [index, setIndex] = useState(() => (hasLoop ? startDot + 1 : startDot));
  const [withTransition, setWithTransition] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const length = images.length;
  const hasLoop = length > 1;

  const slides: Slide[] = useMemo(() => {
    if (!length) return [];

    if (!hasLoop) {
      return images.map((src, i) => ({ key: `img-${i}-${src}`, src }));
    }

    return [
      {
        key: `clone-head-${images[images.length - 1]}`,
        src: `${images[images.length - 1]}`,
        clone: 'head',
      },
      ...images.map((src, i) => ({ key: `img-${i}-${src}`, src })),
      {
        key: `clone-tail-${images[0]}`,
        src: `${images[0]}`,
        clone: 'tail',
      },
    ];
  }, [images, hasLoop, length]);

  const normalizeIndex = useCallback(() => {
    if (!length) return;

    setWithTransition(false);
    setIndex(prev => {
      const dot = (((prev - 1) % length) + length) % length;
      return dot + 1;
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setWithTransition(true));
    });
  }, [length]);

  const startAutoplay = useCallback(() => {
    if (!autoplayMs || !hasLoop) return;
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setIndex(prev => prev + 1);
    }, autoplayMs);
  }, [autoplayMs, hasLoop]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!autoplayMs || !hasLoop) return;

    const run = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        normalizeIndex();
        startAutoplay();
      }
    };

    run();
    document.addEventListener('visibilitychange', run);

    return () => {
      document.removeEventListener('visibilitychange', run);
      stopAutoplay();
    };
  }, [autoplayMs, hasLoop, normalizeIndex, startAutoplay, stopAutoplay]);

  const onTransitionEnd = useCallback(() => {
    if (!hasLoop) return;

    if (index === slides.length - 1) {
      setWithTransition(false);
      setIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    }

    if (index === 0) {
      setWithTransition(false);
      setIndex(length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    }
  }, [hasLoop, index, length, slides.length]);

  const goTo = useCallback(
    (dotIndex: number) => {
      stopAutoplay();
      setIndex(hasLoop ? dotIndex + 1 : dotIndex);
      startAutoplay();
    },
    [hasLoop, startAutoplay, stopAutoplay],
  );

  const activeDot = hasLoop ? (index - 1 + length) % length : 0;

  return {
    slides,
    index,
    withTransition,
    onTransitionEnd,
    goTo,
    activeDot,
    startAutoplay,
    stopAutoplay,
    hasLoop,
  };
};
