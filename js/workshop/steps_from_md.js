// NE PAS MODIFIER — charge les instructions depuis les fichiers markdown

import {
  loadText,
  renderMarkdown,
  parseFrontmatter,
  splitSections,
} from './markdown.js';

const CONTENT = 'js/workshop/content';

export let ATELIER_MARKDOWN = {};
export let ATELIER_META = {};

async function loadAtelier(id) {
  const base = `${CONTENT}/atelier-${id}`;
  const meta = JSON.parse(await loadText(`${base}/meta.json`));
  const markdown = await loadText(`${base}/${meta.workshop}`);

  return {
    meta: {
      title: meta.title,
      functionName: meta.functionName,
    },
    markdown,
  };
}

export async function loadWorkshopContent() {
  const [a1, a2] = await Promise.all([loadAtelier(1), loadAtelier(2)]);
  ATELIER_MARKDOWN = {
    1: a1.markdown,
    2: a2.markdown,
  };
  ATELIER_META = {
    1: a1.meta,
    2: a2.meta,
  };
}

export async function loadAide() {
  return renderMarkdown(await loadText(`${CONTENT}/aide.md`));
}

export async function loadUiHints() {
  const text = await loadText(`${CONTENT}/ui-hints.md`);
  const { body } = parseFrontmatter(text);
  const sections = splitSections(body);
  return {
    code: sections['Code'] ? renderMarkdown(sections['Code']) : '',
    game: sections['Jeu'] ? renderMarkdown(sections['Jeu']) : '',
  };
}
