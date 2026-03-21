import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSliderAutoplay } from './useSliderAutoplay';

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

  const safeStartDot = Math.max(0, Math.min(length - 1, startDot));

  const [index, setIndex] = useState(() =>
    hasLoop ? safeStartDot + 1 : safeStartDot,
  );
  const [withTransition, setWithTransition] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);

  const rafMoveRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);

  const widthRef = useRef(1);
  const pendingDragOffsetRef = useRef(0);

  const indexRef = useRef(index);
  const isTransitioningRef = useRef(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // ================= SLIDES =================
  const slides: Slide[] = useMemo(() => {
    if (!length) return [];
    if (!hasLoop) return images.map((src, i) => ({ key: `img-${i}-${src}`, src }));
    return [
      { key: `clone-head-${images[length - 1]}`, src: images[length - 1], clone: 'head' },
      ...images.map((src, i) => ({ key: `img-${i}-${src}`, src })),
      { key: `clone-tail-${images[0]}`, src: images[0], clone: 'tail' },
    ];
  }, [images, hasLoop, length]);

  const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

  const clampFiniteIndex = useCallback(
    (value: number) => (length ? Math.max(0, Math.min(length - 1, value)) : 0),
    [length],
  );

  const getNormalizedLoopIndex = useCallback(
    (value: number) => {
      if (!length) return 0;
      const dot = (((value - 1) % length) + length) % length;
      return dot + 1;
    },
    [length],
  );

  const cancelMoveFrame = useCallback(() => {
    if (rafMoveRef.current !== null) {
      cancelAnimationFrame(rafMoveRef.current);
      rafMoveRef.current = null;
    }
  }, []);

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
    const nextIndex = getNormalizedLoopIndex(indexRef.current);
    if (nextIndex === indexRef.current) {
      isTransitioningRef.current = false;
      return;
    }
    finishImmediateJump(nextIndex);
  }, [finishImmediateJump, getNormalizedLoopIndex, hasLoop, length]);

  const startAnimatedTransition = useCallback(
    (nextIndex: number) => {
      if (!length || isTransitioningRef.current) return false;
      const resolved = hasLoop ? nextIndex : clampFiniteIndex(nextIndex);
      if (resolved === indexRef.current) return false;
      isTransitioningRef.current = true;
      setWithTransition(true);
      setIndex(resolved);
      return true;
    },
    [clampFiniteIndex, hasLoop, length],
  );

  // ================= AUTOPLAY =================

  const {startAutoplay, stopAutoplay} = useSliderAutoplay({
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
    if (index <= 0 || index >= slides.length - 1) finishImmediateJump(getNormalizedLoopIndex(index));
    else isTransitioningRef.current = false;
  }, [finishImmediateJump, getNormalizedLoopIndex, hasLoop, index, slides.length]);

  // ================= NAV =================
  const goTo = useCallback((dot: number) => {
    stopAutoplay();
    startAnimatedTransition(hasLoop ? dot + 1 : dot);
    startAutoplay();
  }, [hasLoop, startAnimatedTransition, startAutoplay, stopAutoplay]);

  const nextSlide = useCallback(() => { stopAutoplay(); startAnimatedTransition(indexRef.current + 1); startAutoplay(); }, [startAnimatedTransition, startAutoplay, stopAutoplay]);
  const prevSlide = useCallback(() => { stopAutoplay(); startAnimatedTransition(indexRef.current - 1); startAutoplay(); }, [startAnimatedTransition, startAutoplay, stopAutoplay]);

  const activeDot = length ? (hasLoop ? getNormalizedLoopIndex(index) - 1 : clampFiniteIndex(index)) : 0;

  // ================= SWIPE =================
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (isTransitioningRef.current) return;
    const el = containerRef.current; if (!el) return;
    pointerIdRef.current = e.pointerId;
    try { el.setPointerCapture(e.pointerId); } catch {}
    widthRef.current = el.clientWidth || 1;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startTimeRef.current = performance.now();
    isDraggingRef.current = false;
    cancelMoveFrame();
    pendingDragOffsetRef.current = 0;
    setDragOffset(0);
    setWithTransition(false);
    stopAutoplay();
  }, [cancelMoveFrame, stopAutoplay]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current === null || e.pointerId !== pointerIdRef.current) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (Math.abs(dy) > Math.abs(dx)) return; // soft check osi

    isDraggingRef.current = true;
    pendingDragOffsetRef.current = clamp(dx, widthRef.current);

    if (rafMoveRef.current === null) {
      rafMoveRef.current = requestAnimationFrame(() => {
        setDragOffset(pendingDragOffsetRef.current);
        rafMoveRef.current = null;
      });
    }
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== pointerIdRef.current) return;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;
    const dt = performance.now() - startTimeRef.current;
    const velocity = dx / dt;
    const thresholdPx = widthRef.current * 0.15;

    const isHorizontal = Math.abs(dx) > Math.abs(dy);
    const isFlick = Math.abs(velocity) > 0.5;
    const shouldSlide = isHorizontal && (Math.abs(dx) > thresholdPx || isFlick);

    pointerIdRef.current = null;
    cancelMoveFrame();
    pendingDragOffsetRef.current = 0;
    setWithTransition(true);

    if (shouldSlide) startAnimatedTransition(indexRef.current + (dx < 0 ? 1 : -1));
    else isTransitioningRef.current = isDraggingRef.current;

    isDraggingRef.current = false;
    setDragOffset(0);
    startAutoplay();
  }, [cancelMoveFrame, startAnimatedTransition, startAutoplay]);

  const onPointerCancel = useCallback(() => {
    pointerIdRef.current = null;
    cancelMoveFrame();
    pendingDragOffsetRef.current = 0;
    isTransitioningRef.current = isDraggingRef.current;
    isDraggingRef.current = false;
    setWithTransition(true);
    setDragOffset(0);
    startAutoplay();
  }, [cancelMoveFrame, startAutoplay]);

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
