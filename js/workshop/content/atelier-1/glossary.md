| Terme | Signification |
| --- | --- |
| `buildInfos` | Fonction où tu construis l'objet infos (les réponses pour le fantôme) |
| `chooseDirection` | Fonction où tu écris les règles « si… alors… » pour choisir une direction |
| `ghost.gridX / gridY` | Position du fantôme en cases sur la carte |
| `pacman.gridX / gridY` | Position de Pac-Man en cases |
| `map.isWall(x, y)` | true si la case (x, y) est un mur |
| `if / return` | if (condition) { return 'left'; } — si la condition est vraie, choisis cette direction |
| `'left' / 'right' / 'up' / 'down'` | Les 4 directions possibles (toujours entre apostrophes) |
| `canGoLeft` | Tu le calcules : !map.isWall(ghost.gridX - 1, ghost.gridY) |
| `distanceX` | Tu le calcules : pacman.gridX - ghost.gridX |
| `totalDistance` | Tu le calcules : |distanceX| + |distanceY| — nombre de cases entre fantôme et Pac-Man |
| `return null` | « Je ne bouge pas » — à mettre à la fin si aucune règle ne s'applique |
