---
title: Étape 2 — Patrouiller
visual: patrolState
---

## Concept

Quand Pac-Man est **loin**, le fantôme est en mode `'patrol'` : il **patrouille** sans le chercher. Il continue tout droit quand il peut, et choisit une nouvelle direction aux carrefours.

Pour continuer tout droit, le fantôme a besoin de sa **dernière direction** :

```javascript
currentDirection: ghost.direction,
```

`ghost.direction` vaut `'left'`, `'right'`, `'up'`, `'down'` ou `null` (immobile).

**Règles de patrouille :**

1. Si `currentDirection` est libre (pas de mur devant le fantôme) → continue dans cette direction
2. Sinon (mur, carrefour) → essaie une autre direction ouverte, dans un ordre fixe : gauche, haut, droite, bas

## Où modifier

1. Fonction `buildInfos` — ajoute `currentDirection`
2. Fonction `chooseDirection` — ajoute un bloc `if (infos.state === 'patrol')` **avant** tes règles de poursuite de l'Atelier 1

## Observe le jeu

Sans patrouille, le fantôme **poursuit toujours** Pac-Man (Atelier 1) même quand il est loin. Après cette étape, il doit se comporter différemment quand tu es loin.

## À toi de jouer

Dans `buildInfos`, ajoute :

```javascript
currentDirection: ghost.direction,
```

Dans `chooseDirection`, ajoute **au début** (avant tes règles de poursuite) :

```javascript
if (infos.state === 'patrol') {
  if (infos.currentDirection === 'left' && infos.canGoLeft) return 'left';
  if (infos.currentDirection === 'right' && infos.canGoRight) return 'right';
  if (infos.currentDirection === 'up' && infos.canGoUp) return 'up';
  if (infos.currentDirection === 'down' && infos.canGoDown) return 'down';
  if (infos.canGoLeft) return 'left';
  if (infos.canGoUp) return 'up';
  if (infos.canGoRight) return 'right';
  if (infos.canGoDown) return 'down';
  return null;
}
```

## Vérifie

Clique **Démarrer**. Le fantôme doit **patrouiller** (orange) au lieu de te poursuivre activement.

## Si tu es bloqué

Le fantôme poursuit encore ? Vérifie que `updateState` retourne bien `'patrol'` et que le bloc `patrol` est **avant** tes règles de poursuite Atelier 1.

## Réflexion

Pourquoi a-t-on besoin de `currentDirection` pour patrouiller ?
