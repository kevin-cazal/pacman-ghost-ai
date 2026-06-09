# Atelier 1 — Arbre de décision (decision tree)

> **Interface web :** les élèves suivent cet atelier dans le navigateur (panneau instructions + Monaco).  
> Ce fichier est une **référence offline** pour les animateurs.

> **Durée estimée :** 7 étapes × 10–15 min  
> **Fichier à modifier :** `ghost_ai.js` → fonction `chooseDirection`  
> **Règle :** ne lis qu'une étape à la fois. Ne saute pas d'étapes.

> Notes animateur : voir [`NOTES_ANIMATEUR.md`](../../NOTES_ANIMATEUR.md)

---

## Glossaire

Avant de commencer, voici les noms utilisés dans le code :

| Nom en anglais | Signification en français |
|----------------|---------------------------|
| `infos` | Objet avec toutes les infos pour décider |
| `canGoUp` | Je peux aller vers le haut ? (`true` / `false`) |
| `canGoDown` | Je peux aller vers le bas ? |
| `canGoLeft` | Je peux aller vers la gauche ? |
| `canGoRight` | Je peux aller vers la droite ? |
| `distanceX` | Pac-Man est à combien sur l'axe horizontal (positif = à droite) |
| `distanceY` | Pac-Man est à combien sur l'axe vertical (positif = en bas) |
| `totalDistance` | Distance totale en cases (plus c'est grand, plus Pac-Man est loin) |
| `null` | « Je ne bouge pas » |

---

## Étape 1 — Ta première règle

### Concept

Un **arbre de décision** (decision tree), c'est une suite de questions du type « si… alors… ».

Exemple dans la vie quotidienne : *« S'il pleut, je prends un parapluie. Sinon, je sors sans. »*

Dans notre jeu, le fantôme se pose des questions à chaque carrefour : *« Puis-je aller à gauche ? »* → si oui, il y va.

L'objet `infos` contient les réponses à ces questions. Tu n'as qu'à écrire des `if` en JavaScript.

### Observe le jeu

Clique sur **Démarrer** pour lancer la partie. Pac-Man avance vers la gauche. Le fantôme rouge **ne bouge pas** : ta fonction `chooseDirection` retourne `null` (= ne pas bouger).

### À toi de jouer

Dans `ghost_ai.js`, remplace `return null;` à l'**Étape 1** par ce code :

```javascript
if (infos.canGoLeft) {
  return 'left';
}
return null;
```

**Ligne par ligne :**
1. `if (infos.canGoLeft)` — « Est-ce que je peux aller à gauche sans traverser un mur ? »
2. `{ return 'left'; }` — Si oui, choisis la direction `'left'`.
3. `return null;` — Sinon, ne bouge pas.

### Vérifie

Clique **Appliquer le code**, puis sur le jeu. Si le fantôme peut aller à gauche, il devrait bouger.

### Réflexion

Que se passe-t-il si un mur bloque à gauche ? Pourquoi le `return null` à la fin est important ?

---

## Étape 2 — Ajouter une condition sur Pac-Man

### Concept

Une règle utile ne regarde pas seulement les murs : elle regarde aussi **où est Pac-Man**.

`infos.distanceX` te dit où est Pac-Man sur l'axe horizontal :
- **positif** → Pac-Man est **à droite** du fantôme
- **négatif** → Pac-Man est **à gauche**
- **zéro** → même colonne

Tu peux combiner deux conditions avec `&&` (signifie « ET ») :

```javascript
if (CONDITION_1 && CONDITION_2) {
  return '...';
}
```

### Observe le jeu

Avec le code de l'étape 1, le fantôme va à gauche **dès qu'il le peut**, même si Pac-Man est à l'autre bout de la carte. Ce n'est pas très intelligent.

### À toi de jouer

Modifie ta règle de l'étape 1 pour ajouter une condition : le fantôme ne va à gauche **que si** Pac-Man est aussi à gauche (`distanceX < 0`).

Indice : tu dois combiner `infos.canGoLeft` et `infos.distanceX < 0` dans un seul `if`.

### Vérifie

Pac-Man à droite du fantôme → le fantôme ne part plus systématiquement à gauche. Pac-Man à gauche → le fantôme peut suivre.

### Réflexion

Que signifie `distanceX > 0` en français ? Et `distanceX < 0` ?

---

## Étape 3 — La valeur par défaut

### Concept

Dans un arbre de décision, **chaque chemin doit se terminer** par une action. Si aucune règle ne s'applique, il faut une **valeur par défaut**.

Ici, la valeur par défaut est `null` = « je reste sur place (ou je continue tout droit si je bouge déjà) ».

C'est comme dire : *« Si aucune de mes règles ne marche, je ne change pas de direction. »*

### Observe le jeu

Teste ton code près d'un mur. Que se passe-t-il si ta condition est fausse mais que `canGoLeft` est vrai pour une autre raison ?

### À toi de jouer

Relis ton code : est-ce que **chaque branche** finit par un `return` ? Vérifie qu'il y a bien un `return null;` à la fin de ta fonction pour le cas « aucune règle ne correspond ».

Si tu n'en as plus (parce que tu l'as supprimé), remets-le.

### Vérifie

Le fantôme ne essaie jamais d'aller dans un mur. Quand aucune règle ne s'applique, il s'arrête.

### Réflexion

Que se passerait-il si tu oubliais le `return null` final ?

---

## Étape 4 — Une branche vers la droite

### Concept

Un arbre de décision a **plusieurs branches**. Tu as géré « à gauche » — il te faut maintenant une branche pour « à droite ».

Rappel des signes :
- `distanceX < 0` → Pac-Man à gauche
- `distanceX > 0` → Pac-Man à droite

Chaque branche est un `if` séparé, **avant** le `return null` final.

### Observe le jeu

Place Pac-Man à droite du fantôme. Que fait-il avec ton code actuel ?

### À toi de jouer

Ajoute une **deuxième règle** (un second `if`) pour aller à droite quand :
- Pac-Man est à droite, **et**
- le fantôme **peut** aller à droite

Utilise `infos.canGoRight` et le signe de `distanceX`. Écris ce `if` toi-même — la forme est la même que pour la gauche, mais avec d'autres valeurs.

### Vérifie

Pac-Man à droite → le fantôme tente d'aller à droite. Pac-Man à gauche → il tente d'aller à gauche.

### Réflexion

Dans quel ordre tes `if` sont-ils testés ? Que se passe-t-il si les deux conditions pourraient être vraies en même temps ?

---

## Étape 5 — L'axe vertical (haut / bas)

### Concept

Jusqu'ici tu as travaillé sur l'axe **horizontal** (`distanceX`). Il existe aussi l'axe **vertical** :

- `distanceY > 0` → Pac-Man est **en bas**
- `distanceY < 0` → Pac-Man est **en haut**

Les directions correspondantes sont `'up'` et `'down'`, avec `canGoUp` et `canGoDown`.

### Observe le jeu

Place Pac-Man au-dessus ou en dessous du fantôme (pas sur le même axe horizontal). Le fantôme réagit-il ?

### À toi de jouer

Ajoute **deux nouvelles branches** dans ton arbre : une pour le haut, une pour le bas. Même logique que l'étape 4, mais avec `distanceY`, `canGoUp` et `canGoDown`.

Ne copie pas un bloc entier depuis l'atelier — adapte toi-même les conditions.

### Vérifie

Pac-Man en haut → fantôme monte. Pac-Man en bas → fantôme descend. Les quatre directions fonctionnent.

### Réflexion

Est-ce que tu testes le horizontal ou le vertical en premier ? Est-ce que ça change le comportement quand Pac-Man est en diagonale ?

---

## Étape 6 — Priorité des règles

### Concept

Quand Pac-Man est **en diagonale** (ex. en haut à droite), **plusieurs conditions** peuvent être vraies en même temps :
- `distanceX > 0` (à droite)
- `distanceY < 0` (en haut)

En JavaScript, le **premier `if` qui correspond** gagne. C'est la **priorité** de ton arbre de décision.

Changer l'ordre des `if` = changer le comportement du fantôme.

### Observe le jeu

Place Pac-Man en diagonale par rapport au fantôme. Quelle direction choisit-il ? Est-ce le horizontal ou le vertical ?

### À toi de jouer

Expérimente : **inverse l'ordre** de deux de tes règles (par ex. mets le vertical avant l'horizontal). Observe la différence.

Réfléchis : quel ordre te semble le plus logique pour « poursuivre » Pac-Man ? Ajuste si tu veux — il n'y a pas qu'une seule bonne réponse.

### Vérifie

En diagonale, le fantôme choisit toujours **une** direction (pas les deux). Changer l'ordre des `if` change le choix.

### Réflexion

Si Pac-Man est exactement en diagonale, est-ce « plus à droite » ou « plus en haut » ? Comment ton ordre de règles tranche ?

---

## Étape 7 — Défi : poursuivre Pac-Man

### Concept

Tu as construit un **arbre de décision complet** : plusieurs branches, des conditions, une valeur par défaut. C'est exactement le principe utilisé en intelligence artificielle — sauf qu'en vrai, un programme peut **apprendre** l'arbre à partir de données.

### Observe le jeu

Joue une partie complète. Le fantôme te poursuit-il de façon convaincante ? Se coince-t-il dans les murs ?

### À toi de jouer

Améliore ton arbre pour que le fantôme **poursuive Pac-Man** le mieux possible. Checklist des outils à ta disposition :

- [ ] `canGoUp`, `canGoDown`, `canGoLeft`, `canGoRight` — éviter les murs
- [ ] `distanceX`, `distanceY` — savoir où est Pac-Man
- [ ] `totalDistance` — savoir s'il est proche ou loin (optionnel)
- [ ] Ordre des `if` — prioriser horizontal ou vertical
- [ ] `return null` — quand ne pas changer de direction

Tu peux aussi utiliser `infos.currentDirection` pour continuer tout droit à un carrefour.

**Pas de solution fournie** — c'est ton arbre à toi. Teste, ajuste, reteste.

### Vérifie

- Le fantôme se déplace sans traverser les murs.
- Il tend à se rapprocher de Pac-Man.
- Le jeu reste jouable (tu peux manger les pastilles).

### Réflexion

Combien de règles (`if`) as-tu au final ? Pourrait-on dessiner ton arbre sur papier avec des questions et des flèches ?

---

## Prochaine étape

Quand tu es satisfait de ton fantôme, passe à [**Atelier 2 — Machine à états**](ATELIER_2.md).
