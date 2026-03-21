import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSliderAutoplay } from './useSliderAutoplay';
import { useSliderSwipe } from './useSliderSwipe';
import {
  buildSlides,
  clamp,
  clampFiniteIndex,
  getNormalizedLoopIndex,
} from './slider.utils';

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

  const safeStartDot = Math.max(0, Math.min(length - 1, startDot));

  const [index, setIndex] = useState(() =>
    hasLoop ? safeStartDot + 1 : safeStartDot,
  );
  const [withTransition, setWithTransition] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(index);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // ================= SLIDES =================
  const slides = useMemo(() => buildSlides(images, hasLoop), [images, hasLoop]);

  const resetTransition = useCallback(() => {
    setWithTransition(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setWithTransition(true);
        isTransitioningRef.current = false;
      });
    });
  }, []);

  const finishImmediateJump = useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex);
      resetTransition();
    },
    [resetTransition],
  );

  const normalizeIndex = useCallback(() => {
    if (!hasLoop || !length) {
      isTransitioningRef.current = false;
      return;
    }

    const nextIndex = getNormalizedLoopIndex(indexRef.current, length);

    if (nextIndex === indexRef.current) {
      isTransitioningRef.current = false;
      return;
    }

    finishImmediateJump(nextIndex);
  }, [finishImmediateJump, getNormalizedLoopIndex, hasLoop, length]);

  const startAnimatedTransition = useCallback(
    (nextIndex: number) => {
      if (!length || isTransitioningRef.current) return false;

      const resolved = hasLoop ? nextIndex : clampFiniteIndex(nextIndex, length);

      if (resolved === indexRef.current) return false;
      isTransitioningRef.current = true;
      setWithTransition(true);
      setIndex(resolved);
      return true;
    },
    [clampFiniteIndex, hasLoop, length],
  );

  // ================= AUTOPLAY =================
  const { startAutoplay, stopAutoplay } = useSliderAutoplay({
    autoplayMs,
    hasLoop,
    slidesLength: slides.length,
    indexRef,
    normalizeIndex,
    startAnimatedTransition,
  });

  // ================= TRANSITION =================
  const onTransitionEnd = useCallback(() => {
    if (!isTransitioningRef.current) return;
    if (!hasLoop) { isTransitioningRef.current = false; return; }

    if (index <= 0 || index >= slides.length - 1) {
      finishImmediateJump(getNormalizedLoopIndex(index, length));
    }
    else isTransitioningRef.current = false;
  }, [finishImmediateJump, getNormalizedLoopIndex, hasLoop, index, length, slides.length]);

  // ================= NAV =================
  const goTo = useCallback((dot: number) => {
    stopAutoplay();
    startAnimatedTransition(hasLoop ? dot + 1 : dot);
    startAutoplay();
  }, [hasLoop, startAnimatedTransition, startAutoplay, stopAutoplay]);

  const nextSlide = useCallback(() => { stopAutoplay(); startAnimatedTransition(indexRef.current + 1); startAutoplay(); }, [startAnimatedTransition, startAutoplay, stopAutoplay]);
  const prevSlide = useCallback(() => { stopAutoplay(); startAnimatedTransition(indexRef.current - 1); startAutoplay(); }, [startAnimatedTransition, startAutoplay, stopAutoplay]);

  const activeDot = length
    ? hasLoop
      ? getNormalizedLoopIndex(index, length) - 1
      : clampFiniteIndex(index, length)
    : 0;

  // ================= SWIPE =================
  const { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, dragOffset, isDraggingRef } = useSliderSwipe({
    containerRef,
    isTransitioningRef,
    startAnimatedTransition,
    indexRef,
    setWithTransition,
    stopAutoplay,
    startAutoplay,
    clamp,
  });

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
    containerRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    dragOffset,
    isDraggingRef,
  };
};
