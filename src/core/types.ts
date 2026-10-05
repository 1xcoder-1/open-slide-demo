import type { ComponentType } from 'react';

export const CANVAS_WIDTH = 1920;
export const CANVAS_HEIGHT = 1080;

export interface SlideMeta {
  id: string;
  title: string;
  notes?: string;
}

export interface SlideDef {
  meta: SlideMeta;
  component: ComponentType;
}

export interface Deck {
  title: string;
  slides: SlideDef[];
}

export function slide(
  meta: SlideMeta,
  component: ComponentType,
): SlideDef {
  return { meta, component };
}

export function defineDeck(title: string, slides: SlideDef[]): Deck {
  return { title, slides };
}
