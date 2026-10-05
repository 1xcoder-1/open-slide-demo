import { useCallback, useEffect, useState } from 'react';

export type Direction = 'forward' | 'back';

export function useDeckState(total: number) {
  const [state, setState] = useState<{ index: number; direction: Direction }>({
    index: 0,
    direction: 'forward',
  });
  const { index, direction } = state;

  const go = useCallback(
    (next: number) => {
      setState((prev) => {
        const clamped = Math.max(0, Math.min(total - 1, next));
        if (clamped === prev.index) return prev;
        return {
          index: clamped,
          direction: clamped > prev.index ? 'forward' : 'back',
        };
      });
    },
    [total],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          go(0);
          break;
        case 'End':
          e.preventDefault();
          go(total - 1);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, total]);

  return { index, direction, next, prev, go };
}
