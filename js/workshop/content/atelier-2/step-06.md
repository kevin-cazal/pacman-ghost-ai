---
title: Étape 6 — Défi : fantôme complet
visual: fsmComplete
---

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
