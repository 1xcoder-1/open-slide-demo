import { useCallback, useEffect, useState, type ReactNode } from 'react';

export interface Annotation {
  id: string;
  slideId: string;
  selector: string;
  snippet: string;
  note: string;
}

function describeTarget(el: Element, slideId: string) {
  const snippet = (el.textContent ?? '').trim().slice(0, 80);
  const tag = el.tagName.toLowerCase();
  const cls = el.className && typeof el.className === 'string'
    ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
    : '';
  return { selector: `#${slideId} ${tag}${cls}`, snippet };
}

export function useInspector(slideId: string) {
  const [inspectMode, setInspectMode] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('osd-annotations') ?? '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!inspectMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectMode(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inspectMode]);

  const addAnnotation = useCallback(
    (el: Element) => {
      const note = window.prompt('Feedback for this element (agent will apply it):');
      if (!note) return;
      const { selector, snippet } = describeTarget(el, slideId);
      const ann: Annotation = {
        id: `${Date.now()}`,
        slideId,
        selector,
        snippet,
        note,
      };
      setAnnotations((prev) => {
        const nextList = [...prev, ann];
        localStorage.setItem('osd-annotations', JSON.stringify(nextList));
        return nextList;
      });
    },
    [slideId],
  );

  const clear = useCallback(() => {
    setAnnotations([]);
    localStorage.removeItem('osd-annotations');
  }, []);

  return { inspectMode, setInspectMode, annotations, addAnnotation, clear };
}

export function InspectorOverlay({
  inspectMode,
  onPick,
  children,
}: {
  inspectMode: boolean;
  onPick: (el: Element) => void;
  children: ReactNode;
}) {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!inspectMode) return;
      e.preventDefault();
      e.stopPropagation();
      onPick(e.target as Element);
    },
    [inspectMode, onPick],
  );

  return (
    <div
      className={inspectMode ? 'inspector-active' : undefined}
      onClickCapture={onClick}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </div>
  );
}
