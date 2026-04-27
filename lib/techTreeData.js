// ============================================================
// ARBRE DES TECHNOLOGIES — données BBG 7.3
// Pour ajouter une tech : copier un objet et ajuster les champs.
// deps[] = liste des ids requis avant de débloquer cette tech.
// x/y = position en pixels sur le canvas (ajuster pour le layout).
// eurekaDiscount = 0.4 (40% de réduction de coût si eureka coché)
// ============================================================

export const TECH_TREE = {
  id: 'tech',
  label: 'Technologies',

  eras: [
    { id: 'ancient',     label: 'Antique',      x: 80   },
    { id: 'classical',   label: 'Classique',    x: 740  },
    { id: 'medieval',    label: 'Médiéval',     x: 1180 },
    { id: 'renaissance', label: 'Renaissance',  x: 1400 },
    { id: 'industrial',  label: 'Industriel',   x: 1620 },
    { id: 'modern',      label: 'Moderne',      x: 1840 },
    { id: 'atomic',      label: 'Atomique',     x: 2280 },
    { id: 'information', label: 'Information',  x: 2500 },
  ],

  techs: [
    // ── ANTIQUE ──────────────────────────────────────────────
    { id:'pottery',          name:'Poterie',              icon:'🏺', cost:25,   era:'ancient',     deps:[],                              x:120,  y:120, unlocks:'Grenier, Shrine',          eureka:'Démarrer avec un village',        eurekaDiscount:.4 },
    { id:'animalHusbandry',  name:'Élevage',              icon:'🐄', cost:25,   era:'ancient',     deps:[],                              x:120,  y:280, unlocks:'Ferme, Cavalerie légère',   eureka:'Démarrer avec animal',            eurekaDiscount:.4 },
    { id:'mining',           name:'Exploitation minière', icon:'⛏️', cost:25,   era:'ancient',     deps:[],                              x:120,  y:440, unlocks:'Mine, Carrière',            eureka:'Démarrer avec collines',          eurekaDiscount:.4 },
    { id:'sailing',          name:'Navigation à voile',   icon:'⛵', cost:50,   era:'ancient',     deps:['pottery'],                     x:340,  y:60,  unlocks:'Voilier',                   eureka:'Fonder ville côtière',            eurekaDiscount:.4 },
    { id:'astrology',        name:'Astrologie',           icon:'🌟', cost:50,   era:'ancient',     deps:['pottery'],                     x:340,  y:160, unlocks:'Merveille naturelle',        eureka:'Découvrir merveille',             eurekaDiscount:.4 },
    { id:'irrigation',       name:'Irrigation',           icon:'💧', cost:50,   era:'ancient',     deps:['pottery'],                     x:340,  y:260, unlocks:'Ferme sur ressource',        eureka:'Créer ferme sur ressource',       eurekaDiscount:.4 },
    { id:'writing',          name:'Écriture',             icon:'📜', cost:50,   era:'ancient',     deps:['pottery'],                     x:340,  y:340, unlocks:'Campus, Bibliothèque',      eureka:'Rencontrer civ',                 eurekaDiscount:.4 },
    { id:'archery',          name:"Tir à l'arc",          icon:'🏹', cost:50,   era:'ancient',     deps:['animalHusbandry'],             x:340,  y:430, unlocks:'Archer',                    eureka:'Tuer unité Frondeur',             eurekaDiscount:.4 },
    { id:'bronzeWorking',    name:'Travail du bronze',    icon:'🗡️', cost:80,   era:'ancient',     deps:['mining'],                      x:560,  y:480, unlocks:'Épéiste, Hoplites',         eureka:'Tuer 3 barbares',                eurekaDiscount:.4 },
    { id:'masonry',          name:'Maçonnerie',           icon:'🧱', cost:80,   era:'ancient',     deps:['mining'],                      x:560,  y:380, unlocks:'Remparts anciens',          eureka:'Posséder carrière',               eurekaDiscount:.4 },
    { id:'wheel',            name:'Roue',                 icon:'⚙️', cost:80,   era:'ancient',     deps:['mining'],                      x:560,  y:560, unlocks:'Mine sur ressource',        eureka:'Posséder mine sur ressource',    eurekaDiscount:.4 },

    // ── CLASSIQUE ─────────────────────────────────────────────
    { id:'celestialNavigation', name:'Nav. astronomique', icon:'🧭', cost:120,  era:'classical',   deps:['sailing','astrology'],         x:780,  y:80,  unlocks:'Lighthouse, Galère',        eureka:'Posséder 2 ressources maritimes',eurekaDiscount:.4 },
    { id:'currency',         name:'Monnaie',              icon:'💰', cost:120,  era:'classical',   deps:['writing'],                     x:780,  y:280, unlocks:'Hub commercial, Marché',    eureka:'Établir route commerciale',      eurekaDiscount:.4 },
    { id:'horsebackRiding',  name:'Équitation',           icon:'🐴', cost:120,  era:'classical',   deps:['animalHusbandry','archery'],   x:780,  y:420, unlocks:'Écurie, Cavalier',          eureka:'Posséder pâturage',              eurekaDiscount:.4 },
    { id:'ironWorking',      name:'Travail du fer',       icon:'⚔️', cost:120,  era:'classical',   deps:['bronzeWorking'],               x:780,  y:520, unlocks:'Légionnaire, Armurier',     eureka:'Aménager mine de fer',           eurekaDiscount:.4 },
    { id:'shipBuilding',     name:'Construction navale',  icon:'🚢', cost:200,  era:'classical',   deps:['celestialNavigation'],         x:1000, y:80,  unlocks:'Galère à rames, Port',      eureka:'Posséder 2 galères',             eurekaDiscount:.4 },
    { id:'mathematics',      name:'Mathématiques',        icon:'📐', cost:200,  era:'classical',   deps:['currency'],                    x:1000, y:200, unlocks:'Catapulte',                 eureka:'Posséder 2 districts spécialisés',eurekaDiscount:.4 },
    { id:'construction',     name:'Construction',         icon:'🏗️', cost:200,  era:'classical',   deps:['masonry','horsebackRiding'],   x:1000, y:380, unlocks:'Zone industrielle',         eureka:'Posséder 2 IZ',                  eurekaDiscount:.4 },
    { id:'engineering',      name:'Ingénierie',           icon:'🔩', cost:200,  era:'classical',   deps:['wheel'],                       x:1000, y:540, unlocks:'Aqueduc, Route',            eureka:'Construire aqueduc',             eurekaDiscount:.4 },

    // ── MÉDIÉVAL ──────────────────────────────────────────────
    { id:'education',        name:'Éducation',            icon:'📚', cost:390,  era:'medieval',    deps:['mathematics'],                 x:1220, y:180, unlocks:'Université',                eureka:'Madrasa ou Université',          eurekaDiscount:.4 },
    { id:'castles',          name:'Fortifications',       icon:'🏰', cost:390,  era:'medieval',    deps:['construction','mathematics'],  x:1220, y:280, unlocks:'Château, Remparts',         eureka:'Posséder unité de siège',        eurekaDiscount:.4 },
    { id:'militaryTactics',  name:'Tactiques militaires', icon:'🛡️', cost:390,  era:'medieval',    deps:['mathematics'],                 x:1220, y:380, unlocks:'Pikeman, Tercio',           eureka:'Posséder mêlée classique',       eurekaDiscount:.4 },
    { id:'machinery',        name:'Mécanique',            icon:'🔧', cost:390,  era:'medieval',    deps:['engineering','ironWorking'],   x:1220, y:480, unlocks:'Arbalétrier, Moulin',       eureka:'Posséder 3 mines',               eurekaDiscount:.4 },
    { id:'stirrups',         name:'Étriers',              icon:'🐎', cost:390,  era:'medieval',    deps:['horsebackRiding'],             x:1220, y:560, unlocks:'Chevalier',                 eureka:'Faire 3 combats de mêlée',       eurekaDiscount:.4 },

    // ── RENAISSANCE ───────────────────────────────────────────
    { id:'squareRigging',    name:'Gréement carré',       icon:'🪝', cost:660,  era:'renaissance', deps:['shipBuilding'],                x:1440, y:60,  unlocks:'Caravelle, Flûte',         eureka:'Posséder 2 Galères à rames',     eurekaDiscount:.4 },
    { id:'printing',         name:'Imprimerie',           icon:'📖', cost:660,  era:'renaissance', deps:['education'],                   x:1440, y:140, unlocks:'Propagande, Galilée',       eureka:'Posséder 2 cités-états',         eurekaDiscount:.4 },
    { id:'astronomy',        name:'Astronomie',           icon:'🔭', cost:660,  era:'renaissance', deps:['education'],                   x:1440, y:240, unlocks:'Observatoire, Lunette',     eureka:'Campus avec Université',         eurekaDiscount:.4 },
    { id:'metalCasting',     name:'Fonte des métaux',     icon:'🪛', cost:660,  era:'renaissance', deps:['castles'],                     x:1440, y:360, unlocks:'Canon, Acier',              eureka:'Posséder 2 forges',              eurekaDiscount:.4 },
    { id:'gunpowder',        name:'Poudre à canon',       icon:'💥', cost:660,  era:'renaissance', deps:['militaryTactics','stirrups'],  x:1440, y:460, unlocks:'Mousquetaire, Bombarde',    eureka:'Construire une armurerie',       eurekaDiscount:.4 },

    // ── INDUSTRIEL ────────────────────────────────────────────
    { id:'economics',        name:'Économie',             icon:'💹', cost:1150, era:'industrial',  deps:['printing'],                    x:1660, y:140, unlocks:'Bourse, Arsenal',           eureka:'Construire 2 hubs commerciaux',  eurekaDiscount:.4 },
    { id:'ballistics',       name:'Balistique',           icon:'💣', cost:1150, era:'industrial',  deps:['metalCasting'],                x:1660, y:300, unlocks:'Canon à pompe',             eureka:'Posséder 2 armureries',          eurekaDiscount:.4 },
    { id:'industrialization',name:'Industrialisation',    icon:'🏭', cost:1150, era:'industrial',  deps:['gunpowder','metalCasting'],    x:1660, y:400, unlocks:'Mine vapeur, Usine vapeur',  eureka:'Construire 2 mines',             eurekaDiscount:.4 },
    { id:'militaryScience',  name:'Science militaire',    icon:'🪖', cost:1150, era:'industrial',  deps:['gunpowder'],                   x:1660, y:500, unlocks:'Infanterie, Artillerie',    eureka:'Tuer GG ou GA',                  eurekaDiscount:.4 },

    // ── MODERNE ───────────────────────────────────────────────
    { id:'flight',           name:'Vol',                  icon:'✈️', cost:1700, era:'modern',      deps:['economics','ballistics'],      x:1880, y:140, unlocks:'Biplan, Aérodrome',         eureka:'Construire aérodrome',           eurekaDiscount:.4 },
    { id:'electricity',      name:'Électricité',          icon:'⚡', cost:1700, era:'modern',      deps:['industrialization','economics'],x:1880, y:240, unlocks:'Centrale électrique',       eureka:'Posséder 3 luxes',               eurekaDiscount:.4 },
    { id:'steel',            name:'Acier',                icon:'🔨', cost:1700, era:'modern',      deps:['industrialization'],           x:1880, y:400, unlocks:'Destroyer, Cuirassé',       eureka:'Construire 2 usines vapeur',     eurekaDiscount:.4 },
    { id:'militaryScience2', name:'Tactique avancée',     icon:'🎯', cost:1700, era:'modern',      deps:['militaryScience'],             x:1880, y:500, unlocks:'Corps/Armée bonus',         eureka:'Posséder 3 unités générales',    eurekaDiscount:.4 },
    { id:'radio',            name:'Radio',                icon:'📡', cost:1700, era:'modern',      deps:['electricity'],                 x:2100, y:180, unlocks:'Observation aérienne',      eureka:'Posséder 2 parcs nationaux',     eurekaDiscount:.4 },
    { id:'combustion',       name:'Combustion',           icon:'🛢️', cost:1700, era:'modern',      deps:['steel'],                       x:2100, y:340, unlocks:'Moteur à explosion',        eureka:'Extraire pétrole',               eurekaDiscount:.4 },

    // ── ATOMIQUE ──────────────────────────────────────────────
    { id:'rocketry',         name:'Rocketerie',           icon:'🚀', cost:2200, era:'atomic',      deps:['flight','radio'],              x:2320, y:140, unlocks:'Roquette sol-sol',          eureka:'Lancer satellite',               eurekaDiscount:.4 },
    { id:'computers',        name:'Informatique',         icon:'💻', cost:2200, era:'atomic',      deps:['electricity','steel'],         x:2320, y:240, unlocks:'Observatoire satellite',    eureka:'Posséder réseau ferroviaire',    eurekaDiscount:.4 },
    { id:'nuclear',          name:'Fission nucléaire',    icon:'☢️', cost:2200, era:'atomic',      deps:['combustion'],                  x:2320, y:340, unlocks:'Bombe atomique, Réacteur',  eureka:'Posséder Manhattan',             eurekaDiscount:.4 },
    { id:'plastics',         name:'Plastiques',           icon:'🧪', cost:2200, era:'atomic',      deps:['combustion'],                  x:2320, y:440, unlocks:'Chasseur à réaction',       eureka:'Construire Pétrolier',           eurekaDiscount:.4 },

    // ── INFORMATION ───────────────────────────────────────────
    { id:'satellites',       name:'Satellites',           icon:'🛰️', cost:3500, era:'information', deps:['rocketry','computers'],        x:2540, y:140, unlocks:'GPS, Espion avancé',        eureka:'Lancer Spoutnik',                eurekaDiscount:.4 },
    { id:'robotics',         name:'Robotique',            icon:'🤖', cost:3500, era:'information', deps:['computers'],                   x:2540, y:280, unlocks:'Usine robotisée, Mech inf.', eureka:'Posséder 3 IZ avec usine',      eurekaDiscount:.4 },
    { id:'stealth',          name:'Furtivité',            icon:'🥷', cost:3500, era:'information', deps:['plastics'],                    x:2540, y:440, unlocks:'Bombardier furtif, F-35',   eureka:'Posséder bombardier',            eurekaDiscount:.4 },
    { id:'telecommunications',name:'Télécom.',            icon:'📱', cost:3500, era:'information', deps:['satellites'],                  x:2760, y:140, unlocks:'Centre de renseignement',   eureka:'Posséder 2 bâtiments TV',        eurekaDiscount:.4 },
    { id:'futureTech',       name:'Technologies futures', icon:'🌌', cost:3500, era:'information', deps:['robotics','telecommunications','stealth'], x:2980, y:280, unlocks:'Score victoire', eureka:'Posséder vaisseau spatial',     eurekaDiscount:.4 },
  ],
};
