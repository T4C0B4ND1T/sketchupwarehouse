import data from '../data/authors.json';

export interface Beat {
  id: string;
  name: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  /** House pen name for AI-assisted writing (disclosed on the About and author pages). */
  penName: boolean;
  initials: string;
  bio: string;
  beats: Beat[];
}

export const AUTHORS: Author[] = data.authors;
export const AUTHOR_IDS = AUTHORS.map((a) => a.id) as [string, ...string[]];
export const DEFAULT_AUTHOR = 'joel';

export function getAuthor(id: string): Author {
  return AUTHORS.find((a) => a.id === id) ?? AUTHORS.find((a) => a.id === DEFAULT_AUTHOR)!;
}

export function authorUrl(author: Author): string {
  return `/authors/${author.id}/`;
}

/** The beat a post belongs to, if its author has one by that id. */
export function getBeat(author: Author, beatId: string | undefined): Beat | undefined {
  return beatId ? author.beats.find((b) => b.id === beatId) : undefined;
}

/** Shown wherever pen names are introduced. */
export const PEN_NAME_NOTE =
  'Dana, Theo and Rosa are house pen names, not real people. Their articles are drafted with AI assistance in a consistent voice for each beat, researched from the sources cited at the end of every article, and edited by Joel before or after they go live.';
