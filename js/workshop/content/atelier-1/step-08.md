---
title: Étape 8 — Priorité des règles
visual: rulePriority
---

## Concept
En diagonale, le **premier `if` qui correspond** gagne. L'ordre du le code compte.
Par exemple, si dans ton code tu vérifies en premier que le fantôme doit aller à gauche ou a droite et qu'ensuite tu vérifies s'il doit aller en haut ou en bas:
- Il ira au maximum à gauche (ou à droite) avant d'aller en haut (ou en bas).

## Observation:
Place Pac-Man en diagonale. Quelle direction choisit le fantôme en premier ?

## Astuce jeu
Pour placer Pac-Man en diagonale, tu peux utiliser ta souris lorsque le jeu est arrêté, ou les flèches de ton clavier lorsque le jeu tourne.

## À toi de jouer
Dans `chooseDirection` uniquement: inverse l'ordre de deux règles (par ex. échange horizontal et vertical).
Observe la différence.

## Vérifie
Que changer l'ordre des règles change le comportement en diagonale.

## Réflexion
Quel est le problème avec ce comportement ?
Le fantôme est-il vraiment intélligent ?
