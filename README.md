# Mini Pac-Man — Atelier IA

Un mini Pac-Man pour apprendre l'intelligence artificielle pas à pas, **directement dans le navigateur**. Toutes les instructions pour les élèves sont dans l'interface web — aucun animateur requis.

## Installation (une seule fois)

```bash
./scripts/setup-monaco.sh
```

Ce script installe Monaco Editor dans `lib/monaco/` (nécessaire pour l'éditeur de code).

Le moteur markdown [**marked**](https://marked.js.org/) est déjà inclus dans `lib/marked/` — aucune installation supplémentaire.

## Lancer l'atelier

```bash
python3 -m http.server 8000
```

Ouvre [http://localhost:8000](http://localhost:8000) dans Chrome ou Firefox.

## Interface

Trois panneaux côte à côte :

| Panneau | Rôle |
|---------|------|
| **Instructions** (gauche) | Étapes, explications, schémas animés, aide |
| **Code** (centre) | Éditeur Monaco — tu modifies `ghost_ai_build.js` |
| **Jeu** (droite) | Pac-Man — tu testes ton code |

### Workflow élève

1. Lis l'étape courante (section **Aide — travailler seul** toujours disponible en haut)
2. Modifie le code dans l'éditeur (zones `>>> TON CODE`)
3. Clique sur le panneau **Jeu**, puis **Démarrer** (ton code est chargé automatiquement)
4. Joue avec les **flèches** du clavier
6. Passe à l'étape suivante quand la vérification est OK

> **Clique sur l'éditeur pour coder** (les flèches éditent le texte).  
> **Clique sur le jeu pour jouer** (les flèches déplacent Pac-Man).

Le code est sauvegardé automatiquement dans le navigateur (`localStorage`).

## Modifier les instructions (markdown)

Les textes affichés dans le navigateur sont des fichiers **markdown** sous `js/workshop/content/` :

```
js/workshop/content/
  aide.md                 # Aide — travailler seul
  ui-hints.md             # Indications panneaux Code et Jeu
  atelier-1/
    meta.json             # titre, liste des étapes
    intro.md              # introduction Atelier 1
    glossary.md           # glossaire (table markdown)
    step-01.md … step-10.md
  atelier-2/
    meta.json
    intro.md
    glossary.md
    step-01.md … step-07.md
```

### Format d'une étape (`step-NN.md`)

```markdown
---
title: Étape 5 — Calculer distanceX
visual: distanceXRight
---

## Concept
…

Corps libre en markdown : titres, listes, blocs de code, etc.
```

Seuls `title` et `visual` (optionnel) dans le frontmatter sont interprétés par le jeu. Le reste du fichier est rendu tel quel.

Le champ `visual` active un schéma animé (ex. `gridCoordinates`, `pursuit`). Mettre `visual: null` ou l'omettre si aucun schéma.

Après modification, recharge la page (serveur HTTP requis pour le `fetch` des `.md`).

## Fichiers

| Fichier | Rôle |
|---------|------|
| `js/workshop/ghost_ai_build.js` | Modèle de code élève (chargé dans Monaco au démarrage) |
| `js/workshop/content/` | Instructions markdown (source de vérité pour l'UI) |
| `js/workshop/steps_from_md.js` | Charge et parse les `.md` au démarrage |
| `js/workshop/markdown.js` | Utilitaires frontmatter, sections, rendu marked |
| `lib/marked/marked.esm.js` | Bibliothèque marked (vendored, voir `lib/marked/VERSION`) |
| `js/workshop/ATELIER_1.md` | Copie offline / référence animateur (Atelier 1) |
| `js/workshop/ATELIER_2.md` | Copie offline / référence animateur (Atelier 2) |
| Autres fichiers `js/` | Code du jeu — ne pas modifier |

## Ateliers

1. **Atelier 1** — Arbre de décision : `buildInfos` + `chooseDirection` (10 étapes)
2. **Atelier 2** — Machine à états finis : `updateState` + modes patrol/follow/scared (7 étapes, prérequis Atelier 1)

Les fichiers `.md` à la racine de `js/workshop/` et `NOTES_ANIMATEUR.md` sont des **références pour les enseignants**. Les élèves n'en ont pas besoin — tout est dans l'interface web.
