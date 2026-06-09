// NE PAS MODIFIER — chargement et rendu markdown (marked)

import { marked } from '../../lib/marked/marked.esm.js';

export async function loadText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${url}`);
  }
  return response.text();
}

export function renderMarkdown(md) {
  if (md == null || md === '') return '';
  const html = marked.parse(String(md), { async: false });
  return typeof html === 'string' ? html : '';
}
