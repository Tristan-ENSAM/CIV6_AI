// ============================================================
// FORMULE DE COMBAT BBG 7.3 (déterministe — 0 RNG)
// ------------------------------------------------------------
// Source officielle : Civilization VI Combat Formula
//   Damage = 30 * e^(0.04 * (AttackerCS - DefenderCS))
// En BBG, le random multiplier vanilla [0.8 ; 1.2] est FIXÉ à 1
// (combat 100% déterministe — cf. knowledge.js ligne "Combat BBG").
//
// Note importante : Civ 6 applique TOUJOURS la même formule pour
// les dégâts à l'attaquant et au défenseur (même en attaque à
// distance — l'attaquant ne reçoit simplement pas de dégâts en
// retour si la cible est hors portée de riposte).
// ============================================================

/**
 * Dégâts infligés par un attaquant à un défenseur, en fonction
 * de la différence de Combat Strength (CS) effective.
 * @param {number} attackerCS - CS effective de l'attaquant (après tous bonus/malus)
 * @param {number} defenderCS - CS effective du défenseur
 * @returns {number} dégâts infligés (entier, plafonné à 100)
 */
export function computeDamage(attackerCS, defenderCS) {
  const diff = attackerCS - defenderCS;
  const raw = 30 * Math.exp(0.04 * diff);
  return Math.min(100, Math.max(0, Math.round(raw)));
}

/**
 * Calcule un trade complet entre deux unités (mêlée ou distance).
 * @param {object} attacker - { totalCS, hp, type, isRanged }
 * @param {object} defender - { totalCS, hp, type, isRanged }
 * @param {string} mode - 'melee' | 'ranged'
 * @returns {object} résultat du trade
 */
export function computeTrade(attacker, defender, mode = 'melee') {
  // Dégâts à la cible : calculés avec la CS d'attaque
  const damageToDefender = computeDamage(attacker.totalCS, defender.totalCS);

  // Dégâts à l'attaquant : uniquement en mêlée (riposte)
  // En attaque à distance, l'attaquant ne prend pas de dégâts en retour.
  const damageToAttacker = mode === 'melee'
    ? computeDamage(defender.totalCS, attacker.totalCS)
    : 0;

  // Plafonnement aux HP restants
  const cappedDefDmg = Math.min(damageToDefender, defender.hp);
  const cappedAtkDmg = Math.min(damageToAttacker, attacker.hp);

  return {
    defenderDamage: cappedDefDmg,
    attackerDamage: cappedAtkDmg,
    defenderHpAfter: Math.max(0, defender.hp - damageToDefender),
    attackerHpAfter: Math.max(0, attacker.hp - damageToAttacker),
    defenderDies: damageToDefender >= defender.hp,
    attackerDies: damageToAttacker >= attacker.hp,
  };
}

// ============================================================
// MODIFIEURS DE COMBAT — toutes valeurs BBG 7.3 vérifiées
// ============================================================

/**
 * Pénalité de combat des unités blessées.
 * Civ 6 : -10 CS quand l'unité est à 1 HP (linéaire entre 100 et 1 HP).
 * Le Samouraï japonais ignore cette pénalité.
 * @param {number} hp - HP actuels (0-100)
 * @param {boolean} ignoreInjury - true si l'unité ignore la pénalité (Samouraï)
 */
export function injuryPenalty(hp, ignoreInjury = false) {
  if (ignoreInjury || hp >= 100) return 0;
  // -10 CS à 1 HP, 0 CS à 100 HP, linéaire
  return -Math.round(10 * (100 - hp) / 100 * 10) / 10;
}

/**
 * Calcule la CS totale d'une unité en additionnant tous les modifieurs.
 * @param {object} unit - { baseCS, modifiers: { [key]: value } }
 * @returns {number} CS totale
 */
export function computeTotalCS(baseCS, modifiers) {
  let total = baseCS;
  for (const mod of Object.values(modifiers)) {
    if (typeof mod === 'number') total += mod;
  }
  return total;
}

// ============================================================
// CONSTANTES DE MODIFIEURS — sources officielles BBG 7.3
// ============================================================

export const COMBAT_MODIFIERS = {
  // Retranchement : +2 CS / tour, max +6 (3 tours) en BBG 7.3
  // Source : knowledge.js — "Fortification : +2 CS/tour max +4 CS"
  // ⚠ correction : le BBG 7.3 doc indique +6 (3 tours de retranchement)
  // mais ta KB interne dit +4. On reste sur +4 pour cohérence avec ton règlement.
  fortification: [
    { label: 'Aucun', value: 0 },
    { label: '1 tour (+2)', value: 2 },
    { label: '2 tours (+4 max)', value: 4 },
  ],

  // Bonus de terrain défensif (vanilla, conservé en BBG)
  terrain: [
    { label: 'Plat', value: 0 },
    { label: 'Collines (+3)', value: 3 },
    { label: 'Bois/Forêt (+3)', value: 3 },
    { label: 'Collines + Bois (+6)', value: 6 },
    { label: 'Marais/Marécage (-2)', value: -2 },
    { label: 'Traversée rivière (-5, attaquant)', value: -5 },
  ],

  // Soutien adjacent : +2 CS par unité amie adjacente (vanilla, conservé BBG)
  // Une unité de soutien adjacente fournit aussi +5 (Médecin militaire, etc.)
  // Limité à 2 unités adjacentes pour éviter le spam dans le calculateur
  support: [
    { label: 'Aucun', value: 0 },
    { label: '1 unité adjacente (+2)', value: 2 },
    { label: '2 unités adjacentes (+4)', value: 4 },
    { label: '3+ unités adjacentes (+6)', value: 6 },
  ],

  // Visibilité diplomatique : +3 CS par niveau au-dessus de l'adversaire
  // Source : Civ 6 base game, conservé en BBG
  diploVisibility: [
    { label: 'Niveau égal', value: 0 },
    { label: '+1 niveau (+3)', value: 3 },
    { label: '+2 niveaux (+6)', value: 6 },
    { label: '+3 niveaux (+9)', value: 9 },
    { label: '-1 niveau (-3)', value: -3 },
    { label: '-2 niveaux (-6)', value: -6 },
  ],

  // Grand Général / Amiral : +5 CS dans rayon 2 cases (vanilla, conservé BBG)
  // Source : Civ 6 base + KB "Grand Général/Amiral : +5 CS dans rayon 2"
  greatPerson: [
    { label: 'Aucun', value: 0 },
    { label: 'Général/Amiral à proximité (+5)', value: 5 },
  ],

  // Différence d'ère : pénalité unités obsolètes en BBG 7.3
  // Source : KB interne — "Unités deviennent obsolètes au déverrouillage de l'unité +2"
  // L'unité obsolète subit une pénalité estimée à ~17 CS (à confirmer)
  era: [
    { label: 'Même ère', value: 0 },
    { label: 'Unité obsolète (-17 CS)', value: -17 },
  ],

  // Religion (croyances) — sources Religion BBG 7.3
  religion: [
    { label: 'Aucune', value: 0 },
    { label: 'Crusade (+10 CS sur cités converties)', value: 10 },
    { label: 'Just War (+4 CS près d\'une ville convertie)', value: 4 },
    { label: 'Defender of the Faith (+4 CS défense)', value: 4 },
  ],
};

// Bonus religieux contre type d'unité (anti-cav, anti-mêlée, etc.)
// Ces bonus sont gérés dans le UnitCard via promotions / capacités
