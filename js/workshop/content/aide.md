

**Clavier :** clique l'**éditeur** pour coder (flèches = curseur). Clique le **jeu** pour jouer (flèches = Pac-Man). Le contour **jaune** indique le panneau actif.

Le code est sauvegardé automatiquement dans ton navigateur. Les erreurs s'affichent sous l'éditeur.

## Erreurs fréquentes

- Code modifié mais pas testé → reclique **Démarrer** pour recharger ton code
- Flèches sans effet → clique d'abord sur le jeu, puis **Démarrer**
- Fantôme immobile au début → **normal** tant que tu n'as pas codé de règle
- Oublier `return null;` à la fin de `chooseDirection`
- Retourner `'right'` sans vérifier `canGoRight` → le fantôme traverse les murs
- Patrouille : bloc `if (infos.state === 'patrol')` **avant** les règles de poursuite — continuer `currentDirection` avant de choisir une autre direction (ordre fixe : gauche, haut, droite, bas)
- Poursuite Atelier 1 uniquement dans `if (infos.state === 'follow')` — pas en `patrol`
- Dans `updateState`, tester `scared` *avant* `follow`
- Fuite en `scared` : bloc entre `patrol` et `follow` dans `chooseDirection`
