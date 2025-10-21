import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { start } from 'repl';

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
  const length = images.length;
  const hasLoop = length > 1;
  const [index, setIndex] = useState(() => (hasLoop ? startDot + 1 : startDot));
  const [withTransition, setWithTransition] = useState(true);
  const intervalRef = useRef<number | null>(null);

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

  const nextSlide = useCallback(() => {
    stopAutoplay();
    setIndex(prev => prev + 1);
    startAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const prevSlide = useCallback(() => {
    stopAutoplay();
    setIndex(prev => prev - 1);
    startAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const activeDot = hasLoop ? (index - 1 + length) % length : 0;

  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const widthRef = useRef(1);
  const lockRef = useRef<'x' | 'y' | null>(null);
  const rafMoveRef = useRef<number | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const el = containerRef.current;
      if (!el) return;

      pointerIdRef.current = e.pointerId;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}

      widthRef.current = el.clientWidth || 1;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      lockRef.current = null;

      setDragOffset(0);
      setWithTransition(false);
      stopAutoplay();
    },
    [stopAutoplay],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current === null || e.pointerId !== pointerIdRef.current)
      return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (!lockRef.current) {
      const MIN_LOCK = 6;
      if (Math.abs(dx) < MIN_LOCK && Math.abs(dy) < MIN_LOCK) return;
      lockRef.current = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y';
    }
    if (lockRef.current === 'y') return;

    const clamped = Math.max(-widthRef.current, Math.min(widthRef.current, dx));

    if (rafMoveRef.current == null) {
      rafMoveRef.current = requestAnimationFrame(() => {
        setDragOffset(clamped);
        rafMoveRef.current && cancelAnimationFrame(rafMoveRef.current);
        rafMoveRef.current = null;
      });
    }
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerId !== pointerIdRef.current) return;

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      pointerIdRef.current = null;

      const dx = e.clientX - startXRef.current;
      const dy = e.clientY - startYRef.current;
      const thresholdPx = widthRef.current * 0.15;

      setWithTransition(true);

      if (Math.abs(dx) >= thresholdPx && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          setIndex(p => p + 1);
        } else {
          setIndex(p => p - 1);
        }
      }

      setDragOffset(0);

      startAutoplay();
    },
    [startAutoplay, setIndex],
  );

  const onPointerCancel = useCallback(() => {
    pointerIdRef.current = null;
    setWithTransition(true);
    setDragOffset(0);
    startAutoplay();
  }, [startAutoplay]);

  return {
    slides,
    index,
    withTransition,
    onTransitionEnd,
    goTo,
    nextSlide,
    prevSlide,
    activeDot,

    startAutoplay,
    stopAutoplay,

    // ==== SWIPE ====
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    dragOffset,
  };
};
