// NE PAS MODIFIER — contenu pédagogique des ateliers (affiché dans le navigateur)

export const GLOSSARY_ATELIER_1 = [
  { name: 'infos', meaning: 'Les réponses que le jeu te donne (ex. : puis-je aller à gauche ? où est Pac-Man ?)' },
  { name: 'canGoLeft', meaning: 'Oui ou non : le fantôme peut-il aller à gauche sans heurter un mur ?' },
  { name: 'canGoRight', meaning: 'Pareil pour la droite' },
  { name: 'canGoUp / canGoDown', meaning: 'Pareil pour le haut et le bas' },
  { name: 'distanceX', meaning: 'Où est Pac-Man sur l\'axe horizontal : positif = à droite, négatif = à gauche' },
  { name: 'distanceY', meaning: 'Où est Pac-Man sur l\'axe vertical : positif = en bas, négatif = en haut' },
  { name: 'return null', meaning: '« Je ne bouge pas » — le fantôme garde sa direction actuelle' },
];

export const GLOSSARY_ATELIER_2 = [
  { name: "'wait'", meaning: 'Mode normal : le fantôme se comporte comme à la fin de l\'Atelier 1' },
  { name: "'follow'", meaning: 'Mode poursuite : le fantôme essaie activement de rattraper Pac-Man' },
  { name: "'scared'", meaning: 'Mode peur : Pac-Man a mangé une super-pill, le fantôme fuit (bleu)' },
  { name: 'game.scaredTimer', meaning: 'Temps restant (en secondes) pendant lequel la super-pill est active' },
];

export const ATELIER_1 = [
  {
    title: 'Étape 1 — Ta première règle',
    visual: 'canGoLeft',
    concept: `Tu vas programmer le fantôme avec des règles du type <strong>« si… alors… »</strong>.

Exemple dans la vie : <em>« S'il pleut, je prends un parapluie. »</em>

Le jeu te donne déjà les réponses dans <code>infos</code> (voir glossaire). Toi, tu écris juste la règle dans la fonction <code>chooseDirection</code>.

<strong>Tu peux copier-coller</strong> le code proposé — pas besoin de le réécrire de mémoire.`,
    observe: 'Clique sur <strong>Démarrer</strong>. Le fantôme rouge <strong>ne bouge pas</strong> : pour l\'instant le code dit <code>return null;</code> (= ne pas bouger).',
    task: `Dans l'éditeur (milieu de l'écran), repère la fonction <code>chooseDirection</code>.

Remplace la ligne <code>return null;</code> par le code ci-dessous, puis clique <strong>Appliquer le code</strong> :

<pre>if (infos.canGoLeft) {
  return 'left';
}
return null;</pre>

Ensuite clique sur le jeu et appuie sur <strong>Démarrer</strong>.`,
    verify: 'Le fantôme bouge vers la gauche quand il le peut.',
    reflection: 'Que se passe-t-il si un mur bloque à gauche ?',
    codeExample: `if (infos.canGoLeft) {
  return 'left';
}
return null;`,
  },
  {
    title: 'Étape 2 — Regarder où est Pac-Man',
    visual: 'distanceXRight',
    concept: `<code>infos.distanceX</code> indique où est Pac-Man par rapport au fantôme :
<ul>
<li><strong>positif</strong> → Pac-Man est à droite</li>
<li><strong>négatif</strong> → Pac-Man est à gauche</li>
<li><strong>zéro</strong> → même colonne</li>
</ul>

Pour combiner deux conditions, on écrit <code>&amp;&amp;</code> (ça veut dire « ET »).`,
    observe: 'Avec l\'étape 1 seule, le fantôme part à gauche même quand Pac-Man est à droite.',
    task: `Remplace le contenu de <code>chooseDirection</code> par ce code (copie-coller), puis <strong>Appliquer le code</strong> :

<pre>if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
return null;</pre>

Le fantôme ne va à gauche <strong>que si</strong> Pac-Man est aussi à gauche.`,
    verify: 'Pac-Man à droite → le fantôme ne part plus toujours à gauche.',
    reflection: 'Que signifie <code>distanceX &gt; 0</code> en français simple ?',
    codeExample: `if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
return null;`,
  },
  {
    title: 'Étape 3 — Ne pas bouger par défaut',
    visual: 'canGoLeftWall',
    concept: `Quand <strong>aucune règle</strong> ne correspond, il faut quand même dire au fantôme quoi faire.

<code>return null;</code> à la fin = « je ne change pas de direction ». C'est la valeur par défaut.`,
    observe: 'Approche un mur avec le fantôme. Sans <code>return null;</code> final, le comportement peut devenir imprévisible.',
    task: `Vérifie que ton code se termine <strong>toujours</strong> par :

<pre>return null;</pre>

Garde aussi ta règle de l'étape 2 au-dessus. Clique <strong>Appliquer le code</strong>.`,
    verify: 'Près d\'un mur, le fantôme ne traverse pas les murs et s\'arrête si aucune règle ne s\'applique.',
    reflection: 'Que se passerait-il si tu oubliais le <code>return null;</code> à la fin ?',
    codeExample: `if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
return null;`,
  },
  {
    title: 'Étape 4 — Aller à droite',
    visual: 'canGoRight',
    concept: `Un arbre de décision a <strong>plusieurs branches</strong>. Tu as géré « à gauche » — ajoute maintenant « à droite ».

Chaque branche est un <code>if</code> séparé, <strong>avant</strong> le <code>return null;</code> final.`,
    observe: 'Place Pac-Man à droite du fantôme. Que fait-il avec ton code actuel ?',
    task: `Ajoute un second <code>if</code> <strong>avant</strong> le <code>return null;</code> final. Copie ce code complet :

<pre>if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
if (infos.canGoRight && infos.distanceX > 0) {
  return 'right';
}
return null;</pre>`,
    verify: 'Pac-Man à droite → fantôme à droite. Pac-Man à gauche → fantôme à gauche.',
    reflection: 'Dans quel ordre le programme teste-t-il tes deux <code>if</code> ?',
    codeExample: `if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
if (infos.canGoRight && infos.distanceX > 0) {
  return 'right';
}
return null;`,
  },
  {
    title: 'Étape 5 — Monter et descendre',
    visual: 'distanceY',
    concept: `Même idée sur l'axe <strong>vertical</strong> :
<ul>
<li><code>distanceY &gt; 0</code> → Pac-Man en bas → direction <code>'down'</code></li>
<li><code>distanceY &lt; 0</code> → Pac-Man en haut → direction <code>'up'</code></li>
</ul>`,
    observe: 'Place Pac-Man au-dessus ou en dessous du fantôme.',
    task: `Ajoute deux branches pour le haut et le bas. Voici un exemple complet à copier (tu peux l'adapter) :

<pre>if (infos.canGoLeft && infos.distanceX < 0) {
  return 'left';
}
if (infos.canGoRight && infos.distanceX > 0) {
  return 'right';
}
if (infos.canGoUp && infos.distanceY < 0) {
  return 'up';
}
if (infos.canGoDown && infos.distanceY > 0) {
  return 'down';
}
return null;</pre>`,
    verify: 'Pac-Man en haut → fantôme monte. En bas → fantôme descend.',
    reflection: 'As-tu bien gardé le <code>return null;</code> à la toute fin ?',
    codeExample: `if (infos.canGoUp && infos.distanceY < 0) {
  return 'up';
}
if (infos.canGoDown && infos.distanceY > 0) {
  return 'down';
}`,
  },
  {
    title: 'Étape 6 — Qui gagne en diagonale ?',
    visual: 'rulePriority',
    concept: `Quand Pac-Man est en diagonale, <strong>plusieurs règles</strong> peuvent être vraies en même temps.

Le programme teste les <code>if</code> <strong>dans l'ordre du haut vers le bas</strong>. Le premier qui correspond gagne.`,
    observe: 'Place Pac-Man en diagonale. Quelle direction choisit le fantôme : horizontal ou vertical ?',
    task: `Inverse l'ordre de deux règles dans ton code (par ex. mets le vertical avant le horizontal). Clique <strong>Appliquer le code</strong> et observe la différence.`,
    verify: 'En changeant l\'ordre des <code>if</code>, le fantôme choisit une autre direction en diagonale.',
    reflection: 'Quelle règle est testée en premier dans ton code actuel ?',
  },
  {
    title: 'Étape 7 — Défi : poursuivre Pac-Man',
    visual: 'pursuit',
    concept: `Tu as construit un <strong>arbre de décision</strong> : plusieurs règles « si… alors… » qui choisissent une direction.

C'est une technique utilisée en intelligence artificielle.`,
    observe: 'Joue une partie complète. Le fantôme te suit-il ? Se coince-t-il dans un coin ?',
    task: `Améliore ton arbre pour que le fantôme <strong>poursuive Pac-Man</strong> le mieux possible. Checklist :
<ul>
<li>Toutes les directions (haut, bas, gauche, droite) avec <code>canGo...</code></li>
<li><code>distanceX</code> et <code>distanceY</code> pour savoir où est Pac-Man</li>
<li>Un <code>return null;</code> à la fin</li>
<li>Un ordre de <code>if</code> qui te convient</li>
</ul>`,
    verify: 'Le fantôme se déplace sans traverser les murs et tend à se rapprocher de Pac-Man.',
    reflection: 'Combien de règles (<code>if</code>) as-tu au total ?',
  },
];

export const ATELIER_2 = [
  {
    title: 'Étape 1 — Les modes du fantôme',
    visual: 'fsmOverview',
    concept: `Le fantôme peut être dans <strong>un seul mode</strong> à la fois :
<ul>
<li><code>'wait'</code> — mode normal</li>
<li><code>'follow'</code> — mode poursuite</li>
<li><code>'scared'</code> — mode peur (super-pill)</li>
</ul>

Analogie : un feu tricolore — rouge, orange ou vert, jamais deux à la fois.

La fonction <code>updateState</code> choisit le mode. Tu la modifies dans l'éditeur.`,
    observe: 'Pour l\'instant le fantôme reste en mode <code>wait</code>.',
    task: `Dans <code>updateState</code>, le code suivant est déjà présent — laisse-le tel quel et clique <strong>Appliquer le code</strong> :

<pre>return 'wait';</pre>`,
    verify: 'Le jeu se lance. Le fantôme se comporte comme à la fin de l\'Atelier 1.',
    reflection: 'Où lit-on le mode actuel du fantôme ? (Indice : <code>infos.state</code>.)',
    codeExample: "return 'wait';",
  },
  {
    title: 'Étape 2 — La super-pill',
    visual: 'scaredGhost',
    concept: `Quand Pac-Man mange une <strong>grande pastille blanche</strong> (super-pill), le fantôme a peur pendant quelques secondes.

On le détecte avec : <code>game.scaredTimer &gt; 0</code> → mode <code>'scared'</code>.`,
    observe: 'Mange une super-pill (coin de la carte). Le fantôme devient-il bleu ? Pas encore sans ton code.',
    task: `Remplace le contenu de <code>updateState</code> par :

<pre>if (game.scaredTimer > 0) {
  return 'scared';
}
return 'wait';</pre>

Puis <strong>Appliquer le code</strong> et teste en mangeant une super-pill.`,
    verify: 'Après une super-pill, le fantôme devient <strong>bleu</strong>.',
    reflection: 'Que se passe-t-il quand le timer revient à 0 ?',
    codeExample: `if (game.scaredTimer > 0) {
  return 'scared';
}
return 'wait';`,
  },
  {
    title: 'Étape 3 — Le mode change le comportement',
    visual: 'stateBehavior',
    concept: `<code>updateState</code> choisit le <strong>mode</strong>. <code>chooseDirection</code> choisit le <strong>mouvement</strong> selon ce mode.

On lit le mode avec <code>infos.state</code>.`,
    observe: 'En mode <code>scared</code>, le fantôme devrait se comporter différemment — mais seulement si tu le codes.',
    task: `Au <strong>début</strong> de <code>chooseDirection</code>, ajoute ce bloc (copie-coller) :

<pre>if (infos.state === 'scared') {
  return null;
}</pre>

Pour l'instant le fantôme ne bouge pas en mode peur — c'est normal, tu complèteras à l'étape 5.`,
    verify: 'En mode <code>scared</code>, le fantôme se comporte différemment de <code>wait</code>.',
    reflection: 'Pourquoi séparer « choisir le mode » et « choisir la direction » ?',
    codeExample: `if (infos.state === 'scared') {
  return null;
}`,
  },
  {
    title: 'Étape 4 — Mode poursuite',
    visual: 'followState',
    concept: `Quand Pac-Man est <strong>proche</strong>, on passe en mode <code>'follow'</code>.

On mesure la distance avec <code>infos.totalDistance</code> (nombre de cases). Tu choisis un seuil, par ex. <code>8</code>.`,
    observe: 'Sans le mode <code>follow</code>, le fantôme ne « active » jamais vraiment la poursuite.',
    task: `Complète <code>updateState</code>. Exemple à copier et adapter (seuil = 8 cases) :

<pre>if (game.scaredTimer > 0) {
  return 'scared';
}
if (infos.totalDistance <= 8) {
  return 'follow';
}
return 'wait';</pre>`,
    verify: 'Pac-Man loin → <code>wait</code>. Proche → <code>follow</code>. Super-pill → <code>scared</code> (prioritaire).',
    reflection: 'Pourquoi tester <code>scared</code> avant <code>follow</code> ?',
    codeExample: `if (game.scaredTimer > 0) {
  return 'scared';
}
if (infos.totalDistance <= 8) {
  return 'follow';
}
return 'wait';`,
  },
  {
    title: 'Étape 5 — Fuir en mode peur',
    visual: 'fleeScared',
    concept: `En mode <code>'scared'</code>, le fantôme doit <strong>fuir</strong> Pac-Man — directions <strong>inversées</strong> par rapport à la poursuite :
<ul>
<li>Pac-Man à droite → va à <code>'left'</code></li>
<li>Pac-Man à gauche → va à <code>'right'</code></li>
</ul>
Même logique pour haut / bas.`,
    observe: 'Après une super-pill, le fantôme devrait s\'éloigner de Pac-Man.',
    task: `Dans le bloc <code>if (infos.state === 'scared')</code> de <code>chooseDirection</code>, remplace <code>return null;</code> par des règles de fuite. Exemple de départ :

<pre>if (infos.state === 'scared') {
  if (infos.canGoLeft && infos.distanceX > 0) {
    return 'left';
  }
  if (infos.canGoRight && infos.distanceX < 0) {
    return 'right';
  }
  return null;
}</pre>

Complète avec le haut / le bas si tu veux.`,
    verify: 'Après super-pill, le fantôme <strong>fuit</strong> sans traverser les murs.',
    reflection: 'La fuite utilise-t-elle les mêmes directions que la poursuite ?',
    codeExample: `if (infos.state === 'scared') {
  if (infos.canGoLeft && infos.distanceX > 0) {
    return 'left';
  }
  if (infos.canGoRight && infos.distanceX < 0) {
    return 'right';
  }
  return null;
}`,
  },
  {
    title: 'Étape 6 — Revenir au mode normal',
    visual: 'stateTransitions',
    concept: `Il faut aussi <strong>quitter</strong> un mode :
<ul>
<li><code>follow</code> → <code>wait</code> quand Pac-Man s'éloigne</li>
<li><code>scared</code> → <code>wait</code> quand la super-pill expire</li>
</ul>`,
    observe: 'Éloigne-toi du fantôme en mode <code>follow</code>. Reste-t-il en poursuite ?',
    task: `Modifie <code>updateState</code> pour gérer le retour. Exemple :

<pre>if (game.scaredTimer > 0) {
  return 'scared';
}
if (infos.totalDistance <= 8) {
  return 'follow';
}
return 'wait';</pre>

Quand Pac-Man s'éloigne (<code>totalDistance &gt; 8</code>), le dernier <code>return 'wait'</code> s'applique.`,
    verify: 'Poursuite → éloignement → <code>wait</code>. Super-pill → <code>scared</code> → timer fini → <code>wait</code>.',
    reflection: 'Peux-tu expliquer avec tes mots quand le fantôme repasse en <code>wait</code> ?',
    codeExample: `if (game.scaredTimer > 0) {
  return 'scared';
}
if (infos.totalDistance <= 8) {
  return 'follow';
}
return 'wait';`,
  },
  {
    title: 'Étape 7 — Défi : fantôme complet',
    visual: 'fsmComplete',
    concept: `Deux fonctions travaillent ensemble :
<ol>
<li><code>updateState</code> — choisit le mode (wait / follow / scared)</li>
<li><code>chooseDirection</code> — choisit la direction selon le mode</li>
</ol>`,
    observe: 'Joue une partie complète : pastilles, super-pills, victoire.',
    task: `Finalise les deux fonctions. Vérifie :
<ul>
<li><code>updateState</code> : scared, follow, wait + retours</li>
<li><code>chooseDirection</code> : poursuite en <code>wait</code>/<code>follow</code>, fuite en <code>scared</code></li>
</ul>`,
    verify: 'Les 3 modes fonctionnent, pas de traversée de murs, partie gagnable.',
    reflection: 'Quelle fonction changerais-tu pour ajouter un 4e mode <code>patrol</code> ?',
  },
];

export const ATELIER_META = {
  1: {
    title: 'Atelier 1 — Arbre de décision',
    functionName: 'chooseDirection',
    glossary: GLOSSARY_ATELIER_1,
    intro: `<strong>Bienvenue !</strong> Tu modifies <code>ghost_ai.js</code> au centre. Le jeu te donne déjà les informations (<code>infos</code>) — tu n'as pas à les calculer. Copie le code proposé, <strong>Appliquer le code</strong>, <strong>Démarrer</strong>, teste. Variante plus avancée : <a href="?mode=build">Infos à coder</a>.`,
  },
  2: {
    title: 'Atelier 2 — Machine à états finis',
    functionName: 'updateState',
    glossary: GLOSSARY_ATELIER_2,
    intro: `<strong>Atelier 2</strong> : modes wait / follow / scared. Tu programmes <code>updateState</code> et le mouvement dans <code>chooseDirection</code>. Copie, <strong>Appliquer</strong>, <strong>Démarrer</strong>, teste. Variante avancée : <a href="?mode=build">Infos à coder</a>.`,
  },
};
