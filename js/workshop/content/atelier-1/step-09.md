---
title: Étape 9 — Optimiser la recherche
visual: optimizedSearch
---

## Concept
La différence entre un bon chasseur et un mauvais chasseur:
« Le bon chasseur ne teste pas les directions au hasard (ou pire, dans un ordre fixé) : il va d'abord vers l'axe où Pac-Man est **le plus loin**. »


La distance horizontale et verticale sont déjà presque présente dans le code avec `distanceX` et `distanceY`.
Cependant pour l'instant tu n'as utilisé que le signe de ces propriétés:
- `distanceX` positive quand Pac-Man est à droite du fantôme, négative quand il est à gauche
- `distanceY` positive quand Pac-Man est en bas du fantôme, négative quand il est en haut
Ici ce qui t'intéresse c'est la **valeur absolue** (valeur sans le signe) de ces propriétés.
Par exemple: `distanceX = 3` ou `distanceX = -3` peut importe la direction gauche ou droite, Pac-Man est à 3 cases d'écart du fantôme sur l'axe horizontal.

Tu peux utiliser `Math.abs(valeur)` pour récupérer la valeur absolue d'une propriété.
Par exemple: 
- `Math.abs(5)` et `Math.abs(-5)` donneront toutes les deux la valeur `5`.
- `Math.abs(distanceX)` donnera le nombre de cases qui séparent le fantôme de Pac-Man sur l'axe horizontal.

## L'objectif

Compare `Math.abs(infos.distanceX)` et `Math.abs(infos.distanceY)` :

- si la distance horizontale est supérieur à la distance verticale → essaie gauche/droite d'abord
- sinon → essaie haut/bas d'abord

C'est le **moindre effort** : une seule comparaison pour choisir l'ordre des règles, et le fantôme se rapproche plus vite en diagonale.

## À toi de jouer
Réorganise `chooseDirection` avec deux blocs `if / else` selon l'axe prioritaire: teste d'abord l'axe où Pac-Man est le plus éloigné.

## Pseudo-code
```javascript

si (distanceHorizontale > distanceVerticale) {
  Se déplacer sur l'axe horizontal: gauche / droite
  Se déplacer sur l'axe vertical: haut / bas
} sinon {
  Se déplacer sur l'axe vertical: haut / bas
  Se déplacer sur l'axe horizontal: gauche / droite
}
Ne pas se déplacer
```


## Vérifie
Place Pac-Man en diagonale, le fantôme choisit une direction qui réduit le plus vite la distance.

## Si tu es bloqué
Pas de changement ? Vérifie que tu compares bien `Math.abs(infos.distanceX)` et `Math.abs(infos.distanceY)` pour choisir l'ordre des `if`.

