# Solutions — Atelier 1 (Arbre de décision)

> **Document animateur uniquement** — ne pas distribuer aux élèves pendant l'atelier.

Fichier à modifier : `chooseDirection` dans `js/workshop/ghost_ai.js`.  
La fonction `updateState` reste `return 'patrol';` pendant tout l'Atelier 1.

Pac-Man **avance vers la gauche dès le départ** (sans appuyer sur une flèche).

Chaque section montre le code **cumulatif** à la fin de l'étape correspondante.

---

## Étape 1 — Ta première règle

```javascript
if (infos.canGoLeft) {
  return 'left';
}
return null;
```

---

## Étape 2 — Ajouter une condition sur Pac-Man

```javascript
if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
return null;
```

---

## Étape 3 — La valeur par défaut

Même code que l'étape 2. L'important est de conserver le `return null;` final :

```javascript
if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
return null;
```

---

## Étape 4 — Une branche vers la droite

```javascript
if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
if (infos.canGoRight && infos.distanceX > 0) {
  return 'right';
}
return null;
```

---

## Étape 5 — L'axe vertical (haut / bas)

```javascript
if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
if (infos.canGoRight && infos.distanceX > 0) {
  return 'right';
}
if (infos.canGoDown && infos.distanceY > 0) {
  return 'down';
}
if (infos.canGoUp && infos.distanceY < 0) {
  return 'up';
}
return null;
```

---

## Étape 6 — Priorité des règles

Avec l'ordre **horizontal puis vertical** (étape 5), Pac-Man en diagonale déclenche d'abord gauche/droite.

Variante **vertical d'abord** (pour comparer en classe) :

```javascript
if (infos.canGoDown && infos.distanceY > 0) {
  return 'down';
}
if (infos.canGoUp && infos.distanceY < 0) {
  return 'up';
}
if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
if (infos.canGoRight && infos.distanceX > 0) {
  return 'right';
}
return null;
```

---

## Étape 7 — Défi : poursuivre Pac-Man

Solution plus robuste : aller d'abord sur l'axe où Pac-Man est **le plus loin**, puis essayer l'autre axe.

```javascript
if (Math.abs(infos.distanceX) >= Math.abs(infos.distanceY)) {
  if (infos.distanceX > 0 && infos.canGoRight) {
    return 'right';
  }
  if (infos.distanceX < 0 && infos.canGoLeft) {
    return 'left';
  }
  if (infos.distanceY > 0 && infos.canGoDown) {
    return 'down';
  }
  if (infos.distanceY < 0 && infos.canGoUp) {
    return 'up';
  }
} else {
  if (infos.distanceY > 0 && infos.canGoDown) {
    return 'down';
  }
  if (infos.distanceY < 0 && infos.canGoUp) {
    return 'up';
  }
  if (infos.distanceX > 0 && infos.canGoRight) {
    return 'right';
  }
  if (infos.distanceX < 0 && infos.canGoLeft) {
    return 'left';
  }
}

return null;
```

La solution de l'étape 5 (quatre `if` simples) reste valide pour l'étape 7 si l'élève la trouve suffisante.

---

## Code complet `chooseDirection` (fin Atelier 1)

À coller entre les bannières `CODE ÉLÈVE — Atelier 1` :

```javascript
export function chooseDirection(infos, map) {

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> CODE ÉLÈVE — Début — Atelier 1 (Arbre de décision) ║
  // ╚══════════════════════════════════════════════════════════╝

  if (Math.abs(infos.distanceX) >= Math.abs(infos.distanceY)) {
    if (infos.distanceX > 0 && infos.canGoRight) {
      return 'right';
    }
    if (infos.distanceX < 0 && infos.canGoLeft) {
      return 'left';
    }
    if (infos.distanceY > 0 && infos.canGoDown) {
      return 'down';
    }
    if (infos.distanceY < 0 && infos.canGoUp) {
      return 'up';
    }
  } else {
    if (infos.distanceY > 0 && infos.canGoDown) {
      return 'down';
    }
    if (infos.distanceY < 0 && infos.canGoUp) {
      return 'up';
    }
    if (infos.distanceX > 0 && infos.canGoRight) {
      return 'right';
    }
    if (infos.distanceX < 0 && infos.canGoLeft) {
      return 'left';
    }
  }

  return null;

  // ╔══════════════════════════════════════════════════════════╗
  // ║  >>> CODE ÉLÈVE — Fin   — Atelier 1 (Arbre de décision) ║
  // ╚══════════════════════════════════════════════════════════╝
}
```

(`map` n'est pas utilisé ici — c'est normal, le jeu le passe pour les ateliers plus avancés.)
