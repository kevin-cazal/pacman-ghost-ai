---
title: Étape 5 — Calculer distanceX
visual: distanceXRight
---

## Concept
Tu veux maintenant savoir où est Pac-Man par rapport au fantôme sur l'axe horizontal :

```javascript
  distanceX: pacman.gridX - ghost.gridX
```

- si `distanceX` est positif → Pac-Man est à droite du fantôme
- si `distanceX` est négatif → Pac-Man est à gauche du fantôme

## Où modifier
Modifie `buildInfos` (ajoute `distanceX` aux propriétés du) **et** `chooseDirection` (modifie la règle de l'étape précédente).

## Observe le jeu
Avec l'étape précédente seule, le fantôme part à gauche même si Pac-Man est à droite.

## À toi de jouer
Complète `buildInfos` avec `distanceX`. Puis modifie `chooseDirection` :

Dans `buildInfos`:
```javascript
return {
  canGoLeft: !map.isWall(ghost.gridX - 1, ghost.gridY),
  distanceX: pacman.gridX - ghost.gridX,
};
```

Dans `chooseDirection`:
```javascript
if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
return null;
```

## Astuce
Tu peux changer la position initiale de Pac-Man ou du fantôme en les déplaçant avec ta souris.
Ici tu veux faire en sorte que Pac-Man commence à droite du fantôme.

## Comment tester
Déplace Pac-Man à droite du fantôme avec ta souris (lorsque le jeu est arrêté) ou avec les flèches de ton clavier (pendant que le jeu tourne) : le fantôme ne doit plus partir à gauche automatiquement, mais uniquement lorsque Pac-Man se trouve à sa gauche.

## Vérifie
Pac-Man à droite → le fantôme ne part plus toujours à gauche.

## Si tu es bloqué
Le fantôme part toujours à gauche ?
Vérifie la condition `infos.distanceX < 0`: `infos.distanceX` est inférieur à zéro.
Et non `infos.distanceX > 0`: `infos.distanceX` est supérieur à zéro.

## Réflexion
Que signifie `(infos.canGoLeft && infos.distanceX < 0)` ? 
- Le fantôme peut aller à gauche ET qu'il se trouve au même moment à gauche de Pac-Man
- Le fantôme peut aller à gauche OU qu'il se trouve à gauche de Pac-Man
