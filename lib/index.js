// BBG 7.3 Knowledge Base - Index
// Importe et exporte tous les modules de connaissance

import { knowledgeBBGE } from './knowledgeBBGE.js';
import { knowledgeBuildings } from './knowledgeBuildings.js';
import { knowledgeChangelog } from './knowledgeChangelog.js';
import { knowledgeCityStates } from './knowledgeCityStates.js';
import { knowledgeCivicTree } from './knowledgeCivicTree.js';
import { knowledgeDoctrines } from './knowledgeDoctrines.js';
import { knowledgeGovernors } from './knowledgeGovernors.js';
import { knowledgeGreatPeople } from './knowledgeGreatPeople.js';
import { knowledgeLeaders } from './knowledgeLeaders.js';
import { knowledgeMisc } from './knowledgeMisc.js';
import { knowledgeNames } from './knowledgeNames.js';
import { knowledgeNaturalWonders } from './knowledgeNaturalWonders.js';
import { knowledgeReligion } from './knowledgeReligion.js';
import { knowledgeTechTree } from './knowledgeTechTree.js';
import { knowledgeUnits } from './knowledgeUnits.js';
import { knowledgeWorldCongress } from './knowledgeWorldCongress.js';
import { knowledgeWorldWonders } from './knowledgeWorldWonders.js';

// Base de connaissance complète BBG 7.3
export const BBG_KNOWLEDGE = {
  bbge: knowledgeBBGE,
  buildings: knowledgeBuildings,
  changelog: knowledgeChangelog,
  cityStates: knowledgeCityStates,
  civicTree: knowledgeCivicTree,
  doctrines: knowledgeDoctrines,
  governors: knowledgeGovernors,
  greatPeople: knowledgeGreatPeople,
  leaders: knowledgeLeaders,
  misc: knowledgeMisc,
  names: knowledgeNames,
  naturalWonders: knowledgeNaturalWonders,
  religion: knowledgeReligion,
  techTree: knowledgeTechTree,
  units: knowledgeUnits,
  worldCongress: knowledgeWorldCongress,
  worldWonders: knowledgeWorldWonders,
};

// Helper : retourne toute la base sous forme de string pour un contexte LLM complet
export function getFullContext() {
  return Object.values(BBG_KNOWLEDGE).join('\n\n---\n\n');
}

// Helper : retourne un sous-ensemble de modules par thème
export function getContext(...keys) {
  return keys.map(k => BBG_KNOWLEDGE[k] || '').filter(Boolean).join('\n\n---\n\n');
}

export {
  knowledgeBBGE,
  knowledgeBuildings,
  knowledgeChangelog,
  knowledgeCityStates,
  knowledgeCivicTree,
  knowledgeDoctrines,
  knowledgeGovernors,
  knowledgeGreatPeople,
  knowledgeLeaders,
  knowledgeMisc,
  knowledgeNames,
  knowledgeNaturalWonders,
  knowledgeReligion,
  knowledgeTechTree,
  knowledgeUnits,
  knowledgeWorldCongress,
  knowledgeWorldWonders,
};
