---
title: Étape 4 — Première règle de direction
visual: chooseDirectionLeft
---

## Concept
Tu as codé `canGoLeft` dans `buildInfos`. Le jeu passe ce résultat à `chooseDirection` dans `infos`.

## Où modifier
Fonction `chooseDirection`. Remplace `return null;` par le bloc ci-dessous.

```javascript
if (infos.canGoLeft) {
  return 'left';
}
return null;
```

## Observe le jeu:

`if (infos.canGoLeft) {` - « est-ce que je peux aller à gauche ? »
`   return 'left';` - si oui, choisis la direction gauche
`}` - fin de la condition
`return null;` — sinon, ne bouge pas

Pac-Man avance tout seul vers la gauche au départ. Le fantôme suit sa propre règle indépendamment: il va à gauche s'il n'y a pas de mur à sa gauche.

## Vérifie
Que le fantôme bouge vers la gauche quand il le peut.

## Si tu es bloqué
Le fantôme ne bouge pas ? As-tu cliqué **Démarrer** ? As-tu cliqué sur le jeu avant d'utiliser les flèches ?

## Réflexion
Que se passe-t-il si tu oublie le `return null;` à la fin de `chooseDirection` ?

