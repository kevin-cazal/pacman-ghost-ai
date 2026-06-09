// ============================================================
//  FICHIER ÉLÈVE — seul fichier à modifier pour les ateliers
// ============================================================

/**
 * Le jeu te donne un objet `infos` avec les réponses dont tu as besoin :
 *
 *   canGoUp, canGoDown, canGoLeft, canGoRight → puis-je aller dans cette direction ?
 *   distanceX  → Pac-Man à droite (+) ou à gauche (-)
 *   distanceY  → Pac-Man en bas (+) ou en haut (-)
 *   totalDistance → nombre de cases entre le fantôme et Pac-Man
 *   state        → mode actuel : 'patrol', 'follow' ou 'scared'
 *
 * Atelier 2 — objet `game` :
 *   scaredTimer  → temps restant de la super-pill (> 0 = fantôme effrayé)
 */

/**
 * ATELIER 1 — Choisis une direction pour le fantôme.
 * Retourne : 'up' | 'down' | 'left' | 'right' | null (null = ne pas bouger)
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
 * Retourne : 'wait' | 'follow' | 'scared'
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
