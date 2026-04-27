// ============================================================
// ARBRE DES DOGMES (Civics) — données BBG 7.3
// Même format que techTreeData.js — ajouter/modifier librement.
// eurekaDiscount = 0.4 (40% si inspiration cochée)
// ============================================================

export const CIVIC_TREE = {
  id: 'civic',
  label: 'Dogmes',

  eras: [
    { id: 'ancient',     label: 'Antique',      x: 80   },
    { id: 'classical',   label: 'Classique',    x: 700  },
    { id: 'medieval',    label: 'Médiéval',     x: 1160 },
    { id: 'renaissance', label: 'Renaissance',  x: 1560 },
    { id: 'industrial',  label: 'Industriel',   x: 1900 },
    { id: 'modern',      label: 'Moderne',      x: 2200 },
    { id: 'atomic',      label: 'Atomique',     x: 2500 },
    { id: 'information', label: 'Information',  x: 2780 },
  ],

  techs: [
    // ── ANTIQUE ──────────────────────────────────────────────
    { id:'codeOfLaws',       name:'Code des lois',       icon:'⚖️', cost:20,   era:'ancient',     deps:[],                               x:80,   y:200, unlocks:'Slots politiques (1M+1E)',  eureka:'Démarrage automatique',          eurekaDiscount:.4 },
    { id:'craftsmanship',    name:'Artisanat',            icon:'🛠️', cost:40,   era:'ancient',     deps:['codeOfLaws'],                   x:300,  y:100, unlocks:'Ferme, Bûcheron',           eureka:'Améliorer 3 tuiles',             eurekaDiscount:.4 },
    { id:'foreignTrade',     name:'Commerce étranger',   icon:'🤝', cost:40,   era:'ancient',     deps:['codeOfLaws'],                   x:300,  y:300, unlocks:'Route commerciale interne', eureka:'Découvrir naturelle ou civ',     eurekaDiscount:.4 },
    { id:'militaryTradition',name:'Tradition militaire', icon:'⚔️', cost:50,   era:'ancient',     deps:['craftsmanship'],                x:520,  y:60,  unlocks:'Politique militaire',       eureka:'Blesser unité barbare',          eurekaDiscount:.4 },
    { id:'stateWorkforce',   name:'Main-d\'œuvre d\'État',icon:'👷',cost:70,   era:'ancient',     deps:['craftsmanship'],                x:520,  y:180, unlocks:'Aqueduc, Monuments',        eureka:'Posséder district spécialisé',   eurekaDiscount:.4 },
    { id:'earlyEmpire',      name:'Empire naissant',     icon:'👑', cost:70,   era:'ancient',     deps:['foreignTrade'],                 x:520,  y:340, unlocks:'Expansionnisme',            eureka:'Atteindre 6 pop au total',       eurekaDiscount:.4 },

    // ── CLASSIQUE ─────────────────────────────────────────────
    { id:'gamesRecreation',  name:'Jeux et loisirs',     icon:'🏟️', cost:110,  era:'classical',   deps:['stateWorkforce'],               x:740,  y:100, unlocks:'Complex divertissement',   eureka:'Construire arènes',              eurekaDiscount:.4 },
    { id:'politicalPhilosophy',name:'Phil. politique',   icon:'🏛️', cost:110,  era:'classical',   deps:['stateWorkforce','earlyEmpire'], x:740,  y:260, unlocks:'Gouvernement Tier 1',       eureka:'Rencontrer 3 civ ou CS',        eurekaDiscount:.4 },
    { id:'dramaPoetry',      name:'Drame et poésie',     icon:'🎭', cost:110,  era:'classical',   deps:['earlyEmpire'],                  x:740,  y:400, unlocks:'Quartier théâtral',         eureka:'Construire monument',            eurekaDiscount:.4 },
    { id:'mysticism',        name:'Mysticisme',          icon:'🔮', cost:110,  era:'classical',   deps:['foreignTrade'],                 x:740,  y:500, unlocks:'Sites religieux',           eureka:'Fonder religion',                eurekaDiscount:.4 },

    // ── CLASSIQUE (suite) ─────────────────────────────────────
    { id:'militaryTraining', name:'Entraînement militaire',icon:'🪖',cost:200, era:'classical',   deps:['gamesRecreation','militaryTradition'], x:960, y:60,  unlocks:'Caserne, Stable',      eureka:'Posséder 2 unités mêlée',       eurekaDiscount:.4 },
    { id:'defensiveTactics', name:'Tactiques défensives', icon:'🛡️',cost:200,  era:'classical',   deps:['gamesRecreation','politicalPhilosophy'],x:960,y:200, unlocks:'Gouverneur Victor',    eureka:'Posséder remparts',              eurekaDiscount:.4 },
    { id:'recordedHistory',  name:'Histoire consignée',  icon:'📜', cost:200,  era:'classical',   deps:['politicalPhilosophy','dramaPoetry'],x:960,y:360, unlocks:'Campus, Université',      eureka:'Posséder 2 campus/quartier th.', eurekaDiscount:.4 },
    { id:'theology',         name:'Théologie',            icon:'✝️', cost:200,  era:'classical',   deps:['dramaPoetry','mysticism'],      x:960,  y:500, unlocks:'Sites saints tier 2',      eureka:'Bâtir temple',                   eurekaDiscount:.4 },

    // ── MÉDIÉVAL ──────────────────────────────────────────────
    { id:'feudalism',        name:'Féodalisme',           icon:'🏰', cost:385,  era:'medieval',    deps:['defensiveTactics'],             x:1180, y:140, unlocks:'Archer monté',             eureka:'Posséder 4 fermes',              eurekaDiscount:.4 },
    { id:'civilService',     name:'Fonction publique',   icon:'📋', cost:385,  era:'medieval',    deps:['defensiveTactics','recordedHistory'],x:1180,y:280, unlocks:'Irrigation avancée',  eureka:'Posséder spécialiste de district',eurekaDiscount:.4 },
    { id:'guilds',           name:'Guildes',              icon:'⚒️', cost:385,  era:'medieval',    deps:['recordedHistory'],              x:1180, y:400, unlocks:'Workshop (Commerce)',       eureka:'Posséder 2 routes commerciales', eurekaDiscount:.4 },
    { id:'divineRight',      name:'Droit divin',          icon:'👼', cost:385,  era:'medieval',    deps:['theology'],                     x:1180, y:520, unlocks:'Cathédrale, Monastère',    eureka:'Fonder ou convertir à religion', eurekaDiscount:.4 },

    // ── RENAISSANCE ───────────────────────────────────────────
    { id:'exploration',      name:'Exploration',          icon:'🗺️', cost:490,  era:'renaissance', deps:['feudalism','civilService'],     x:1400, y:140, unlocks:'Amiral, Piraterie',         eureka:'Posséder 2 navires',             eurekaDiscount:.4 },
    { id:'humanism',         name:'Humanisme',            icon:'🎨', cost:540,  era:'renaissance', deps:['guilds'],                       x:1400, y:360, unlocks:'Université, Artiste',       eureka:'Posséder Grand peintre',         eurekaDiscount:.4 },
    { id:'reformedChurch',   name:'Église réformée',      icon:'✟',  cost:400,  era:'renaissance', deps:['guilds','divineRight'],         x:1400, y:500, unlocks:'Reliques +foi',             eureka:'Posséder 3 Prophètes',           eurekaDiscount:.4 },
    { id:'mercantilism',     name:'Mercantilisme',        icon:'💼', cost:650,  era:'renaissance', deps:['humanism'],                     x:1620, y:280, unlocks:'Marchands internes +1',     eureka:'Atteindre T. de la Renaissance', eurekaDiscount:.4 },
    { id:'diplomaticLeague', name:'Ligue diplomatique',  icon:'🕊️', cost:540,  era:'renaissance', deps:['exploration'],                  x:1620, y:100, unlocks:'Bonus CS alliance',         eureka:'Être suzerain de 3 CS',          eurekaDiscount:.4 },

    // ── INDUSTRIEL ────────────────────────────────────────────
    { id:'colonialism',      name:'Colonialisme',         icon:'🌍', cost:725,  era:'industrial',  deps:['mercantilism'],                 x:1840, y:200, unlocks:'Ressources stratégiques +2',eureka:'Posséder 3 ressources stratégiques',eurekaDiscount:.4 },
    { id:'naturalHistory',   name:'Histoire naturelle',  icon:'🦕', cost:870,  era:'industrial',  deps:['colonialism'],                  x:2040, y:140, unlocks:'Musée naturel, Parc',      eureka:'Posséder archéologue',           eurekaDiscount:.4 },
    { id:'urbanization',     name:'Urbanisation',        icon:'🏙️', cost:870,  era:'industrial',  deps:['civilService','mercantilism'], x:1840, y:380, unlocks:'Logement +, Quartier',     eureka:'Posséder 6 districts spécialisés',eurekaDiscount:.4 },
    { id:'nationalism',      name:'Nationalisme',         icon:'🚩', cost:870,  era:'industrial',  deps:['diplomaticLeague','colonialism'],x:1840,y:100, unlocks:'Armée de conscrits',       eureka:'Posséder Grand général',         eurekaDiscount:.4 },
    { id:'scorched',         name:'Guerre totale',        icon:'🔥', cost:870,  era:'industrial',  deps:['nationalism'],                  x:2040, y:60,  unlocks:'Corps/armée bonus',        eureka:'Posséder artillerie',            eurekaDiscount:.4 },

    // ── MODERNE ───────────────────────────────────────────────
    { id:'conservation',     name:'Conservation',         icon:'🌿', cost:1060, era:'modern',      deps:['naturalHistory'],               x:2260, y:140, unlocks:'Zones naturelles bonifiées',eureka:'Posséder 2 parcs nationaux',    eurekaDiscount:.4 },
    { id:'repulic',          name:'République',           icon:'🗽', cost:1060, era:'modern',      deps:['urbanization'],                 x:2260, y:300, unlocks:'Gouvernement Tier 3',       eureka:'Atteindre T. Industriel',        eurekaDiscount:.4 },
    { id:'ideology',         name:'Idéologie',            icon:'📢', cost:1060, era:'modern',      deps:['repulic','scorched'],           x:2260, y:180, unlocks:'Classement monde choix',   eureka:'Posséder 3 usines',             eurekaDiscount:.4 },
    { id:'propa',            name:'Propagande',           icon:'📣', cost:1060, era:'modern',      deps:['ideology'],                    x:2480, y:120, unlocks:'Loyauté +',                eureka:'Posséder 3 quartiers théâtraux', eurekaDiscount:.4 },
    { id:'multiNat',         name:'Multinationales',      icon:'🏢', cost:1060, era:'modern',      deps:['conservation','repulic'],       x:2480, y:300, unlocks:'Hub +2 or, Marché +2 or',  eureka:'Posséder bourse dans 3 villes', eurekaDiscount:.4 },

    // ── ATOMIQUE ──────────────────────────────────────────────
    { id:'postWar',          name:'Reconstruction',       icon:'🕊️', cost:1700, era:'atomic',      deps:['propa','ideology'],             x:2700, y:140, unlocks:'Zones diplomatiques',      eureka:'Posséder Palais du peuple',      eurekaDiscount:.4 },
    { id:'socialMedia',      name:'Réseaux sociaux',      icon:'📱', cost:1700, era:'atomic',      deps:['multiNat'],                     x:2700, y:320, unlocks:'Bonus loyauté numérique',   eureka:'Posséder réseau TV',             eurekaDiscount:.4 },

    // ── INFORMATION ───────────────────────────────────────────
    { id:'futureGovernance', name:'Gouvernance future',   icon:'🌐', cost:3000, era:'information', deps:['postWar','socialMedia'],        x:2920, y:240, unlocks:'Slots politiques +2',       eureka:'Posséder vaisseau partiel',      eurekaDiscount:.4 },
  ],
};
