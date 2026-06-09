---
title: Étape 5 — Fuir en mode scared
visual: fleeScared
---

## Concept

En mode `'scared'`, le fantôme doit **s'éloigner** de Pac-Man — l'inverse de la poursuite :

- Pac-Man à droite (`distanceX > 0`) → va à `'left'`
- Pac-Man à gauche (`distanceX < 0`) → va à `'right'`
- Pac-Man en bas (`distanceY > 0`) → va à `'up'`
- Pac-Man en haut (`distanceY < 0`) → va à `'down'`

**Ligne par ligne (horizontal) :**

1. `if (infos.canGoLeft && infos.distanceX > 0)` — « je peux aller à gauche ET Pac-Man est à droite ? »
2. `return 'left';` — si oui, fuis vers la gauche

## Où modifier

Dans `chooseDirection`, ajoute un bloc `if (infos.state === 'scared')` **après** le bloc `patrol` et **avant** le bloc `follow`.

## Observe le jeu

Après une super-pill, le fantôme est bleu mais patrouille ou poursuit encore. Maintenant il doit **s'éloigner** de toi.

## À toi de jouer

Dans `chooseDirection`, ajoute **après** le bloc `patrol` et **avant** le bloc `follow` :

```javascript
if (infos.state === 'scared') {
  if (infos.canGoLeft && infos.distanceX > 0) {
    return 'left';
  }
  if (infos.canGoRight && infos.distanceX < 0) {
    return 'right';
  }
  if (infos.canGoUp && infos.distanceY > 0) {
    return 'up';
  }
  if (infos.canGoDown && infos.distanceY < 0) {
    return 'down';
  }
  return null;
}
```

## Vérifie

Clique **Démarrer** → mange une super-pill. Le fantôme bleu doit **s'éloigner** de toi sans traverser les murs.

## Si tu es bloqué

Le fantôme poursuit encore après super-pill ? Vérifie que le bloc `scared` est **avant** le bloc `follow` dans `chooseDirection`.

Le fantôme reste immobile ? Vérifie que tu utilises bien `distanceX` et `distanceY` (déjà dans `buildInfos` depuis l'Atelier 1).

## Réflexion

Fuite = directions inverses par rapport à la poursuite ?
