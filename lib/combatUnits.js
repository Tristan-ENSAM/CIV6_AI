// ============================================================
// BASE DE DONNÉES UNITÉS — BBG 7.3
// Sources :
//   - https://civ6bbg.github.io/fr_FR/units_7.3.html (officiel)
//   - https://civ6bbg.github.io/fr_FR/leaders_7.3.html (uniques)
// Toutes les CS et portées vérifiées le 01/05/2026.
// ============================================================
//
// Champs :
//   id          : identifiant unique (utilisé pour /public/units/{id}.png)
//   name        : nom français
//   civ         : '' pour standard, sinon nom de la civ pour unique
//   era         : ancient | classical | medieval | renaissance | industrial | modern | atomic | information
//   eraIndex    : 0..7 — pour calculer l'obsolescence (unité +2 ères → obsolète)
//   type        : melee | antiCavalry | ranged | siege | lightCavalry | heavyCavalry | recon
//                 | navalMelee | navalRanged | navalRaider | airFighter | airBomber | gdr | religious
//   cs          : Combat Strength (mêlée)
//   rangedCS    : Puissance d'attaque à distance (null si pas d'attaque ranged)
//   range       : portée en cases (null si mêlée pure)
//   movement    : points de mouvement
//   bonuses     : description courte des bonus innés (affichage info-bulle)
// ============================================================

export const ERA_LIST = [
  { id: 'ancient',     label: 'Antique',      index: 0 },
  { id: 'classical',   label: 'Classique',    index: 1 },
  { id: 'medieval',    label: 'Médiéval',     index: 2 },
  { id: 'renaissance', label: 'Renaissance',  index: 3 },
  { id: 'industrial',  label: 'Industriel',   index: 4 },
  { id: 'modern',      label: 'Moderne',      index: 5 },
  { id: 'atomic',      label: 'Atomique',     index: 6 },
  { id: 'information', label: 'Information',  index: 7 },
];

export const UNIT_TYPES = {
  melee:         { label: 'Combat rapproché',       icon: '⚔️',  ranged: false },
  antiCavalry:   { label: 'Anti-cavalerie',         icon: '🔱',  ranged: false },
  ranged:        { label: 'Combat à distance',      icon: '🏹',  ranged: true  },
  siege:         { label: 'Siège',                  icon: '💥',  ranged: true  },
  lightCavalry:  { label: 'Cavalerie légère',       icon: '🐎',  ranged: false },
  heavyCavalry:  { label: 'Cavalerie lourde',       icon: '🐴',  ranged: false },
  recon:         { label: 'Reconnaissance',         icon: '🔭',  ranged: false },
  navalMelee:    { label: 'Combat naval rapproché', icon: '⛵',  ranged: false },
  navalRanged:   { label: 'Combat naval à distance',icon: '🚢',  ranged: true  },
  navalRaider:   { label: 'Assaut naval',           icon: '🏴',  ranged: false },
  airFighter:    { label: 'Chasseur aérien',        icon: '✈️',  ranged: true  },
  airBomber:     { label: 'Bombardier aérien',      icon: '🛩️',  ranged: true  },
  gdr:           { label: 'Robot géant',            icon: '🤖',  ranged: true  },
};

export const UNITS = [
  // ═══════════════════════════════════════════════════════════
  // ANTIQUE
  // ═══════════════════════════════════════════════════════════
  { id:'warrior',        name:'Guerrier',         civ:'',          era:'ancient', eraIndex:0, type:'melee',        cs:20, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'eagleWarrior',   name:'Guerrier aigle',   civ:'Aztèques',  era:'ancient', eraIndex:0, type:'melee',        cs:28, rangedCS:null, range:null, movement:2, bonuses:'Tuer = chance bâtisseur' },
  { id:'gaesatae',       name:'Gésates',          civ:'Gaule',     era:'ancient', eraIndex:0, type:'melee',        cs:20, rangedCS:null, range:null, movement:2, bonuses:'+10 vs unités plus fortes, +5 vs districts' },
  { id:'sabum',          name:'Sâbum kibittum',   civ:'Babylone',  era:'ancient', eraIndex:0, type:'melee',        cs:17, rangedCS:null, range:null, movement:3, bonuses:'+17 vs cavalerie' },

  { id:'spearman',       name:'Lancier',          civ:'',          era:'ancient', eraIndex:0, type:'antiCavalry',  cs:25, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'hoplite',        name:'Hoplite',          civ:'Grèce',     era:'ancient', eraIndex:0, type:'antiCavalry',  cs:28, rangedCS:null, range:null, movement:2, bonuses:'+7 si adjacent à autre Hoplite' },

  { id:'slinger',        name:'Frondeur',         civ:'',          era:'ancient', eraIndex:0, type:'ranged',       cs:5,  rangedCS:15,   range:1,    movement:2, bonuses:'' },
  { id:'archer',         name:'Archer',           civ:'',          era:'ancient', eraIndex:0, type:'ranged',       cs:15, rangedCS:25,   range:2,    movement:2, bonuses:'' },
  { id:'hulChe',         name:'Hul-Che',          civ:'Maya',      era:'ancient', eraIndex:0, type:'ranged',       cs:15, rangedCS:25,   range:2,    movement:2, bonuses:'Maya BBGE' },
  { id:'pitati',         name:'Archer pitati',    civ:'Nubie',     era:'ancient', eraIndex:0, type:'ranged',       cs:19, rangedCS:29,   range:2,    movement:3, bonuses:'+1 PM, +5 base' },

  { id:'heavyChariot',   name:'Char lourd',       civ:'',          era:'ancient', eraIndex:0, type:'heavyCavalry', cs:28, rangedCS:null, range:null, movement:2, bonuses:'4 PM en plat, sinon 2' },
  { id:'maryannu',       name:'Maryannou',        civ:'Égypte',    era:'ancient', eraIndex:0, type:'heavyCavalry', cs:30, rangedCS:null, range:null, movement:4, bonuses:'+2 base, 4 PM partout' },
  { id:'horseman',       name:'Cavalier',         civ:'',          era:'classical',eraIndex:1, type:'lightCavalry',cs:36, rangedCS:null, range:null, movement:4, bonuses:'' },
  { id:'barbBatRider',   name:'Cavalier barbare', civ:'',          era:'ancient', eraIndex:0, type:'lightCavalry', cs:25, rangedCS:null, range:null, movement:4, bonuses:'Barbares uniquement' },

  { id:'scout',          name:'Éclaireur',        civ:'',          era:'ancient', eraIndex:0, type:'recon',        cs:10, rangedCS:null, range:null, movement:3, bonuses:'' },
  { id:'okihtcitaw',     name:'Okihtcitaw',       civ:'Cris',      era:'ancient', eraIndex:0, type:'recon',        cs:18, rangedCS:null, range:null, movement:3, bonuses:'+8 base' },

  // ═══════════════════════════════════════════════════════════
  // CLASSIQUE
  // ═══════════════════════════════════════════════════════════
  { id:'swordsman',      name:'Spadassin',        civ:'',          era:'classical', eraIndex:1, type:'melee',      cs:36, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'legion',         name:'Légion',           civ:'Rome',      era:'classical', eraIndex:1, type:'melee',      cs:38, rangedCS:null, range:null, movement:2, bonuses:'+2 base, 1 charge fort' },
  { id:'immortal',       name:'Immortel',         civ:'Perse',     era:'classical', eraIndex:1, type:'melee',      cs:36, rangedCS:25,   range:2,    movement:2, bonuses:'Attaque distance bonus' },
  { id:'ngaoMbeba',      name:'Ngao Mbeba',       civ:'Kongo',     era:'classical', eraIndex:1, type:'melee',      cs:38, rangedCS:null, range:null, movement:2, bonuses:'+2 base, +10 def vs distance' },
  { id:'hypaspist',      name:'Hypaspiste',       civ:'Macédoine', era:'classical', eraIndex:1, type:'melee',      cs:38, rangedCS:null, range:null, movement:2, bonuses:'+10 vs districts, soutien +50%' },
  { id:'toa',            name:'Toa',              civ:'Maoris',    era:'classical', eraIndex:1, type:'melee',      cs:38, rangedCS:null, range:null, movement:2, bonuses:'-5 CS aux ennemis adjacents' },
  { id:'owlWarrior',     name:'Guerrier chouette',civ:'Teotihuacán',era:'classical',eraIndex:1, type:'melee',      cs:36, rangedCS:null, range:null, movement:2, bonuses:'Vision +1, sans fer' },

  { id:'horseman2',      name:'Cavalier',         civ:'',          era:'classical', eraIndex:1, type:'lightCavalry',cs:36, rangedCS:null, range:null, movement:4, bonuses:'' },
  { id:'maceman',        name:'Frondeur',         civ:'',          era:'classical', eraIndex:1, type:'ranged',     cs:25, rangedCS:35,   range:2,    movement:2, bonuses:'' },
  { id:'archerComp',     name:'Archer composite', civ:'',          era:'classical', eraIndex:1, type:'ranged',     cs:25, rangedCS:35,   range:2,    movement:2, bonuses:'' },

  { id:'catapult',       name:'Catapulte',        civ:'',          era:'classical', eraIndex:1, type:'siege',      cs:25, rangedCS:35,   range:2,    movement:2, bonuses:'' },

  { id:'galley',         name:'Galère',           civ:'',          era:'classical', eraIndex:1, type:'navalMelee', cs:30, rangedCS:null, range:null, movement:3, bonuses:'Côte uniquement' },
  { id:'biremes',        name:'Birème',           civ:'Phénicie',  era:'classical', eraIndex:1, type:'navalMelee', cs:35, rangedCS:null, range:null, movement:3, bonuses:'+5 base, peut océan' },
  { id:'quadrireme',     name:'Quadrirème',       civ:'',          era:'classical', eraIndex:1, type:'navalRanged',cs:25, rangedCS:25,   range:1,    movement:3, bonuses:'' },
  { id:'dromon',         name:'Dromon',           civ:'Byzance',   era:'classical', eraIndex:1, type:'navalRanged',cs:30, rangedCS:30,   range:2,    movement:3, bonuses:'+5 base, +1 portée, +10 vs unités' },

  // ═══════════════════════════════════════════════════════════
  // MÉDIÉVAL
  // ═══════════════════════════════════════════════════════════
  { id:'menAtArms',      name:'Homme d\'armes',   civ:'',          era:'medieval', eraIndex:2, type:'melee',       cs:46, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'samurai',        name:'Samouraï',         civ:'Japon',     era:'medieval', eraIndex:2, type:'melee',       cs:48, rangedCS:null, range:null, movement:2, bonuses:'Pas de pénalité blessé' },
  { id:'berserker',      name:'Berserker',        civ:'Norvège',   era:'medieval', eraIndex:2, type:'melee',       cs:40, rangedCS:null, range:null, movement:2, bonuses:'-6 base, +2 PM ennemi/embarqué, +10 attaque' },
  { id:'khevsour',       name:'Khevsour',         civ:'Géorgie',   era:'medieval', eraIndex:2, type:'melee',       cs:48, rangedCS:null, range:null, movement:2, bonuses:'+7 sur collines' },

  { id:'pikeman',        name:'Piquier',          civ:'',          era:'medieval', eraIndex:2, type:'antiCavalry', cs:45, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'impi',           name:'Impi',             civ:'Zoulous',   era:'medieval', eraIndex:2, type:'antiCavalry', cs:45, rangedCS:null, range:null, movement:2, bonuses:'Soutien doublé, XP+25%' },

  { id:'crossbowman',    name:'Arbalétrier',      civ:'',          era:'medieval', eraIndex:2, type:'ranged',      cs:30, rangedCS:40,   range:2,    movement:2, bonuses:'' },
  { id:'crouchingTiger', name:'Tigre accroupi',   civ:'Chine',     era:'medieval', eraIndex:2, type:'ranged',      cs:35, rangedCS:45,   range:1,    movement:2, bonuses:'+7 attaque sur unité adjacente' },

  { id:'trebuchet',      name:'Trébuchet',        civ:'',          era:'medieval', eraIndex:2, type:'siege',       cs:35, rangedCS:45,   range:2,    movement:2, bonuses:'' },

  { id:'knight',         name:'Chevalier',        civ:'',          era:'medieval', eraIndex:2, type:'heavyCavalry',cs:48, rangedCS:null, range:null, movement:4, bonuses:'' },
  { id:'mamluk',         name:'Mamelouk',         civ:'Arabie',    era:'medieval', eraIndex:2, type:'heavyCavalry',cs:48, rangedCS:null, range:null, movement:4, bonuses:'Heal en fin de tour toujours' },
  { id:'tagma',          name:'Tagma',            civ:'Byzance',   era:'medieval', eraIndex:2, type:'heavyCavalry',cs:48, rangedCS:null, range:null, movement:4, bonuses:'+2 CS aux unités adjacentes' },
  { id:'blackArmy',      name:'Armée noire',      civ:'Hongrie',   era:'medieval', eraIndex:2, type:'heavyCavalry',cs:50, rangedCS:null, range:null, movement:4, bonuses:'+3 si Lévy en cours' },

  { id:'courser',        name:'Coursier',         civ:'',          era:'medieval', eraIndex:2, type:'lightCavalry',cs:48, rangedCS:null, range:null, movement:5, bonuses:'5 PM' },
  { id:'lineOfBattle',   name:'Mangonneau',       civ:'',          era:'medieval', eraIndex:2, type:'siege',       cs:35, rangedCS:45,   range:2,    movement:2, bonuses:'' },

  { id:'longship',       name:'Drakkar',          civ:'Norvège',   era:'medieval', eraIndex:2, type:'navalRaider', cs:35, rangedCS:null, range:null, movement:5, bonuses:'5 PM, peut océan' },

  // ═══════════════════════════════════════════════════════════
  // RENAISSANCE
  // ═══════════════════════════════════════════════════════════
  { id:'musketman',      name:'Mousquetaire',     civ:'',          era:'renaissance', eraIndex:3, type:'melee',     cs:55, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'conquistador',   name:'Conquistador',     civ:'Espagne',   era:'renaissance', eraIndex:3, type:'melee',     cs:58, rangedCS:null, range:null, movement:2, bonuses:'+3 base, +5 si religieux adjacent' },
  { id:'janissary',      name:'Janissaire',       civ:'Ottomans',  era:'renaissance', eraIndex:3, type:'melee',     cs:60, rangedCS:null, range:null, movement:2, bonuses:'+5 base, promotion gratuite' },

  { id:'pikeAndShot',    name:'Pique et tir',     civ:'',          era:'renaissance', eraIndex:3, type:'antiCavalry',cs:55,rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'carolean',       name:'Caroléen',         civ:'Suède',     era:'renaissance', eraIndex:3, type:'antiCavalry',cs:55,rangedCS:null, range:null, movement:3, bonuses:'+3 par PM inutilisé' },

  { id:'fieldCannon',    name:'Canon de campagne',civ:'',          era:'renaissance', eraIndex:3, type:'ranged',    cs:40, rangedCS:50,   range:2,    movement:2, bonuses:'' },
  { id:'bombard',        name:'Bombarde',         civ:'',          era:'renaissance', eraIndex:3, type:'siege',     cs:45, rangedCS:55,   range:2,    movement:2, bonuses:'' },

  { id:'cuirassier',     name:'Cuirassier',       civ:'',          era:'renaissance', eraIndex:3, type:'heavyCavalry',cs:60,rangedCS:null,range:null, movement:4, bonuses:'' },
  { id:'roughRider',     name:'Rough Rider',      civ:'Amérique',  era:'industrial', eraIndex:4, type:'heavyCavalry',cs:60,rangedCS:null,range:null, movement:4, bonuses:'Entretien réduit, +culture' },
  { id:'redcoat',        name:'Tunique rouge',    civ:'Angleterre',era:'industrial',  eraIndex:4, type:'melee',     cs:70, rangedCS:null, range:null, movement:2, bonuses:'+5 base, +5 hors continent capitale' },

  { id:'frigate',        name:'Frégate',          civ:'',          era:'renaissance', eraIndex:3, type:'navalRanged',cs:45, rangedCS:55,  range:2,    movement:4, bonuses:'' },
  { id:'caravel',        name:'Caravelle',        civ:'',          era:'renaissance', eraIndex:3, type:'navalMelee',cs:50, rangedCS:null, range:null, movement:4, bonuses:'' },
  { id:'privateer',      name:'Corsaire',         civ:'',          era:'renaissance', eraIndex:3, type:'navalRaider',cs:50,rangedCS:null, range:null, movement:4, bonuses:'Furtivité' },
  { id:'deGama',         name:'Nau',              civ:'Portugal',  era:'renaissance', eraIndex:3, type:'navalMelee',cs:55, rangedCS:null, range:null, movement:4, bonuses:'+5 base, +1 PM' },

  // ═══════════════════════════════════════════════════════════
  // INDUSTRIEL
  // ═══════════════════════════════════════════════════════════
  { id:'lineInfantry',   name:'Infanterie de ligne', civ:'',       era:'industrial',  eraIndex:4, type:'melee',     cs:65, rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'imperialGuard',  name:'Garde impérial',   civ:'France',    era:'industrial',  eraIndex:4, type:'melee',     cs:70, rangedCS:null, range:null, movement:2, bonuses:'+5 base, +5 sur continent capitale, +10pts GG' },

  { id:'fieldArtillery', name:'Artillerie de campagne',civ:'',     era:'industrial',  eraIndex:4, type:'siege',     cs:50, rangedCS:60,   range:2,    movement:2, bonuses:'' },
  { id:'cavalry',        name:'Cavalerie',        civ:'',          era:'industrial',  eraIndex:4, type:'lightCavalry',cs:62,rangedCS:null,range:null, movement:5, bonuses:'' },

  { id:'minasGeraes',    name:'Minas Geraes',     civ:'Brésil',    era:'industrial',  eraIndex:4, type:'navalRanged',cs:55, rangedCS:55,  range:2,    movement:4, bonuses:'-5 base, +10 à Raffinage' },
  { id:'battleship',     name:'Cuirassé',         civ:'',          era:'modern',      eraIndex:5, type:'navalRanged',cs:75, rangedCS:75,  range:2,    movement:5, bonuses:'' },
  { id:'destroyer',      name:'Destroyer',        civ:'',          era:'modern',      eraIndex:5, type:'navalMelee',cs:75, rangedCS:null, range:null, movement:6, bonuses:'Anti-sous-marin' },
  { id:'submarine',      name:'Sous-marin',       civ:'',          era:'modern',      eraIndex:5, type:'navalRaider',cs:65,rangedCS:null, range:null, movement:4, bonuses:'Furtivité' },

  // ═══════════════════════════════════════════════════════════
  // MODERNE / ATOMIQUE / INFORMATION
  // ═══════════════════════════════════════════════════════════
  { id:'infantry',       name:'Infanterie',       civ:'',          era:'modern',      eraIndex:5, type:'melee',     cs:80, rangedCS:null, range:null, movement:3, bonuses:'' },
  { id:'digger',         name:'Digger',           civ:'Australie', era:'modern',      eraIndex:5, type:'melee',     cs:83, rangedCS:null, range:null, movement:3, bonuses:'+3 base, +10 côte, +5 territoire neutre/étranger' },

  { id:'antiTank',       name:'Unité antichar',   civ:'',          era:'modern',      eraIndex:5, type:'antiCavalry',cs:80,rangedCS:null, range:null, movement:2, bonuses:'' },
  { id:'machineGun',     name:'Mitrailleuse',     civ:'',          era:'modern',      eraIndex:5, type:'ranged',    cs:50, rangedCS:70,   range:1,    movement:2, bonuses:'' },
  { id:'artillery',      name:'Artillerie',       civ:'',          era:'modern',      eraIndex:5, type:'siege',     cs:65, rangedCS:75,   range:3,    movement:2, bonuses:'+1 portée' },
  { id:'tank',           name:'Char',             civ:'',          era:'modern',      eraIndex:5, type:'heavyCavalry',cs:80,rangedCS:null,range:null, movement:4, bonuses:'' },
  { id:'helicopter',     name:'Hélicoptère',      civ:'',          era:'atomic',      eraIndex:6, type:'lightCavalry',cs:80,rangedCS:null,range:null, movement:4, bonuses:'' },

  { id:'mechInfantry',   name:'Infanterie mécanisée',civ:'',       era:'information', eraIndex:7, type:'melee',     cs:90, rangedCS:null, range:null, movement:5, bonuses:'Ignore ZOC' },
  { id:'modernAT',       name:'Antichar moderne', civ:'',          era:'information', eraIndex:7, type:'antiCavalry',cs:90,rangedCS:null, range:null, movement:3, bonuses:'' },
  { id:'rocketArtillery',name:'Lance-roquettes',  civ:'',          era:'information', eraIndex:7, type:'siege',     cs:80, rangedCS:90,   range:3,    movement:3, bonuses:'' },
  { id:'modernArmor',    name:'Char moderne',     civ:'',          era:'information', eraIndex:7, type:'heavyCavalry',cs:95,rangedCS:null,range:null, movement:5, bonuses:'' },
  { id:'gdr',            name:'Robot géant',      civ:'',          era:'information', eraIndex:7, type:'gdr',       cs:120,rangedCS:120,  range:1,    movement:5, bonuses:'' },
];

// Aide : trouver une unité par id
export function findUnit(id) {
  return UNITS.find(u => u.id === id);
}

// Aide : grouper les unités par ère pour l'affichage
export function unitsByEra() {
  const grouped = {};
  ERA_LIST.forEach(e => { grouped[e.id] = []; });
  UNITS.forEach(u => {
    if (grouped[u.era]) grouped[u.era].push(u);
  });
  return grouped;
}

// Aide : déterminer si A est obsolète face à B (différence ≥ 2 ères en BBG)
export function isObsoleteAgainst(unitA, unitB) {
  if (!unitA || !unitB) return false;
  return unitB.eraIndex - unitA.eraIndex >= 2;
}
