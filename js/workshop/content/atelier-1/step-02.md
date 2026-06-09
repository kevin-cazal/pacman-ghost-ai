---
title: Étape 2 — Les coordonnées sur la grille
visual: gridCoordinates
---

## Concept
En informatique et en graphisme, une carte de jeu est une **grille de cases**. Chaque case a une coordonée `(gridX, gridY)` :

- `gridX` = numéro de **colonne** — 0 tout à gauche, augmente vers la **droite**
- `gridY` = numéro de **ligne** — 0 tout en haut, augmente vers le **bas**
- La case en haut à gauche est `(0, 0)`

Dans ton code, le jeu te donne déjà ces valeurs :

- `ghost.gridX` / `ghost.gridY` — position du fantôme
- `pacman.gridX` / `pacman.gridY` — position de Pac-Man
- `map.isWall(x, y)` — `true` si la case `(x, y)` est un mur (case bleu), `false` sinon

## Observe le schéma suivant
Regarde le schéma : les flèches montrent les axes, les personnages affichent leurs coordonnées, la case mur en rouge montre `map.isWall`.

## À toi de jouer
Pas de code à écrire — lis le concept et observe le schéma. Quand c'est clair, clique **Étape suivante**.

## Comment tester
Aucun test de code requis pour cette étape.

## Vérifie
Tu sais lire `ghost.gridX`, `pacman.gridY` et comprendre `map.isWall(x, y)`.

## Si tu es bloqué
Concentre-toi sur le schéma : origine en haut à gauche, X vers la droite, Y vers le bas.

## Réflexion
Si le fantôme est en `(3, 2)` et Pac-Man en `(6, 2)`, qui est le plus à droite ? Quelle est la valeur de `pacman.gridX - ghost.gridX` ?
