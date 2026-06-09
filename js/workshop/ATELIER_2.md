# Atelier 2 — Machine à états finis (finite state machine)

> **Interface web :** les élèves suivent cet atelier dans le navigateur (panneau instructions + Monaco).  
> Ce fichier est une **référence offline** pour les animateurs.

> **Durée estimée :** 7 étapes × 10–15 min  
> **Prérequis :** Atelier 1 terminé (tu as un `chooseDirection` qui fonctionne)  
> **Fichier à modifier :** `ghost_ai.js` → fonction `updateState` (et parfois `chooseDirection`)  
> **Règle :** ne lis qu'une étape à la fois. Ne saute pas d'étapes.

> Notes animateur : voir [`NOTES_ANIMATEUR.md`](../../NOTES_ANIMATEUR.md)

---

## Glossaire — états

| État | Signification |
|------|---------------|
| `'wait'` | Le fantôme attend / ne fait rien de spécial |
| `'follow'` | Le fantôme poursuit Pac-Man |
| `'scared'` | Le fantôme a peur (super-pill mangée) et fuit |

## Glossaire — objet `game`

| Nom | Signification |
|-----|---------------|
| `game.scaredTimer` | Temps restant (en secondes) où la super-pill est active. Si `> 0`, Pac-Man peut effrayer le fantôme. |

---

## Diagramme de référence (à implémenter progressivement)

```
    wait ──(Pac-Man proche)──> follow
     ^                            |
     |                            |
 (Pac-Man loin)              (super-pill)
     |                            |
     +────────────────────────────+
                                  v
                               scared
                                  |
                            (timer fini)
                                  |
                                  v
                               follow
```

Ce diagramme est une **cible** pour l'étape 7 — tu n'as pas à tout coder d'un coup.

---

## Étape 1 — Où vit l'état ?

### Concept

Une **machine à états finis** (finite state machine), c'est un système qui :
1. Est toujours dans **un état** parmi une liste finie (ex. `wait`, `follow`, `scared`).
2. **Change d'état** quand un événement arrive (ex. Pac-Man mange une super-pill).
3. **Se comporte différemment** selon l'état actuel.

Analogie : un feu tricolore — il est rouge, orange ou vert. Il ne peut pas être deux couleurs à la fois.

La fonction `updateState(infos, game)` décide **quel est le prochain état** à chaque carrefour.

### Observe le jeu

Le fantôme utilise déjà `chooseDirection` (Atelier 1). Mais son **état** reste `'wait'` tant que tu n'as pas codé `updateState`.

### À toi de jouer

Dans `ghost_ai.js`, la fonction `updateState` contient déjà :

```javascript
return 'wait';
```

C'est le **mini-exemple complet** de l'étape 1 : le fantôme reste toujours en mode `'wait'`. Laisse ce code pour l'instant et vérifie que le jeu fonctionne toujours.

### Vérifie

Le jeu se lance. Le fantôme se comporte comme à la fin de l'Atelier 1. Rien ne casse.

### Réflexion

Où le jeu stocke-t-il l'état actuel du fantôme ? (Indice : regarde `infos.state` dans le glossaire de `ghost_ai.js`.)

---

## Étape 2 — Réagir à la super-pill

### Concept

Un **changement d'état** (transition) est déclenché par un **événement**.

Ici, l'événement est : *Pac-Man a mangé une super-pill*. Le jeu le signale avec `game.scaredTimer > 0`.

Quand c'est vrai, le fantôme devrait passer en état `'scared'`.

Structure d'une transition :

```javascript
if (EVENEMENT) {
  return 'NOUVEL_ETAT';
}
return 'ETAT_ACTUEL_OU_DEFAUT';
```

### Observe le jeu

Mange une **grande pastille blanche** (super-pill) dans un coin de la carte. Le fantôme devient-il bleu ? Pas encore — tu dois coder la transition.

### À toi de jouer

Dans `updateState`, ajoute une condition : **si** `game.scaredTimer > 0`, **retourne** `'scared'`.

Sinon, retourne `'wait'` (pour l'instant).

Indice : tu n'as besoin que d'un `if` et de deux `return`.

### Vérifie

Mange une super-pill → le fantôme devient **bleu** (couleur `scared`). Après quelques secondes, le timer expire.

### Réflexion

Que se passe-t-il quand `scaredTimer` revient à 0 ? Quel état devrait reprendre le fantôme ?

---

## Étape 3 — L'état pilote le comportement

### Concept

L'Atelier 1 et l'Atelier 2 sont **liés** :
- `updateState` → choisit le **mode** (`wait`, `follow`, `scared`)
- `chooseDirection` → choisit la **direction** selon le mode

Dans `chooseDirection`, tu peux lire `infos.state` pour te comporter différemment :

```javascript
if (infos.state === 'NOM_ETAT') {
  // comportement pour cet état
}
```

### Observe le jeu

Après l'étape 2, le fantôme passe en `'scared'` mais **se comporte peut-être pareil** en déplacement (il utilise toujours ton arbre de l'Atelier 1).

### À toi de jouer

Dans `chooseDirection`, ajoute au **début** de ta fonction une structure du type :

```javascript
if (infos.state === 'scared') {
  // à toi de décider quoi faire ici — voir étape 5
}
```

Pour l'instant, tu peux mettre `return null;` dans le bloc `'scared'` pour voir que la branche est bien appelée (le fantôme s'arrête quand il a peur).

### Vérifie

État `'scared'` → le fantôme se comporte différemment de `'wait'`. Tu peux le vérifier en observant le mouvement après une super-pill.

### Réflexion

Pourquoi est-il utile de séparer « choisir l'état » et « choisir la direction » dans deux fonctions ?

---

## Étape 4 — L'état `follow` (poursuite)

### Concept

Un fantôme « intelligent » ne reste pas en `'wait'` tout le temps. Quand Pac-Man est **proche**, il passe en `'follow'` pour le chasser.

Tu peux utiliser `infos.totalDistance` pour mesurer la proximité :
- **petit** → Pac-Man est proche
- **grand** → Pac-Man est loin

Tu choisis le **seuil** (ex. 5 cases, 8 cases…).

### Observe le jeu

Avec seulement `'wait'` et `'scared'`, le fantôme ne poursuit jamais activement Pac-Man (sauf via ton Atelier 1 sans distinction d'état).

### À toi de jouer

Dans `updateState`, ajoute une transition vers `'follow'` quand Pac-Man est **assez proche**.

Conditions à combiner (dans l'ordre qui te semble logique) :
1. Pas en mode `'scared'` (super-pill inactive)
2. Pac-Man proche (`totalDistance` en dessous de ton seuil)

Retourne `'follow'` si les conditions sont remplies, sinon garde `'wait'` ou un autre état déjà codé.

**Pas de code complet fourni** — écris les `if` toi-même.

### Vérifie

Pac-Man loin → `'wait'`. Pac-Man proche → `'follow'`. Super-pill → `'scared'` (prioritaire).

### Réflexion

Que se passe-t-il si tu mets la condition `'scared'` **après** `'follow'` dans ton code ? Quel état gagne ?

---

## Étape 5 — Comportement `scared` (fuite)

### Concept

En état `'scared'`, le fantôme doit **s'éloigner** de Pac-Man — l'inverse de la poursuite.

Rappel Atelier 1 :
- `distanceX > 0` → Pac-Man à droite → pour **fuir**, va à **gauche** (`'left'`)
- `distanceX < 0` → Pac-Man à gauche → fuis à **droite**

Même logique pour `distanceY` et `'up'` / `'down'`.

N'oublie pas `canGoUp`, etc. — on ne fuit pas à travers un mur.

### Observe le jeu

En `'scared'`, le fantôme devrait ** éviter** Pac-Man, pas le suivre.

### À toi de jouer

Dans `chooseDirection`, complète le bloc `if (infos.state === 'scared')` :
- Si Pac-Man est à droite et tu peux aller à gauche → `'left'`
- Construis les autres directions par analogie

Utilise la **même forme** que l'Atelier 1, mais avec les directions **inversées**.

### Vérifie

Après une super-pill, le fantôme **fuit** Pac-Man au lieu de le suivre. Il ne traverse pas les murs.

### Réflexion

Est-ce que la fuite utilise le même ordre de priorité (horizontal vs vertical) que la poursuite ?

---

## Étape 6 — Retour à `wait`

### Concept

Une machine à états doit aussi savoir **quitter** un état :
- `'follow'` → `'wait'` quand Pac-Man s'éloigne
- `'scared'` → `'follow'` (ou `'wait'`) quand `scaredTimer` revient à 0

Pense à **toutes les flèches** du diagramme, pas seulement l'allée.

### Observe le jeu

Éloigne-toi du fantôme après l'avoir provoqué en `'follow'`. Reste-t-il en poursuite pour toujours ?

### À toi de jouer

Dans `updateState`, ajoute :
1. Si tu es en `'follow'` et Pac-Man est **loin** (`totalDistance` au-dessus de ton seuil) → `'wait'`
2. Si tu étais en `'scared'` et `game.scaredTimer <= 0` → `'follow'` ou `'wait'` (ton choix, justifie-le)

Combine avec les transitions des étapes précédentes. **L'ordre des `if` compte.**

### Vérifie

- Poursuite → éloignement → retour `'wait'`
- Super-pill → `'scared'` → timer fini → autre état
- Pas de blocage dans un état pour toujours

### Réflexion

Dessine sur papier ton `updateState` avec des flèches entre les états. Est-ce cohérent avec le diagramme du début ?

---

## Étape 7 — Défi : fantôme complet à 3 états

### Concept

Tu as maintenant **deux programmes** qui travaillent ensemble :
1. **Machine à états** (`updateState`) — décide du mode
2. **Arbre de décision** (`chooseDirection`) — décide du mouvement selon le mode

C'est une architecture très courante en jeux vidéo et en robots.

### Observe le jeu

Joue une partie complète : mange des pastilles, provoque le fantôme, utilise les super-pills, gagne la partie.

### À toi de jouer

Finalise les **deux fonctions** pour un fantôme crédible :

**`updateState` — checklist :**
- [ ] `'wait'` quand Pac-Man loin et pas de super-pill
- [ ] `'follow'` quand Pac-Man proche
- [ ] `'scared'` quand `scaredTimer > 0`
- [ ] Transitions retour (loin → wait, timer fini → follow ou wait)

**`chooseDirection` — checklist :**
- [ ] `'wait'` → `null` ou comportement calme (ton choix)
- [ ] `'follow'` → arbre de poursuite (Atelier 1)
- [ ] `'scared'` → arbre de fuite (étape 5)

**Pas de solution complète fournie.**

### Vérifie

- Les 3 états sont atteignables et visibles (couleur bleue en `'scared'`).
- Le fantôme ne traverse jamais les murs.
- Le jeu est gagnable en mangeant toutes les pastilles.

### Réflexion

Si tu ajoutais un 4e état `'patrol'` (patrouille), où le mettrais-tu dans le diagramme ? Que changerais-tu dans `updateState` seulement ?

---

## Félicitations

Tu as implémenté :
- Un **arbre de décision** pour le mouvement
- Une **machine à états finis** pour les modes de comportement

Ce sont deux briques fondamentales de l'intelligence artificielle et du développement de jeux.
