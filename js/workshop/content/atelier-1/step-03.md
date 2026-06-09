---
title: Étape 3 — Calculer canGoLeft
visual: canGoLeft
---

## Concept

Pour savoir si le fantôme peut aller à gauche, regarde la case à gauche (voir le schéma). Pas de mur → on peut y aller.

**Ligne par ligne :**

1. `canGoLeft: !map.isWall(ghost.gridX - 1, ghost.gridY)` - « la case à gauche du fantôme n'est pas un mur »
2. `!` inverse `true` en `false` et vice versa - `map.isWall(ghost.gridX - 1, ghost.gridY)` veut dire « la case à gauche du fantôme est un mur », `!map.isWall(ghost.gridX - 1, ghost.gridY)` veut dire l'inverse.


## À toi de jouer
Dans `buildInfos`, remplace `return {};` par :

```javascript
return {
  canGoLeft: !map.isWall(ghost.gridX - 1, ghost.gridY),
};
```

Ne touch pas à la fonction `chooseDirection` pour le moment. Clique **Démarrer** pour charger ton code.

## Comment tester
Clique **Démarrer**. Aucun message rouge sous l'éditeur = succès.

## Vérifie
Le code s'applique sans erreur (pas de texte rouge sous l'éditeur).

## Si tu es bloqué
Erreur de syntaxe ? Vérifie les accolades `{ }`, virgules et parenthèses. Tu as bien cliqué **Démarrer** ?

## Réflexion
Que retourne `map.isWall(X, Y)` si la case `(X, Y)` est un mur ? `true` ou `false` ?
Le code suivant: `!map.isWall(ghost.gridX + 1, ghost.gridY)` veut dire « la case à droite du fantôme n'est pas un mur » ou « la case à gauche du fantôme est un mur » ?
