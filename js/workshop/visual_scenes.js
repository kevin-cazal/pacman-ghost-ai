// NE PAS MODIFIER — scènes déclaratives pour les visuels d'instructions

export const VISUAL_SCENES = {
  gridCoordinates: {
    margin: { top: 18, left: 18 },
    cols: 8,
    rows: 5,
    tiles: [
      '........',
      '........',
      '.#......',
      '.#......',
      '........',
    ],
    ghost: { x: 3, y: 2 },
    pacman: { x: 6, y: 2, facing: 'left' },
    highlight: { x: 1, y: 2, pulse: true, color: 'blocked' },
    showGridAxes: true,
    namedCoords: true,
    showCoords: true,
    cellLabels: [
      { x: 1, y: 2, text: 'map.isWall(1,2)\n= true' },
      { x: 5, y: 2, text: 'map.isWall(5,2)\n= false', color: '#8ab4f8' },
    ],
    legend: 'Comme en graphisme : <code>gridX</code> augmente vers la <strong>droite</strong>, <code>gridY</code> vers le <strong>bas</strong>. Origine <code>(0, 0)</code> en haut à gauche.',
  },

  superPillCorners: {
    cols: 11,
    rows: 7,
    tiles: [
      '###########',
      '#O.......O#',
      '#.........#',
      '#....P....#',
      '#.........#',
      '#O.......O#',
      '###########',
    ],
    pacman: { x: 5, y: 3, facing: 'right' },
    highlights: [
      { x: 1, y: 1, color: 'highlight', pulse: true },
      { x: 9, y: 1, color: 'highlight', pulse: true },
      { x: 1, y: 5, color: 'highlight', pulse: true },
      { x: 9, y: 5, color: 'highlight', pulse: true },
    ],
    legend: 'Les <strong>super-pills</strong> (grosses pastilles blanches, cases <code>O</code>) sont dans les <strong>4 coins</strong>. Pac-Man (<code>P</code>) doit les atteindre en suivant les couloirs.',
  },

  canGoLeft: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.....', '.....', '.....', '.....'],
    ghost: { x: 3, y: 2 },
    highlight: { x: 2, y: 2, pulse: true, color: 'highlight' },
    showGhostCoords: true,
    legend: 'Case testée : <code>(ghost.gridX - 1, ghost.gridY)</code> — la case à gauche du fantôme. Si pas de mur → <code>canGoLeft = true</code>.',
  },

  canGoLeftWall: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.....', '.....', '.....', '.....'],
    ghost: { x: 3, y: 2 },
    walls: [{ x: 2, y: 2 }],
    highlight: { x: 2, y: 2, pulse: true, color: 'blocked' },
    showGhostCoords: true,
    legend: 'Mur à gauche → <code>map.isWall(ghost.gridX - 1, ghost.gridY)</code> retourne <code>true</code> → <code>canGoLeft = false</code>.',
  },

  canGoRight: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.....', '.....', '.....', '.....'],
    ghost: { x: 2, y: 2 },
    highlight: { x: 3, y: 2, pulse: true, color: 'highlight' },
    showGhostCoords: true,
    legend: 'Case testée : <code>(ghost.gridX + 1, ghost.gridY)</code> — branche « à droite » si <code>canGoRight</code> et Pac-Man à droite.',
  },

  chooseDirectionLeft: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.....', '.....', '.....', '.....'],
    ghost: { x: 3, y: 2 },
    highlight: { x: 2, y: 2, pulse: true, color: 'highlight' },
    arrow: { from: { x: 3, y: 2 }, to: { x: 2, y: 2 }, axis: 'x', animated: true },
    showGhostCoords: true,
    legend: '<code>if (infos.canGoLeft) { return \'left\'; }</code> — le fantôme choisit la direction gauche quand la case est libre.',
  },

  returnNull: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.#.#.', '.....', '.#.#.', '.....'],
    ghost: { x: 2, y: 2 },
    showGhostCoords: true,
    legend: 'Aucune règle ne s\'applique → <code>return null;</code> : le fantôme ne change pas de direction (valeur par défaut).',
  },

  distanceXRight: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.......', '.......', '.......'],
    ghost: { x: 2, y: 2 },
    pacman: { x: 5, y: 2, facing: 'left' },
    arrow: { from: { x: 2, y: 2 }, to: { x: 5, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: '<code>distanceX = pacman.gridX - ghost.gridX = +3</code> — Pac-Man est à <strong>droite</strong> (valeur positive).',
  },

  distanceXLeft: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.......', '.......', '.......'],
    ghost: { x: 5, y: 2 },
    pacman: { x: 2, y: 2, facing: 'right' },
    arrow: { from: { x: 5, y: 2 }, to: { x: 2, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: '<code>distanceX = pacman.gridX - ghost.gridX = -3</code> — Pac-Man est à <strong>gauche</strong> (valeur négative).',
  },

  distanceY: {
    cols: 5,
    rows: 7,
    tiles: ['.....', '.....', '.....', '.....', '.....', '.....', '.....'],
    ghost: { x: 2, y: 4 },
    pacman: { x: 2, y: 1, facing: 'down' },
    arrow: { from: { x: 2, y: 4 }, to: { x: 2, y: 1 }, axis: 'y', animated: true },
    showCoords: true,
    legend: '<code>distanceY = pacman.gridY - ghost.gridY = -3</code> — Pac-Man est <strong>au-dessus</strong> (valeur négative).',
  },

  rulePriority: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.....', '.#...', '.....', '.....'],
    ghost: { x: 2, y: 3 },
    pacman: { x: 4, y: 1, facing: 'down' },
    arrows: [
      { from: { x: 2, y: 3 }, to: { x: 4, y: 3 }, axis: 'x', animated: true, strong: true },
      { from: { x: 2, y: 3 }, to: { x: 2, y: 1 }, axis: 'y', animated: true, strong: false },
    ],
    showCoords: true,
    legend: 'En diagonale, le <strong>premier <code>if</code> qui correspond</strong> gagne. Flèche pleine = règle testée en premier (horizontal ici).',
  },

  optimizedSearch: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.#.....', '.......', '.......'],
    ghost: { x: 2, y: 3 },
    pacman: { x: 5, y: 1, facing: 'down' },
    arrows: [
      { from: { x: 2, y: 3 }, to: { x: 5, y: 3 }, axis: 'x', animated: true, strong: true },
      { from: { x: 2, y: 3 }, to: { x: 2, y: 1 }, axis: 'y', animated: true, strong: false },
    ],
    showCoords: true,
    legend: '<code>|distanceX| &gt; |distanceY|</code> → tester <strong>horizontal d\'abord</strong> (flèche pleine). Moins de détours en diagonale.',
  },

  pursuit: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.#.....', '.......', '.......'],
    ghost: { x: 2, y: 2 },
    pacman: { x: 6, y: 2, facing: 'left' },
    arrow: { from: { x: 2, y: 2 }, to: { x: 6, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: 'Poursuite complète : le fantôme se rapproche de Pac-Man sans traverser les murs.',
  },

  fsmOverview: {
    cols: 9,
    rows: 3,
    tiles: ['.........', '.........', '.........'],
    ghosts: [
      { x: 1, y: 1, state: 'patrol' },
      { x: 4, y: 1, state: 'follow' },
      { x: 7, y: 1, state: 'scared' },
    ],
    arrows: [
      { from: { x: 1, y: 1 }, to: { x: 2, y: 1 }, axis: 'x', animated: false, strong: true },
      { from: { x: 4, y: 1 }, to: { x: 5, y: 1 }, axis: 'x', animated: false, strong: true },
    ],
    legend: 'Trois états : <code>\'patrol\'</code> (orange), <code>\'follow\'</code> (rouge), <code>\'scared\'</code> (bleu). Un seul à la fois — <code>updateState</code> choisit lequel.',
  },

  scaredGhost: {
    cols: 5,
    rows: 5,
    tiles: ['.....', '.....', '.....', '.....', '.....'],
    ghost: { x: 2, y: 2, state: 'scared' },
    pacman: { x: 4, y: 2, facing: 'left' },
    superPill: { x: 0, y: 2 },
    showCoords: true,
    legend: 'Super-pill mangée → <code>game.scaredTimer &gt; 0</code> → <code>updateState</code> retourne <code>\'scared\'</code> (fantôme bleu).',
  },

  stateBehavior: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.......', '.......', '.......'],
    ghost: { x: 2, y: 2, state: 'scared' },
    pacman: { x: 5, y: 2, facing: 'left' },
    showCoords: true,
    legend: '<code>updateState</code> choisit le mode (<code>infos.state</code>). <code>chooseDirection</code> lit ce mode et agit différemment selon <code>patrol</code>, <code>follow</code> ou <code>scared</code>.',
  },

  patrolState: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.#.....', '.......', '.......', '.......'],
    ghost: { x: 2, y: 2, state: 'patrol' },
    pacman: { x: 6, y: 2, facing: 'left' },
    arrow: { from: { x: 2, y: 2 }, to: { x: 3, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: 'En <code>\'patrol\'</code>, le fantôme avance tout droit (<code>currentDirection</code>) sans chercher Pac-Man.',
  },

  followState: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.......', '.......', '.......'],
    ghost: { x: 2, y: 2, state: 'follow' },
    pacman: { x: 4, y: 2, facing: 'left' },
    arrow: { from: { x: 2, y: 2 }, to: { x: 4, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: 'Pac-Man proche → <code>infos.totalDistance ≤ seuil</code> → <code>updateState</code> retourne <code>\'follow\'</code> (poursuite rouge).',
  },

  fleeScared: {
    cols: 7,
    rows: 5,
    tiles: ['.......', '.......', '.......', '.......', '.......'],
    ghost: { x: 4, y: 2, state: 'scared' },
    pacman: { x: 2, y: 2, facing: 'right' },
    arrow: { from: { x: 4, y: 2 }, to: { x: 6, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: 'En <code>\'scared\'</code>, fuis Pac-Man : <code>distanceX &gt; 0</code> → va à <code>\'left\'</code> (direction inverse de la poursuite).',
  },

  stateTransitions: {
    cols: 9,
    rows: 5,
    tiles: ['.........', '.........', '.........', '.........', '.........'],
    ghosts: [
      { x: 2, y: 2, state: 'patrol' },
      { x: 6, y: 2, state: 'follow' },
    ],
    pacman: { x: 8, y: 2, facing: 'left' },
    arrows: [
      { from: { x: 2, y: 2 }, to: { x: 8, y: 2 }, axis: 'x', animated: true, strong: false },
      { from: { x: 6, y: 2 }, to: { x: 8, y: 2 }, axis: 'x', animated: true, strong: true },
    ],
    showCoords: true,
    legend: 'Éloignement → retour <code>\'patrol\'</code>. Proximité → <code>\'follow\'</code>. Timer super-pill fini → quitte <code>\'scared\'</code>.',
  },

  fsmComplete: {
    cols: 9,
    rows: 5,
    tiles: ['.........', '.........', '.........', '.........', '.........'],
    ghost: { x: 2, y: 2, state: 'follow' },
    pacman: { x: 6, y: 2, facing: 'left' },
    superPill: { x: 0, y: 4 },
    arrow: { from: { x: 2, y: 2 }, to: { x: 6, y: 2 }, axis: 'x', animated: true },
    showCoords: true,
    legend: '<code>updateState</code> (mode) + <code>chooseDirection</code> (mouvement) : patrol/follow/scared avec patrouille, poursuite, fuite et transitions retour.',
  },
};
