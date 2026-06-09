---
title: Étape 1 — L'état et le mode patrol
visual: fsmOverview
---

## Concept

Une **machine à états finis**, c'est un système qui :

1. Est toujours dans **un état** parmi une liste finie — ici : `patrol`, `follow`, `scared`
2. **Change d'état** quand un événement arrive — ex. Pac-Man s'approche, ou mange une super-pill
3. **Se comporte différemment** selon l'état actuel

Analogie : un feu tricolore — il est rouge, orange ou vert. Il ne peut pas être de deux couleurs à la fois.

Dans ton code, deux fonctions travaillent ensemble :

- `updateState` : décide **quel est le prochain mode** à adopter
- `chooseDirection` : choisit **comment bouger** selon le mode (via `infos.state`)

Pour que `chooseDirection` puisse lire le mode, tu dois d'abord l'ajouter dans `infos` via `buildInfos`. Pour cette étape, le fantôme reste en mode `'patrol'` par défaut — c'est le mode quand Pac-Man est loin.

## Où modifier

1. Fonction `buildInfos` : ajoute `state: ghost.state,` à ton objet existant (n'oublie pas la virgule)
2. Fonction `updateState` : laisse `return 'patrol';` tel quel

Ne modifie pas `chooseDirection` pour cette étape.

## Observe le jeu

Le fantôme se comporte encore comme à la fin de l'Atelier 1 — il poursuit Pac-Man. C'est normal : tu n'as pas encore codé le mouvement par mode. À l'étape 2, tu ajouteras la patrouille.

## À toi de jouer

Dans `buildInfos`, ajoute :

```javascript
state: ghost.state,
```

Dans `updateState`, laisse :

```javascript
return 'patrol';
```

## Vérifie

Clique **Démarrer**. Le fantôme poursuit encore Pac-Man (Atelier 1). Le jeu se lance sans erreur.

## Si tu es bloqué

Erreur après ajout de `state` ? Vérifie la virgule dans l'objet `return { ... }`.

## Réflexion

Pourquoi recopier `ghost.state` dans `infos` ? À quoi servira `infos.state` dans `chooseDirection` ?
