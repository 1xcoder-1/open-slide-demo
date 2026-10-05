import { useEffect, useState } from 'react';
import type { Deck } from './types';

export function PresenterBar({
  deck,
  index,
}: {
  deck: Deck;
  index: number;
}) {
  const current = deck.slides[index]!;
  const upcoming = deck.slides[index + 1];
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <aside className="presenter-bar">
      <div className="presenter-row">
        <strong>{index + 1}/{deck.slides.length}</strong>
        <span>{current.meta.title}</span>
        <span className="presenter-timer">{mm}:{ss}</span>
      </div>
      {current.meta.notes && (
        <div className="presenter-notes">{current.meta.notes}</div>
      )}
      <div className="presenter-row presenter-next">
        Next: {upcoming ? upcoming.meta.title : '— end of deck —'}
      </div>
    </aside>
  );
}
