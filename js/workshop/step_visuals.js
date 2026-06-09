// NE PAS MODIFIER — montage des visuels d'instructions

import { VISUAL_SCENES } from './visual_scenes.js';
import { getSceneDimensions, renderScene } from './step_visual_renderer.js';

const activeLoops = [];

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function unmountStepVisuals() {
  for (const cancel of activeLoops) {
    cancel();
  }
  activeLoops.length = 0;
}

export function mountStepVisuals(container, visualId) {
  if (!visualId || !VISUAL_SCENES[visualId]) {
    return;
  }

  const host = container.querySelector(`.step-visual-host[data-visual="${visualId}"]`);
  if (!host) {
    return;
  }

  const scene = VISUAL_SCENES[visualId];
  const { width, height } = getSceneDimensions(scene);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.className = 'step-visual-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', scene.legend ? stripHtml(scene.legend) : visualId);
  host.appendChild(canvas);

  if (scene.legend) {
    const legend = document.createElement('p');
    legend.className = 'step-visual-legend';
    legend.innerHTML = scene.legend;
    host.appendChild(legend);
  }

  const ctx = canvas.getContext('2d');
  let frame = 0;
  let running = true;

  function loop() {
    if (!running) {
      return;
    }
    renderScene(ctx, scene, frame);
    frame += 1;
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  activeLoops.push(() => {
    running = false;
    host.replaceChildren();
  });
}
