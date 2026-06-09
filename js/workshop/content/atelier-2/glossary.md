| Terme | Signification |
| --- | --- |
| `updateState` | Fonction qui choisit le mode du fantôme : `patrol`, `follow` ou `scared` |
| `'patrol'` | Mode patrouille — Pac-Man est loin, le fantôme avance tout droit sans le chercher (orange) |
| `'follow'` | Mode poursuite — Pac-Man est proche, le fantôme utilise l'arbre de décision de l'Atelier 1 (rouge) |
| `'scared'` | Mode peur — Pac-Man a mangé une super-pill, le fantôme fuit (bleu) |
| `super-pill` | Grande pastille blanche dans les 4 coins de la carte — effraie le fantôme 8 secondes |
| `game.scaredTimer` | Temps restant de la super-pill (> 0 = peur active) |
| `state` | Mode actuel du fantôme — tu le recopies dans `buildInfos` : `state: ghost.state` |
| `currentDirection` | Dernière direction du fantôme — tu le recopies : `currentDirection: ghost.direction` |
| `totalDistance` | Tu le calcules : `Math.abs(distanceX) + Math.abs(distanceY)` — nombre de cases entre fantôme et Pac-Man |
