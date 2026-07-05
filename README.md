# Pac-Man Ghost AI

Ateliers pour programmer l'intelligence du fantôme de Pac-Man (code élève en **Lua**, moteur de jeu en JavaScript).

## Ateliers

- [Atelier 1 — Arbre de décision](WORKSHOP_starter.md) — construire les infos du fantôme et écrire ses règles de direction
- [Atelier 2 — Machine à états finis](WORKSHOP_fsm.md) — patrouille, poursuite et peur (super pac-gomme)

## Développement local

```bash
./scripts/setup-monaco.sh
./scripts/setup-fengari.sh
npm install
npx playwright install chromium
npm run test:all
```

Puis servir le dossier avec un serveur HTTP statique (les modules ES et le chargement du template Lua nécessitent HTTP).
