---
title: Étape 4 — La super-pill et le mode scared
visual: scaredGhost
---

## Concept

Quand Pac-Man mange une **grosse pastille blanche** (super-pill), le fantôme a peur pendant 8 secondes. On le détecte avec `game.scaredTimer > 0` → mode `'scared'`.

Les transitions ne vont pas que dans un sens — le fantôme doit aussi **revenir** en arrière :

- `follow` → `patrol` quand Pac-Man s'éloigne (`totalDistance > 8`)
- `scared` → `patrol` ou `follow` quand la super-pill expire (`scaredTimer` revient à 0)

```
patrol ──(Pac-Man proche)──> follow
   ^                            |
   |                       (super-pill)
   |                            v
   +───────────────────────> scared
                                  |
                            (timer fini)
                                  |
                                  v
                               patrol
```

**Règle de priorité :** teste toujours `scared` **avant** `follow` dans `updateState`.

## Où modifier

Fonction `updateState` — remplace tout le contenu par la structure complète ci-dessous.

Ne modifie pas `chooseDirection` pour cette étape.

## Observe le jeu

Après une super-pill, le fantôme devient **bleu** mais utilise encore ses règles de patrouille ou de poursuite — la fuite viendra à l'étape 5.

## Astuce

Les petites pastilles orange ne comptent pas — cherche les **grosses pastilles blanches** aux 4 coins.

## À toi de jouer

Dans `updateState`, remplace tout le code par :

```javascript
if (game.scaredTimer > 0) {
  return 'scared';
}
if (infos.totalDistance <= 8) {
  return 'follow';
}
return 'patrol';
```

## Vérifie

Clique **Démarrer** et teste :

1. Sans super-pill : loin → `patrol`, proche → `follow`
2. Mange une super-pill → fantôme **bleu** (`scared`), prioritaire sur `follow`
3. Attends la fin du timer — fantôme repasse en `patrol` ou `follow`
4. Approche puis éloigne-toi — `follow` puis `patrol`

## Si tu es bloqué

Reste bloqué en `follow` ? Le `return 'patrol';` final doit s'exécuter quand `totalDistance > 8`.

Le fantôme ne devient pas bleu ? Vérifie que `scared` est testé **avant** `follow`.

## Réflexion

Pourquoi tester `scared` avant `follow` dans `updateState` ?
