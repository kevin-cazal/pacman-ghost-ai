// NE PAS MODIFIER — code de base de l'atelier

import { setGhostAI, setGhostAIErrorHandler } from './entities/ghost.js';
import { getWorkshopMode } from './workshop/config.js';

let lastGoodModule = null;

export async function loadInitialCode(mode = getWorkshopMode()) {
  const saved = localStorage.getItem(mode.storageKey);
  if (saved) {
    return saved;
  }
  const response = await fetch(mode.templateUrl);
  if (!response.ok) {
    throw new Error(`Impossible de charger le modèle ${mode.templateUrl}`);
  }
  return response.text();
}

export function saveCode(code, mode = getWorkshopMode()) {
  localStorage.setItem(mode.storageKey, code);
}

export async function applyStudentCode(code, game, mode = getWorkshopMode()) {
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  try {
    const module = await import(/* webpackIgnore: true */ url);

    if (mode.requiresBuildInfos && typeof module.buildInfos !== 'function') {
      throw new Error('Export buildInfos manquant');
    }
    if (typeof module.chooseDirection !== 'function') {
      throw new Error('Export chooseDirection manquant');
    }
    if (typeof module.updateState !== 'function') {
      throw new Error('Export updateState manquant');
    }

    setGhostAI(
      module.chooseDirection,
      module.updateState,
      mode.requiresBuildInfos ? module.buildInfos : null
    );
    setGhostAIErrorHandler((err, context) => {
      game.handleRuntimeError(err, context);
    });
    lastGoodModule = module;
    saveCode(code, mode);
    game.clearRuntimeError();
    return null;
  } catch (err) {
    if (lastGoodModule) {
      setGhostAI(
        lastGoodModule.chooseDirection,
        lastGoodModule.updateState,
        mode.requiresBuildInfos ? lastGoodModule.buildInfos : null
      );
      setGhostAIErrorHandler((err, context) => {
        game.handleRuntimeError(err, context);
      });
    }
    return formatError(err);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function formatRuntimeError(err, context) {
  const msg = err && err.message ? err.message : String(err);
  const fn = context || 'ton code';

  if (msg.includes('is not defined')) {
    return `Erreur à l'exécution (${fn}) : ${msg} — Vérifie les noms de variables (ex. infos, pas info). Clique Arrêter, corrige, puis Démarrer.`;
  }
  if (msg.includes('is not a function')) {
    return `Erreur à l'exécution (${fn}) : ${msg} — Tu as peut-être oublié une propriété ou utilisé () sur une valeur qui n'est pas une fonction. Clique Arrêter, corrige, puis Démarrer.`;
  }
  return `Erreur à l'exécution (${fn}) : ${msg} — Clique Arrêter, corrige ton code, puis Démarrer.`;
}

function formatError(err) {
  const msg = err && err.message ? err.message : String(err);
  if (msg.includes('SyntaxError') || msg.includes('Unexpected')) {
    return `Erreur de syntaxe : ${msg} — Vérifie les { }, parenthèses et virgules. Le dernier code valide est toujours utilisé : corrige puis reclique Démarrer.`;
  }
  if (msg.includes('buildInfos manquant')) {
    return `Export buildInfos manquant — la fonction buildInfos doit rester dans le fichier avec le mot-clé export.`;
  }
  if (msg.includes('chooseDirection manquant')) {
    return `Export chooseDirection manquant — la fonction chooseDirection doit rester dans le fichier avec le mot-clé export.`;
  }
  if (msg.includes('updateState manquant')) {
    return `Export updateState manquant — la fonction updateState doit rester dans le fichier avec le mot-clé export.`;
  }
  return `Erreur : ${msg} — Lis le message, corrige ton code, puis reclique Démarrer. Le jeu garde le dernier code valide.`;
}
