---
title: Étape 3 — Mode follow
visual: followState
---

## Concept

Quand Pac-Man est **proche**, le fantôme passe en `'follow'` pour le chasser activement avec ton arbre de décision de l'Atelier 1.

Tu mesures la proximité avec `totalDistance` :

```javascript
totalDistance: Math.abs(pacman.gridX - ghost.gridX) + Math.abs(pacman.gridY - ghost.gridY)
```

Dans `updateState`, retourne `'follow'` si Pac-Man est proche (≤ 8 cases), sinon `'patrol'`.

Dans `chooseDirection`, tes règles de poursuite de l'Atelier 1 ne doivent s'appliquer **que** en mode `'follow'` — sinon le fantôme poursuivrait aussi en patrouille.

## Où modifier

1. Fonction `buildInfos` — ajoute `totalDistance`
2. Fonction `updateState` — remplace `return 'patrol';` par la transition vers `'follow'`
3. Fonction `chooseDirection` — enveloppe tes règles de poursuite Atelier 1 dans `if (infos.state === 'follow') { ... }`

## Observe le jeu

Sans le mode `follow`, le fantôme patrouille même quand tu t'approches.

## À toi de jouer

Dans `buildInfos`, ajoute :

```javascript
totalDistance: Math.abs(pacman.gridX - ghost.gridX) + Math.abs(pacman.gridY - ghost.gridY),
```

Dans `updateState`, remplace le contenu par :

```javascript
if (infos.totalDistance <= 8) {
  return 'follow';
}
return 'patrol';
```

Dans `chooseDirection`, enveloppe **tout** ton arbre de poursuite Atelier 1 :

```javascript
if (infos.state === 'follow') {
  // … tout ton code de poursuite Atelier 1 ici …
}
```

## Vérifie

Clique **Démarrer** :

- Pac-Man loin → `patrol` (orange, patrouille)
- Pac-Man proche → `follow` (rouge, poursuite active)

## Si tu es bloqué

Le fantôme poursuit de loin ? Tes règles Atelier 1 sont peut-être **en dehors** du bloc `if (infos.state === 'follow')`.

Toujours en `follow` ? Vérifie que `totalDistance` est bien calculé dans `buildInfos`.

## Réflexion

Pourquoi la poursuite ne doit-elle marcher qu'en mode `follow` et pas en `patrol` ?
