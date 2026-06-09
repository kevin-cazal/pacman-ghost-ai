---
title: Étape 7 — Branches haut / bas
visual: distanceY
---

## À toi de jouer

Même logique mais en verticale. Complète `buildInfos` avec trois nouvelles propriétés:
- `canGoUp`
- `canGoDown`
- `distanceY`

Complète `chooseDirection` avec deux nouvelles règles pour que le fantôme suive Pac-Man sur l'axe vertical.

## Si tu es bloqué
Sépare bien tes propriétés par des virgules (un retour à la ligne ne suffit pas):

```javascript
return {
  canGoLeft: !map.isWall(ghost.gridX - 1, ghost.gridY),
  canGoRight: /* Ton code */,
  canGoUp: /* Ton code */,
  canGoDown: /* Ton code */,
  distanceX: /* Ton code */ ,
  distanceY: /* Ton code */,
}
```
