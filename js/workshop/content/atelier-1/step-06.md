---
title: Étape 6 — Compléter les directions
visual: canGoRight
---

## À toi de jouer
Ajoute la propriété `canGoRight` dans `buildInfos` sur le même modèle que `canGoLeft` :

```javascript
return {
  canGoLeft: !map.isWall(ghost.gridX - 1, ghost.gridY),
  canGoRight: /* Ton code */,
}
```

Ajoute également une règle dans `chooseDirection`, avant le `return null;` final (ne supprime pas la règle de l'étape précédente).
Cette règle devra se traduire par « si le fantôme peut aller à droite et que Pac-Man se trouve à sa droite alors il va à droite»

## Observe le jeu
Le fantôme doit suivre les mouvements de Pac-Man sur l'axe horizontal.

## Si tu es bloqué
Le fantôme ne va pas à droite ? Observe bien le modèle que tu as déjà pour faire bouger le fantôme à gauche.

