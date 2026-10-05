import { useEffect, useState } from 'react';
import { DeckCanvas } from './DeckCanvas';
import { PresenterBar } from './PresenterBar';
import { InspectorOverlay, useInspector } from './inspector';
import { useDeckState } from './useDeckState';
import type { Deck as DeckDef } from './types';

export function Deck({ deck }: { deck: DeckDef }) {
  const { index, direction, go } = useDeckState(deck.slides.length);
  const current = deck.slides[index]!;

  const [presenter, setPresenter] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const inspector = useInspector(current.meta.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      if (e.key === 'p' || e.key === 'P') setPresenter((v) => !v);
      if (e.key === 'i' || e.key === 'I') setPanelOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`deck-root${presenter ? ' presenter-on' : ''}`}>
      <div
        className="deck-progress"
        style={{ width: `${((index + 1) / deck.slides.length) * 100}%` }}
      />
      <DeckCanvas>
        <InspectorOverlay inspectMode={inspector.inspectMode} onPick={inspector.addAnnotation}>
          <div
            key={current.meta.id}
            className={`slide stage-${direction}`}
            data-slide-id={current.meta.id}
            data-slide-num={index + 1}
            data-slide-total={deck.slides.length}
          >
            <current.component />
          </div>
          <button
            className={`inspect-toggle${inspector.inspectMode ? ' on' : ''}`}
            onClick={() => inspector.setInspectMode((v) => !v)}
            title="Click an element to attach feedback"
          >
            {inspector.inspectMode ? 'inspecting… (esc to exit)' : 'inspect'}
          </button>
        </InspectorOverlay>
      </DeckCanvas>

      <button
        className="nav-zone left"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="nav-zone right"
        onClick={() => go(index + 1)}
        disabled={index === deck.slides.length - 1}
        aria-label="Next slide"
      >
        ›
      </button>

      <nav className="deck-controls">
        <button onClick={() => go(index - 1)} disabled={index === 0}>←</button>
        <span className="deck-count">{index + 1} / {deck.slides.length}</span>
        <button onClick={() => go(index + 1)} disabled={index === deck.slides.length - 1}>→</button>
        <button className={presenter ? 'on' : ''} onClick={() => setPresenter((v) => !v)}>
          Presenter
        </button>
        <button className={panelOpen ? 'on' : ''} onClick={() => setPanelOpen((v) => !v)}>
          Feedback
        </button>
      </nav>

      {presenter && <PresenterBar deck={deck} index={index} />}
      {panelOpen && (
        <section className="annotation-panel">
          <header>
            <strong>Feedback notes ({current.meta.id})</strong>
            <button onClick={inspector.clear}>clear</button>
          </header>
          <ol>
            {inspector.annotations.length === 0 && <li>No notes yet. Press “inspect”, click any element on the slide.</li>}
            {inspector.annotations.map((a) => (
              <li key={a.id}>
                <code>{a.selector}</code>
                <p>{a.note}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
