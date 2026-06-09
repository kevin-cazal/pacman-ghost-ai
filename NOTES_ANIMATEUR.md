# Notes animateur

Document réservé aux enseignants — **ne pas afficher aux élèves** dans l'interface.

## Installation et lancement

1. `./scripts/setup-monaco.sh` (une fois)
2. `python3 -m http.server 8000` → ouvrir le navigateur
3. Les élèves travaillent dans l'interface web (instructions + Monaco + jeu)

## Déroulé général

- Fais jouer les élèves 1–2 min avant de coder (fantôme immobile au départ : c'est normal).
- Après chaque étape : **Appliquer le code** → cliquer sur le jeu → tester avec les flèches.
- Durée estimée : **7 étapes × 10–15 min** par atelier.
- Rappeler la règle : **une étape à la fois**, ne pas lire la suite.

## Atelier 1 — Arbre de décision

- Fichier élève : `chooseDirection` dans `ghost_ai.js` (éditeur Monaco).
- **Étape 1 seule** : mini-exemple complet fourni dans le panneau instructions.
- **Étapes 2–7** : concepts et indices uniquement, pas de solution complète.

### Erreurs fréquentes

- Retourner `'right'` sans vérifier `canGoRight` → le fantôme tente d'aller dans un mur.
- Oublier `return` → la fonction ne renvoie rien, le fantôme reste immobile.
- Oublier `return null` en fin de fonction → comportement imprévisible.

### Démo suggérée

1. Jouer → fantôme immobile
2. Code étape 1 → Appliquer → tester
3. Répéter étape par étape

## Atelier 2 — Machine à états finis

- Prérequis : Atelier 1 terminé (`chooseDirection` fonctionnel).
- Fichier élève : `updateState` (et parfois `chooseDirection` selon l'étape).
- Les deux blocs sont dans le **même fichier** — pas besoin de toucher `ghost.js`.

### Vocabulaire à rappeler

- Un **état** = un mode de comportement (comme silencieux / sonnerie sur un téléphone).
- `'patrol'`, `'follow'`, `'scared'` — le fantôme devient **bleu** en `'scared'`, **orange** en `'patrol'`.
- `game.scaredTimer > 0` → super-pill active.

### Erreurs fréquentes

- Modifier `chooseDirection` sans mettre à jour `updateState` (ou l'inverse).
- Mauvais ordre des `if` dans `updateState` → `'scared'` doit être prioritaire sur `'follow'`.
- Oublier les transitions retour (`follow` → `patrol`, `scared` → autre état).
- Laisser la poursuite Atelier 1 active en mode `patrol` (doit être dans `if (infos.state === 'follow')` uniquement).

## Jeu — rappels techniques

- **Recommencer** : reset manuel (carte, score, positions).
- **Collision fantôme** : mort si le fantôme n'est pas en `'scared'`, redémarrage auto après 3 s.
- Super-pill : active `scaredTimer` (8 s par défaut).

## Fichiers de référence

| Fichier | Usage |
|---------|--------|
| `js/workshop/steps.js` | Contenu affiché dans le navigateur |
| `js/workshop/ATELIER_1.md` | Copie offline Atelier 1 |
| `js/workshop/ATELIER_2.md` | Copie offline Atelier 2 |
| `js/workshop/ghost_ai.js` | Modèle de code chargé dans Monaco |
