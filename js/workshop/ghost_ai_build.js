// ============================================================
//  FICHIER ÉLÈVE — atelier « Infos à coder »
// ============================================================

/**
 * Tu construis toi-même l'objet infos dans buildInfos :
 *
 *   ghost.gridX, ghost.gridY   → position du fantôme
 *   ghost.direction            → dernière direction ('left', 'right', 'up', 'down' ou null)
 *   pacman.gridX, pacman.gridY → position de Pac-Man
 *   map.isWall(x, y)           → true si la case est un mur
 *
 * Exemple : canGoLeft = !map.isWall(ghost.gridX - 1, ghost.gridY)
 */

export function buildInfos(ghost, pacman, map) {

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> TON CODE — buildInfos                               ║
  // ╚══════════════════════════════════════════════════════════╝

  return {};

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> FIN buildInfos                                      ║
  // ╚══════════════════════════════════════════════════════════╝
}

/**
 * ATELIER 1 — Choisis une direction pour le fantôme.
 */
export function chooseDirection(infos, map) {

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> TON CODE — Atelier 1                                ║
  // ╚══════════════════════════════════════════════════════════╝

  return null;

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> FIN Atelier 1                                       ║
  // ╚══════════════════════════════════════════════════════════╝
}

/**
 * ATELIER 2 — Choisis le mode du fantôme.
 */
export function updateState(infos, game) {

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> TON CODE — Atelier 2                                ║
  // ╚══════════════════════════════════════════════════════════╝

  return 'patrol';

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> FIN Atelier 2                                       ║
  // ╚══════════════════════════════════════════════════════════╝
}
