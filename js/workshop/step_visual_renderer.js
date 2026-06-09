// NE PAS MODIFIER — rendu canvas pour les visuels d'instructions

import { TILE_SIZE, COLORS } from '../config.js';

const OVERLAY = {
  highlight: 'rgba(255, 204, 0, 0.45)',
  highlightBorder: '#fc0',
  blocked: 'rgba(255, 68, 68, 0.45)',
  blockedBorder: '#ff4444',
  muted: 'rgba(128, 128, 128, 0.35)',
  mutedBorder: '#888',
  arrow: '#fc0',
  arrowStrong: '#fc0',
  arrowWeak: 'rgba(255, 204, 0, 0.35)',
  coord: '#ffffff',
};

function tileAt(scene, x, y) {
  if (scene.walls?.some((w) => w.x === x && w.y === y)) {
    return '#';
  }
  if (y < 0 || y >= scene.rows || x < 0 || x >= scene.cols) {
    return '#';
  }
  return scene.tiles[y][x];
}

function drawTile(ctx, x, y, char, scene) {
  const offset = sceneOffset(scene);
  const px = offset.x + x * TILE_SIZE;
  const py = offset.y + y * TILE_SIZE;

  if (char === '#') {
    ctx.fillStyle = COLORS.wall;
    ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
  } else if (char === '.') {
    ctx.fillStyle = COLORS.pill;
    ctx.beginPath();
    ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (char === 'O') {
    drawSuperPill(ctx, x, y, scene);
  }
}

function drawSuperPill(ctx, x, y, scene) {
  const offset = sceneOffset(scene);
  const px = offset.x + x * TILE_SIZE;
  const py = offset.y + y * TILE_SIZE;
  ctx.fillStyle = COLORS.superPill;
  ctx.beginPath();
  ctx.arc(px + TILE_SIZE / 2, py + TILE_SIZE / 2, 6, 0, Math.PI * 2);
  ctx.fill();
}

function drawPacman(ctx, x, y, facing = 'right', scene = {}) {
  const offset = sceneOffset(scene);
  const cx = offset.x + x * TILE_SIZE + TILE_SIZE / 2;
  const cy = offset.y + y * TILE_SIZE + TILE_SIZE / 2;
  const radius = TILE_SIZE / 2 - 2;

  const rotation = {
    right: 0,
    down: Math.PI / 2,
    left: Math.PI,
    up: -Math.PI / 2,
  }[facing] ?? 0;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.fillStyle = COLORS.pacman;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0.15, Math.PI * 2 - 0.15);
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.restore();
}

function drawGhost(ctx, x, y, state = 'patrol', scene = {}) {
  const offset = sceneOffset(scene);
  const cx = offset.x + x * TILE_SIZE + TILE_SIZE / 2;
  const cy = offset.y + y * TILE_SIZE + TILE_SIZE / 2;
  const radius = TILE_SIZE / 2 - 2;
  const color =
    state === 'scared'
      ? COLORS.ghostScared
      : state === 'patrol'
        ? COLORS.ghostPatrol
        : COLORS.ghost;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy - 2, radius, Math.PI, 0);
  ctx.lineTo(cx + radius, cy + radius - 2);
  ctx.lineTo(cx + radius / 2, cy + radius - 6);
  ctx.lineTo(cx, cy + radius - 2);
  ctx.lineTo(cx - radius / 2, cy + radius - 6);
  ctx.lineTo(cx - radius, cy + radius - 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(cx - 4, cy - 2, 3, 0, Math.PI * 2);
  ctx.arc(cx + 4, cy - 2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(cx - 4, cy - 2, 1.5, 0, Math.PI * 2);
  ctx.arc(cx + 4, cy - 2, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawHighlight(ctx, x, y, scene, frame) {
  const offset = sceneOffset(scene);
  const px = offset.x + x * TILE_SIZE;
  const py = offset.y + y * TILE_SIZE;
  const colorKey = scene.highlight?.color || 'highlight';
  const styles = {
    highlight: { fill: OVERLAY.highlight, border: OVERLAY.highlightBorder },
    blocked: { fill: OVERLAY.blocked, border: OVERLAY.blockedBorder },
    muted: { fill: OVERLAY.muted, border: OVERLAY.mutedBorder },
  };
  const style = styles[colorKey] || styles.highlight;
  const pulse = 0.55 + Math.sin(frame * 0.06) * 0.25;

  ctx.fillStyle = style.fill;
  ctx.globalAlpha = pulse;
  ctx.fillRect(px + 1, py + 1, TILE_SIZE - 2, TILE_SIZE - 2);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = style.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(px + 2, py + 2, TILE_SIZE - 4, TILE_SIZE - 4);
}

function cellCenter(x, y, scene = {}) {
  const offset = sceneOffset(scene);
  return {
    x: offset.x + x * TILE_SIZE + TILE_SIZE / 2,
    y: offset.y + y * TILE_SIZE + TILE_SIZE / 2,
  };
}

function drawArrow(ctx, arrow, frame, scene = {}) {
  const from = cellCenter(arrow.from.x, arrow.from.y, scene);
  const to = cellCenter(arrow.to.x, arrow.to.y, scene);
  const dashOffset = arrow.animated ? frame * 0.5 : 0;
  const strong = arrow.strong !== false;

  ctx.save();
  ctx.strokeStyle = strong ? OVERLAY.arrowStrong : OVERLAY.arrowWeak;
  ctx.fillStyle = strong ? OVERLAY.arrowStrong : OVERLAY.arrowWeak;
  ctx.lineWidth = strong ? 2 : 1.5;
  ctx.setLineDash(strong ? [6, 4] : [4, 6]);
  ctx.lineDashOffset = strong ? -dashOffset : dashOffset;

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();

  if (strong) {
    ctx.setLineDash([]);
    const headSize = 6;
    if (arrow.axis === 'x') {
      const dir = to.x > from.x ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x - dir * headSize, to.y - headSize / 2);
      ctx.lineTo(to.x - dir * headSize, to.y + headSize / 2);
      ctx.closePath();
      ctx.fill();
    } else {
      const dir = to.y > from.y ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x - headSize / 2, to.y - dir * headSize);
      ctx.lineTo(to.x + headSize / 2, to.y - dir * headSize);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.restore();
}

function sceneOffset(scene) {
  return {
    x: scene.margin?.left ?? 0,
    y: scene.margin?.top ?? 0,
  };
}

function drawCoords(ctx, entity, scene, name) {
  const offset = sceneOffset(scene);
  const px = offset.x + entity.x * TILE_SIZE;
  const py = offset.y + entity.y * TILE_SIZE;
  ctx.fillStyle = OVERLAY.coord;
  ctx.font = 'bold 9px system-ui, sans-serif';
  ctx.textAlign = 'center';

  if (name) {
    ctx.fillStyle = '#aaa';
    ctx.font = '8px system-ui, sans-serif';
    ctx.fillText(name, px + TILE_SIZE / 2, py - 14);
    ctx.fillStyle = OVERLAY.coord;
    ctx.font = 'bold 8px system-ui, sans-serif';
    ctx.fillText(`gridX=${entity.x}  gridY=${entity.y}`, px + TILE_SIZE / 2, py - 4);
    return;
  }

  ctx.fillText(`(${entity.x}, ${entity.y})`, px + TILE_SIZE / 2, py - 4);
}

function drawGridAxes(ctx, scene) {
  const offset = sceneOffset(scene);
  const ox = offset.x;
  const oy = offset.y;

  ctx.save();
  ctx.strokeStyle = '#888';
  ctx.fillStyle = '#aaa';
  ctx.lineWidth = 1.5;
  ctx.font = 'bold 9px system-ui, sans-serif';

  const axisLen = 28;
  ctx.beginPath();
  ctx.moveTo(ox + 2, oy + 2);
  ctx.lineTo(ox + axisLen, oy + 2);
  ctx.stroke();
  ctx.fillText('gridX →', ox + axisLen + 4, oy + 6);

  ctx.beginPath();
  ctx.moveTo(ox + 2, oy + 2);
  ctx.lineTo(ox + 2, oy + axisLen);
  ctx.stroke();
  ctx.save();
  ctx.translate(ox + 6, oy + axisLen + 4);
  ctx.fillText('gridY ↓', 0, 0);
  ctx.restore();

  ctx.fillStyle = '#666';
  ctx.font = '8px system-ui, sans-serif';
  ctx.fillText('(0, 0)', ox + 2, oy + 14);
  ctx.restore();
}

function drawCellLabels(ctx, scene) {
  if (!scene.cellLabels?.length) {
    return;
  }

  const offset = sceneOffset(scene);
  for (const label of scene.cellLabels) {
    const px = offset.x + label.x * TILE_SIZE;
    const py = offset.y + label.y * TILE_SIZE;
    const lines = label.text.split('\n');

    ctx.fillStyle = label.color || '#ff8888';
    ctx.font = 'bold 8px system-ui, sans-serif';
    ctx.textAlign = 'center';
    lines.forEach((line, index) => {
      ctx.fillText(line, px + TILE_SIZE / 2, py + TILE_SIZE / 2 + 4 + index * 10);
    });
  }
}

export function getSceneDimensions(scene) {
  return {
    width: scene.cols * TILE_SIZE + (scene.margin?.left ?? 0) + (scene.margin?.right ?? 0),
    height: scene.rows * TILE_SIZE + (scene.margin?.top ?? 0) + (scene.margin?.bottom ?? 0),
  };
}

export function renderScene(ctx, scene, frame) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (scene.showGridAxes) {
    drawGridAxes(ctx, scene);
  }

  for (let y = 0; y < scene.rows; y++) {
    for (let x = 0; x < scene.cols; x++) {
      drawTile(ctx, x, y, tileAt(scene, x, y), scene);
    }
  }

  if (scene.superPill) {
    drawSuperPill(ctx, scene.superPill.x, scene.superPill.y, scene);
  }

  if (scene.highlights) {
    for (const h of scene.highlights) {
      drawHighlight(ctx, h.x, h.y, { highlight: h }, frame);
    }
  } else if (scene.highlight) {
    drawHighlight(ctx, scene.highlight.x, scene.highlight.y, scene, frame);
  }

  if (scene.ghosts) {
    for (const g of scene.ghosts) {
      drawGhost(ctx, g.x, g.y, g.state, scene);
      if (scene.showCoords) {
        drawCoords(ctx, g, scene, scene.namedCoords ? 'ghost' : null);
      }
    }
  } else if (scene.ghost) {
    drawGhost(ctx, scene.ghost.x, scene.ghost.y, scene.ghost.state, scene);
    if (scene.showGhostCoords || scene.showCoords) {
      drawCoords(ctx, scene.ghost, scene, scene.namedCoords ? 'ghost' : null);
    }
  }

  if (scene.pacman) {
    drawPacman(ctx, scene.pacman.x, scene.pacman.y, scene.pacman.facing, scene);
    if (scene.showPacmanCoords || scene.showCoords) {
      drawCoords(ctx, scene.pacman, scene, scene.namedCoords ? 'pacman' : null);
    }
  }

  drawCellLabels(ctx, scene);

  if (scene.arrows) {
    for (const arrow of scene.arrows) {
      drawArrow(ctx, arrow, frame, scene);
    }
  } else if (scene.arrow) {
    drawArrow(ctx, scene.arrow, frame, scene);
  }
}
