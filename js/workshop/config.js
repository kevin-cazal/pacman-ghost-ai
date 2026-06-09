// NE PAS MODIFIER — configuration de l'atelier

export const WORKSHOP_MODE = {
  id: 'build',
  label: 'Infos à coder',
  templateUrl: 'js/workshop/ghost_ai_build.js',
  storageKey: 'mini_pacman_ghost_ai_build',
  stepsPath: './workshop/steps_from_md.js',
  requiresBuildInfos: true,
};

export function getWorkshopMode() {
  return WORKSHOP_MODE;
}
