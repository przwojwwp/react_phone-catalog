import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type MutableRefObject,
  type PointerEvent,
  type RefObject,
  type SetStateAction,
} from 'react';

type UseSliderSwipeParams = {
  containerRef: RefObject<HTMLDivElement | null>;
  isTransitioningRef: MutableRefObject<boolean>;
  startAnimatedTransition: (nextIndex: number) => boolean;
  indexRef: MutableRefObject<number>;
  setWithTransition: Dispatch<SetStateAction<boolean>>;
  stopAutoplay: () => void;
  startAutoplay: () => void;
  clamp: (value: number, max: number) => number;
};

export const useSliderSwipe = ({
  containerRef,
  isTransitioningRef,
  startAnimatedTransition,
  indexRef,
  setWithTransition,
  stopAutoplay,
  startAutoplay,
  clamp,
}: UseSliderSwipeParams) => {
  const [dragOffset, setDragOffset] = useState(0);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const widthRef = useRef(1);
  const pendingDragOffsetRef = useRef(0);
  const rafMoveRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const cancelMoveFrame = useCallback(() => {
    if (rafMoveRef.current !== null) {
      cancelAnimationFrame(rafMoveRef.current);
      rafMoveRef.current = null;
    }
  }, []);

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (isTransitioningRef.current) return;

    const el = containerRef.current;
    if (!el) return;

    pointerIdRef.current = e.pointerId;

    try {
      el.setPointerCapture(e.pointerId);
    } catch {}

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
  }, [cancelMoveFrame, containerRef, isTransitioningRef, setWithTransition, stopAutoplay]);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
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
  }, [clamp]);

  const onPointerUp = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerId !== pointerIdRef.current) return;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

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
  }, [
    cancelMoveFrame,
    indexRef,
    isTransitioningRef,
    setWithTransition,
    startAnimatedTransition,
    startAutoplay,
  ]);

  const onPointerCancel = useCallback(() => {
    pointerIdRef.current = null;
    cancelMoveFrame();
    pendingDragOffsetRef.current = 0;
    isTransitioningRef.current = isDraggingRef.current;
    isDraggingRef.current = false;
    setWithTransition(true);
    setDragOffset(0);
    startAutoplay();
  }, [cancelMoveFrame, isTransitioningRef, setWithTransition, startAutoplay]);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, dragOffset, cancelMoveFrame, isDraggingRef };
};
