**Bienvenue dans l'Atelier 2 !** Tu vas donner au fantôme une vraie **mémoire de comportement** — pas seulement des règles de direction, mais des **modes** qui changent selon la situation.

**Prérequis :** termine l'**Atelier 1** d'abord (avec le fantôme qui poursuit Pac-Man).

**Objectif :** le fantôme a 3 modes — patrouille (`patrol`), poursuite (`follow`), peur (`scared`). Tu programmes d'abord la patrouille et la poursuite, puis la super-pill. Les changements de mode vont dans `updateState`, le mouvement dans `chooseDirection`.

**Super-pill :** grosses pastilles blanches aux 4 coins — elles effraient le fantôme 8 secondes (il devient bleu).

**Méthodologie :** lis l'étape → modifie le code → clique le panneau **Jeu** → **Démarrer**.

---

| Terme | Signification |
| --- | --- |
| `updateState` | Fonction qui choisit le mode du fantôme : `patrol`, `follow` ou `scared` |
| `'patrol'` | Mode patrouille — Pac-Man est loin, le fantôme avance tout droit sans le chercher (orange) |
| `'follow'` | Mode poursuite — Pac-Man est proche, le fantôme utilise l'arbre de décision de l'Atelier 1 (rouge) |
| `'scared'` | Mode peur — Pac-Man a mangé une super-pill, le fantôme fuit (bleu) |
| `super-pill` | Grande pastille blanche dans les 4 coins de la carte — effraie le fantôme 8 secondes |
| `game.scaredTimer` | Temps restant de la super-pill (> 0 = peur active) |
| `state` | Mode actuel du fantôme — tu le recopies dans `buildInfos` : `state: ghost.state` |
| `currentDirection` | Dernière direction du fantôme — tu le recopies : `currentDirection: ghost.direction` |
| `totalDistance` | Tu le calcules : `Math.abs(distanceX) + Math.abs(distanceY)` — nombre de cases entre fantôme et Pac-Man |

---

## Étape 1 — L'état et le mode patrol

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

---

## Étape 2 — Patrouiller

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

---

## Étape 3 — Mode follow

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

---

## Étape 4 — La super-pill et le mode scared

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

---

## Étape 5 — Fuir en mode scared

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

---

## Étape 6 — Défi : fantôme complet

## Concept

Dernière étape : trois fonctions travaillent ensemble :

- `buildInfos` — toutes les données (`canGo...`, `distanceX/Y`, `state`, `currentDirection`, `totalDistance`)
- `updateState` — les 3 modes avec transitions (`scared` → `follow` → `patrol`)
- `chooseDirection` — patrouille en `patrol`, fuite en `scared`, poursuite en `follow`

## Où modifier

Relis les trois fonctions une dernière fois. Corrige les bugs éventuels.

## Vérifie le comportement du jeu

- Lance une vraie partie de bout en bout
- **patrol** : fantôme orange qui patrouille quand tu es loin
- **follow** : poursuite active (rouge) quand tu t'approches
- **scared** : fantôme bleu qui fuit après une super-pill
- Super-pill : grosses pastilles blanches aux 4 coins
- En mode scared, tu peux croiser le fantôme sans mourir
- En mode patrol ou follow, toucher le fantôme = mort (redémarrage après 3 s)
- Pas de murs traversés
- Victoire = **toutes** les pastilles mangées
- Tu peux **Arrêter** ou **Réinitialiser** pour repositionner les personnages

## Vérifie

Tu gagnes la partie sans erreur de code. Les 3 modes fonctionnent.

## Si tu es bloqué

Un mode ne marche pas ? Teste chaque mode séparément : éloignement (`patrol`), proximité (`follow`), super-pill (`scared`).

Tu perds souvent ? En mode normal, évite le fantôme. En mode scared, profite-en pour manger des pastilles.

## Réflexion

Comment rendrais-tu la patrouille plus imprévisible sans ajouter un 4e mode ?
