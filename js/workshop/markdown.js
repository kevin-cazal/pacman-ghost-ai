// NE PAS MODIFIER — chargement et rendu markdown (marked)

import { marked } from '../../lib/marked/marked.esm.js';

export async function loadText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Impossible de charger ${url}`);
  }
  return response.text();
}

export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: text };
  }

  const meta = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (value === 'null' || value === '') {
      value = null;
    }
    meta[key] = value;
  }

  return { meta, body: match[2] };
}

export function splitSections(body) {
  const sections = {};
  const parts = body.split(/^## /m).filter(Boolean);

  for (const part of parts) {
    const newline = part.indexOf('\n');
    if (newline === -1) continue;
    const title = part.slice(0, newline).trim();
    const content = part.slice(newline + 1).trim();
    if (content) {
      sections[title] = content;
    }
  }

  return sections;
}

export function renderMarkdown(md) {
  if (md == null || md === '') return '';
  const html = marked.parse(String(md), { async: false });
  return typeof html === 'string' ? html : '';
}

export function parseGlossaryTable(md) {
  const lines = md.trim().split('\n').filter((line) => line.includes('|'));
  const entries = [];

  for (const line of lines) {
    if (/^\|[\s\-:|]+\|$/.test(line.replace(/\s/g, ''))) continue;
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 2) {
      entries.push({
        name: cells[0].replace(/^`|`$/g, ''),
        meaning: cells[1],
      });
    }
  }

  return entries;
}

export function parseStepMarkdown(text) {
  const { meta, body } = parseFrontmatter(text);
  return {
    title: meta.title || 'Étape',
    visual: meta.visual || null,
    body: body.trim(),
  };
}
