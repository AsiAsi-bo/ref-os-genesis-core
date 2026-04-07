import { useEffect, useRef } from 'react';

interface TouchGestureOptions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  edgeThreshold?: number; // pixels from edge to trigger edge swipes
  minSwipeDistance?: number;
}

export const useTouchGestures = (
  ref: React.RefObject<HTMLElement>,
  options: TouchGestureOptions
) => {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const {
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    edgeThreshold = 30,
    minSwipeDistance = 50,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;
      const elapsed = Date.now() - touchStart.current.time;
      const startY = touchStart.current.y;
      const startX = touchStart.current.x;
      const screenH = window.innerHeight;

      // Only count fast swipes
      if (elapsed > 500) { touchStart.current = null; return; }

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDy > absDx && absDy > minSwipeDistance) {
        if (dy < 0 && startY > screenH - edgeThreshold && onSwipeUp) {
          onSwipeUp();
        } else if (dy > 0 && startY < edgeThreshold && onSwipeDown) {
          onSwipeDown();
        }
      } else if (absDx > absDy && absDx > minSwipeDistance) {
        if (dx < 0 && onSwipeLeft) onSwipeLeft();
        if (dx > 0 && onSwipeRight) onSwipeRight();
      }

      touchStart.current = null;
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, edgeThreshold, minSwipeDistance]);
};
