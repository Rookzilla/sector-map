export type ThreatLevel = "low" | "medium" | "high" | "critical";
export type SpaceFaction = "Imperium" | "Chaos" | "Contested" | "Greenskin" | "Renegade";
export type Climate =
  | "Temperate"
  | "Arcapelago"
  | "Ocean"
  | "Forest"
  | "Tundra"
  | "Ice"
  | "Desert"
  | "Savannah"
  | "Barren"
  | "No Atmosphere";

export type PlanetOwnerFaction = "Imperium" | "Chaos" | "Renegade" | "Greenskin" | "Xenos";

export type WorldClassKey =
  | "alpha"
  | "gamma"
  | "delta"
  | "deltaTau"
  | "epsilon"
  | "eta"
  | "mu"
  | "rho"
  | "phi"
  | "phiLambda";

export type WorldClassInfo = {
  code: string;
  title: string;
  icon: string;
  short: string;
};

export const worldClassifications: Record<WorldClassKey, WorldClassInfo> = {
  alpha: { code: "α-class", title: "Agri-World", icon: "🌾", short: "Alpha" },
  gamma: { code: "γ-class", title: "Civilised World", icon: "🏛", short: "Gamma" },
  delta: { code: "δ-class", title: "Dead World", icon: "◌", short: "Delta" },
  deltaTau: { code: "δτ-class", title: "Death World", icon: "☠", short: "Delta Tau" },
  epsilon: { code: "ε-class", title: "Cemetery World", icon: "⚰", short: "Epsilon" },
  eta: { code: "η-class", title: "Hive World", icon: "🏙", short: "Eta" },
  mu: { code: "μ-class", title: "Feudal World", icon: "🛡", short: "Mu" },
  rho: { code: "ρ-class", title: "Research Station", icon: "🔬", short: "Rho" },
  phi: { code: "φ-class", title: "Forge World", icon: "⚙", short: "Phi" },
  phiLambda: { code: "φλ-class", title: "Feral World", icon: "🪓", short: "Phi Lambda" },
};

export type World = {
  orbitalDesignation: string;
  knownName: string;
  classification: WorldClassKey;
  climate: Climate;
  ownerFaction?: PlanetOwnerFaction;
  underSiege?: boolean;
  underSedition?: boolean;
  population: string;
  status: string;
  governor?: string;
  imperialRegiment?: string;
  rulingWarband?: string;
  patronWorship?: "Khorne" | "Tzeentch" | "Nurgle" | "Slaanesh" | "Chaos Undivided";
  warboss?: string;
  renegadeCommander?: string;
  xenosAuthority?: string;
};

export type StarSystem = {
  id: string;
  name: string;
  x: number;
  y: number;
  threat: ThreatLevel;
  faction: SpaceFaction;
  summary: string;
  starClass: string;
  starAge: string;
  stability: string;
  astralNote: string;
  worlds: World[];
};

export const systems: StarSystem[] = [
  {
    id: "helion-gate",
    name: "Maximus",
    x: 260,
    y: 220,
    threat: "low",
    faction: "Imperium",
    summary: "A fortress lane star anchoring tithe routes, shrine convoys, and munitorum escorts.",
    starClass: "K2 Imperial Main Sequence",
    starAge: "5.8 billion years",
    stability: "Stable output, low warp bleed",
    astralNote: "Primary navigational beacon for nearby Imperial shipping lanes.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Carthae",
        classification: "phi",
        climate: "Temperate",
        population: "4.3 billion",
        status: "Macro-cannon and armored chassis production exceeds sector quota.",
        governor: "Governor-Militant Cassian Vhal",
        imperialRegiment: "12th Carthae Iron Guard",
      },
      {
        orbitalDesignation: "II",
        knownName: "Alecto",
        classification: "eta",
        climate: "Savannah",
        population: "45 billion",
        status: "Underhive purges continue after discovery of a heretek signal lattice.",
        governor: "Lady-Provost Selene Arkos",
        imperialRegiment: "9th Alecto Linebreakers",
      },
    ],
  },
  {
    id: "vesper-drift",
    name: "Vortanna",
    x: 760,
    y: 340,
    threat: "medium",
    faction: "Contested",
    summary: "A border star where Imperial battlegroups and raider fleets clash over jump gates.",
    starClass: "G5 Yellow Dwarf",
    starAge: "4.1 billion years",
    stability: "Minor flare cycles, tactical concern",
    astralNote: "Astropathic choir traffic spikes before every major engagement window.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Eidon",
        classification: "gamma",
        climate: "Temperate",
        ownerFaction: "Imperium",
        population: "1.9 billion",
        status:
          "Orbital bastions are trading fire daily after Karsis was defiled by Chaos, and the world now serves as the primary siege mustering point for reclamation campaigns.",
        imperialRegiment: "6th Eidon Bastion Guard",
      },
      {
        orbitalDesignation: "III",
        knownName: "Karsis",
        classification: "epsilon",
        climate: "Tundra",
        ownerFaction: "Chaos",
        underSiege: true,
        population: "420 million",
        status:
          "Once a shrine world, Karsis has been defiled by Chaos and is now under siege by Imperial task forces attempting to reclaim its reliquaries.",
      },
    ],
  },
  {
    id: "noctis-bloom",
    name: "Helican",
    x: 1180,
    y: 620,
    threat: "high",
    faction: "Imperium",
    summary:
      "A hardened Imperial bastion centered on hive security and sealed noosphere vaults, anchoring patrol lanes through unstable radiation bands.",
    starClass: "M0 Red Giant",
    starAge: "9.3 billion years",
    stability: "Unstable radiation bands",
    astralNote: "Storm-lantern beacons and orbital noosphere sentries track hostile incursions along the outer lanes.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Crownfall",
        classification: "eta",
        climate: "Temperate",
        population: "24 billion",
        status: "Hive spires run strict curfews following sabotage in lower transit sectors.",
        governor: "Lord Governor Thaddeus Gelt",
        imperialRegiment: "16th Crownfall Urban Cohorts",
      },
      {
        orbitalDesignation: "II",
        knownName: "Orison",
        classification: "rho",
        climate: "No Atmosphere",
        population: "620 thousand",
        status: "Vault lockdown after noosphere contamination from unknown source.",
        governor: "Custodian-Governor Meridia Solm",
      },
    ],
  },
  {
    id: "cryon-reach",
    name: "Dreyr",
    x: 420,
    y: 780,
    threat: "medium",
    faction: "Chaos",
    summary: "A blood-soaked lane star where traitor cruisers emerge from dust veils to raid convoys.",
    starClass: "F7 White Star",
    starAge: "3.2 billion years",
    stability: "Erratic flare bursts, warp harmonics detected",
    astralNote: "Long-range augurs detect recurring daemon-sign over the inner belt.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Kroadaria",
        classification: "deltaTau",
        climate: "Barren",
        underSiege: true,
        population: "640 million",
        status:
          "Mine shafts and trench networks are engulfed in huge armored battles as Imperial tank columns launched from Orpheon force repeated breach assaults into Chaos-held bastions.",
        rulingWarband: "Word Bearers aligned cult host",
        patronWorship: "Chaos Undivided",
      },
      {
        orbitalDesignation: "IV",
        knownName: "Ruinfall",
        classification: "delta",
        climate: "No Atmosphere",
        population: "46 million (surviving)",
        status: "Civilian enclaves endure nightly warp storms and mass possession events.",
        rulingWarband: "Black Legion reaver cell",
        patronWorship: "Chaos Undivided",
      },
    ],
  },
  {
    id: "auric-null",
    name: "Nemoris",
    x: 1500,
    y: 260,
    threat: "critical",
    faction: "Contested",
    summary: "A grave star with null-zones and sealed vault worlds sought by both Inquisition and raiders.",
    starClass: "Collapsed White Dwarf",
    starAge: "11.2 billion years",
    stability: "Severe gravitic distortion",
    astralNote: "Chronometric drift makes standard cartography unreliable.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Sepulcrum",
        classification: "epsilon",
        climate: "Ice",
        ownerFaction: "Imperium",
        population: "Unknown",
        status:
          "Sepulcrum holds the mausoleum-plex of Saint Arkonidas the True, and the Sepulcrum Watch repeatedly faces down Ork loota raids and Chaos daemon incursions near the sanctified vault approaches.",
        imperialRegiment: "11th Sepulcrum Watch",
      },
      {
        orbitalDesignation: "II",
        knownName: "Tenebra",
        classification: "delta",
        climate: "No Atmosphere",
        ownerFaction: "Chaos",
        underSiege: true,
        population: "Non-civilian activity only",
        status:
          "Under active Ork siege as warbands descend to battle daemonic hosts across Tenebra's wastes; unusual warp activity has opened a gate that endlessly spawns hell-bent Bloodletters of Khorne, yet the Orks keep charging in for a worthy fight.",
      },
    ],
  },
  {
    id: "lyra-span",
    name: "Hydraspes",
    x: 1680,
    y: 920,
    threat: "low",
    faction: "Greenskin",
    summary: "A supply-route star overrun by Ork flotillas building scrap fortresses across habitable worlds.",
    starClass: "K4 Orange Dwarf",
    starAge: "6.4 billion years",
    stability: "Stable but dust-obscured",
    astralNote: "Pict-feeds show ramshackle dockyards multiplying each cycle.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Urk Prime",
        classification: "gamma",
        climate: "Savannah",
        population: "2.6 billion (pre-infestation)",
        status: "Planetary foundries now produce improvised armor for Greenskin warbands.",
        warboss: "Warboss Grimskrag One-Eye",
      },
      {
        orbitalDesignation: "III",
        knownName: "Gorath",
        classification: "phiLambda",
        climate: "Forest",
        population: "520 million",
        status:
          "A derelict ancient hive world locked in crashing tides of Greenskin territorial conquest over buried hive treasures; over centuries the ecumenopolis has surrendered to the wastes, with greenery, brush, and shrub choking its ruins, and brave explorers still attempt to plunder archeotech hidden in its dead vaults.",
        warboss: "Big Mek Dakkazod",
      },
    ],
  },
  {
    id: "xandros",
    name: "Xandros",
    x: 980,
    y: 900,
    threat: "high",
    faction: "Renegade",
    summary:
      "A rebel corridor star inside Agamemnon's relativistic fringe, where naval operations desynchronize and causality windows fracture command coherence.",
    starClass: "A9 Blue-White Star",
    starAge: "2.7 billion years",
    stability: "Relativistic tidal distortion and intermittent radiation storms",
    astralNote:
      "Imperial campaign logs in this system return out of phase, with operations begun in one century resolving in another.",
    worlds: [
      {
        orbitalDesignation: "XIV",
        knownName: "Xandrosia",
        classification: "alpha",
        climate: "Temperate",
        underSiege: true,
        population: "14.6 billion",
        status:
          "A temperate ocean-rich agri world beyond Imperial architecture, defined by terraced farmlands, salt-reactor cities, and integrated civic industry, ruled by the Basileus and currently under active Imperial siege that repeatedly falls out of phase near Agamemnon.",
        renegadeCommander: "The Basileus of Xandros",
      },
      {
        orbitalDesignation: "XV",
        knownName: "Kryost",
        classification: "delta",
        climate: "Ice",
        underSiege: true,
        population: "24 million",
        status:
          "A cold dead world locked in near-absolute-zero conditions, now under siege as hardened trench lines are contested by Basileus loyalists and Imperial assault cadres in relentless ice warfare.",
        renegadeCommander: "Duke Regent Malachor of Kryost",
      },
    ],
  },
  {
    id: "aegis-prime",
    name: "Aegis",
    x: 620,
    y: 170,
    threat: "low",
    faction: "Imperium",
    summary: "A watch-star guarding naval approach corridors with layered picket fleets.",
    starClass: "F2 White Dwarf Pair",
    starAge: "4.9 billion years",
    stability: "Stable dual-output",
    astralNote: "Psykana beacons here are used to calibrate long-range astropath relays.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Castrum",
        classification: "mu",
        climate: "Temperate",
        population: "420 million",
        status: "Knightly households feud over charter rights while obeying tithe law.",
        governor: "High Castellan Brutus Kaine",
        imperialRegiment: "7th Castrum Household Auxilia",
      },
      {
        orbitalDesignation: "III",
        knownName: "Medea",
        classification: "alpha",
        climate: "Savannah",
        population: "1.2 billion",
        status: "Grain convoys now move under escort after repeated voidborne thefts.",
        governor: "Governor-Intendant Aria Solenne",
        imperialRegiment: "14th Medea Dragoons",
      },
    ],
  },
  {
    id: "carthon-veil",
    name: "Hakkara",
    x: 980,
    y: 180,
    threat: "medium",
    faction: "Contested",
    summary: "A trade star at the edge of a dust veil contested by privateer houses.",
    starClass: "G8 Dwarf",
    starAge: "6.1 billion years",
    stability: "Stable with particulate eclipses",
    astralNote: "Long-duration scans show hidden docks moving within the veil.",
    worlds: [
      {
        orbitalDesignation: "II",
        knownName: "Dalmor",
        classification: "gamma",
        climate: "Temperate",
        ownerFaction: "Renegade",
        underSedition: true,
        population: "1.4 billion",
        status:
          "Open sedition followed a mass uprising that handed power back to the populace; ganger syndicates now rule under the self-proclaimed Senator Hargreave, have renounced Imperial faith, and attract waves of hereteks practicing unchecked machine science and the worst excesses of technological innovation.",
        renegadeCommander: "Self-Proclaimed Senator Hargreave",
      },
      {
        orbitalDesignation: "IV",
        knownName: "Pella",
        classification: "rho",
        climate: "Ocean",
        ownerFaction: "Imperium",
        population: "410 thousand",
        status: "Survey stations map unusual gravitic wakes beneath abyssal basins.",
      },
    ],
  },
  {
    id: "malthus",
    name: "Malthus",
    x: 1320,
    y: 120,
    threat: "high",
    faction: "Chaos",
    summary: "A cursed star with recurring warp-echoes and collapsing shrine routes.",
    starClass: "M4 Dying Red Star",
    starAge: "10.8 billion years",
    stability: "Terminal instability",
    astralNote: "Every seventh cycle, choir-vox returns unknown liturgies.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Shale",
        classification: "deltaTau",
        climate: "Desert",
        population: "430 million",
        status: "Pilgrim roads are lined with charred reliquaries and daemon marks.",
        rulingWarband: "Night Lords raider coterie",
        patronWorship: "Chaos Undivided",
      },
      {
        orbitalDesignation: "V",
        knownName: "Vesper Oss",
        classification: "epsilon",
        climate: "Barren",
        population: "Unknown",
        status: "Catacomb vaults are occupied by chanting warbands.",
        rulingWarband: "Creed of the Eightfold Pyre",
        patronWorship: "Tzeentch",
      },
    ],
  },
  {
    id: "orpheon",
    name: "Orpheon",
    x: 240,
    y: 500,
    threat: "medium",
    faction: "Imperium",
    summary: "A logistics star that feeds nearby crusade fronts with fuel and shell stock.",
    starClass: "K1 Main Sequence",
    starAge: "5.3 billion years",
    stability: "Stable",
    astralNote: "Munitorum records show repeated requisition spikes ahead of campaigns.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Hektor",
        classification: "phi",
        climate: "Barren",
        population: "2.2 billion",
        status: "Tank hull assembly lines run without pause under priesthood supervision.",
        governor: "Governor-General Torvin Hale",
        imperialRegiment: "18th Hektor Armored",
      },
      {
        orbitalDesignation: "II",
        knownName: "Nysa",
        classification: "alpha",
        climate: "Temperate",
        population: "760 million",
        status: "Food levies expanded to support three neighboring war zones.",
        governor: "Prefect-Governor Ilyra Venn",
        imperialRegiment: "10th Nysa Provision Corps",
      },
    ],
  },
  {
    id: "tessarion",
    name: "Tessarion",
    x: 900,
    y: 500,
    threat: "high",
    faction: "Renegade",
    summary: "A splinter star system ruled by breakaway captains and oathless planetary militias.",
    starClass: "G2 Star",
    starAge: "4.4 billion years",
    stability: "Moderate flare activity",
    astralNote: "Forgery-grade astropath seals circulate from this system.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Scoria",
        classification: "gamma",
        climate: "Desert",
        population: "1.2 billion",
        status: "Governor-palaces are fortified by mercenary regiments.",
        renegadeCommander: "Archon Salvius Grane",
      },
      {
        orbitalDesignation: "II",
        knownName: "Bracken",
        classification: "mu",
        climate: "Forest",
        underSedition: true,
        population: "390 million",
        status:
          "A feudal world in the clutches of a declared holy war: seditionist hosts battle Chaos-affiliated cults practicing magicks, renegade rulers have hired Sslyth mercenaries, and paltry Imperial regiment detachments can only reinforce vast sword-and-axe field battles.",
        renegadeCommander: "The Verdant Host Compact and hired Sslyth mercenary captains",
      },
    ],
  },
  {
    id: "vigilant",
    name: "Vigilant",
    x: 1540,
    y: 500,
    threat: "low",
    faction: "Imperium",
    summary: "A sentinel star holding astropath towers and reserve naval docks.",
    starClass: "F4 Star",
    starAge: "3.8 billion years",
    stability: "Excellent",
    astralNote: "Segmentum command uses this system as a rally point for relief fleets.",
    worlds: [
      {
        orbitalDesignation: "II",
        knownName: "Lumen",
        classification: "rho",
        climate: "Ice",
        population: "780 thousand",
        status: "Polar laboratories test anti-void shielding for convoy escorts.",
        governor: "Governor-Regent Marius Yorr",
      },
      {
        orbitalDesignation: "IV",
        knownName: "Guangshua",
        classification: "alpha",
        climate: "Temperate",
        population: "2.4 billion",
        status:
          "Vast rice fields, swamps, and swelling river plains feed a disciplined agri economy, while chapter-wardens of the Jade Falcons, a White Scars successor chapter, oversee fast-response defense and weather operations that leave the world prone to natural disasters.",
        governor: "Steward-Governor Jia Ren",
        imperialRegiment: "1st Celestial Dragons",
      },
    ],
  },
  {
    id: "drakonis",
    name: "Drakonis",
    x: 180,
    y: 980,
    threat: "medium",
    faction: "Greenskin",
    summary: "A frontier star where roaming ork fleets test ramshackle gun platforms.",
    starClass: "M1 Dwarf",
    starAge: "8.2 billion years",
    stability: "Stable",
    astralNote: "Wreck fields around the inner belt grow by the week.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Skrap",
        classification: "phiLambda",
        climate: "Barren",
        population: "690 million (estimated)",
        status: "Mountain ranges are carved into giant gun emplacements.",
        warboss: "Warboss Krunktoof",
      },
      {
        orbitalDesignation: "II",
        knownName: "Mekhold",
        classification: "phi",
        climate: "No Atmosphere",
        population: "Unknown",
        status: "Abandoned manufactoria converted into ork mek forges.",
        warboss: "Big Mek Razzlug",
      },
    ],
  },
  {
    id: "elysion",
    name: "Elysion",
    x: 520,
    y: 980,
    threat: "low",
    faction: "Imperium",
    summary: "A breadbasket star whose worlds sustain nearby fortress sectors.",
    starClass: "G3 Star",
    starAge: "4.6 billion years",
    stability: "Stable",
    astralNote: "Imperial crop futures from this system influence sector logistics planning.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Ionia",
        classification: "alpha",
        climate: "Temperate",
        population: "1.5 billion",
        status: "Harvest orbital lifts run around the clock.",
        governor: "Governor-Marshal Ilena Rhys",
        imperialRegiment: "13th Ionia Field Wardens",
      },
      {
        orbitalDesignation: "III",
        knownName: "Prax",
        classification: "gamma",
        climate: "Forest",
        underSiege: true,
        population: "1.1 billion",
        status:
          "Chaos warbands have escalated raider probes into a full siege, with Prax's civil defense networks and line infantry holding shrinking perimeter zones.",
        governor: "Civic Governor Bastien Kroll",
        imperialRegiment: "15th Prax Line Infantry",
      },
    ],
  },
  {
    id: "kharon",
    name: "Kharon",
    x: 760,
    y: 820,
    threat: "high",
    faction: "Chaos",
    summary: "A void-lashed star where traitor flotillas replenish from hidden docks.",
    starClass: "A7 Star",
    starAge: "2.5 billion years",
    stability: "Turbulent",
    astralNote: "Warp static here causes frequent auspex ghost readings.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Acher",
        classification: "deltaTau",
        climate: "Tundra",
        population: "310 million",
        status: "Mountain redoubts are controlled by apostate siege cells.",
        rulingWarband: "Iron Warriors splinter host",
        patronWorship: "Chaos Undivided",
      },
      {
        orbitalDesignation: "II",
        knownName: "Black Pyre",
        classification: "epsilon",
        climate: "Barren",
        population: "Unknown",
        status:
          "Mass grave plains host profane rituals as Ordo Malleus observers report repeated daemonic incursions; the Hessicus daemon gate spews forth unwitting horrors and draws black pilgrimages, marking Black Pyre as the center of Chaos in the Cowled Abyss.",
        rulingWarband: "Cult of the Last Ember",
        patronWorship: "Chaos Undivided",
      },
    ],
  },
  {
    id: "mykene",
    name: "Mykene",
    x: 1620,
    y: 700,
    threat: "low",
    faction: "Imperium",
    summary: "A reserve mustering star with strict fleet discipline and dependable warp tides.",
    starClass: "G1 Star",
    starAge: "4.2 billion years",
    stability: "Excellent",
    astralNote: "Long-haul convoys use this star as their final armament stop.",
    worlds: [
      {
        orbitalDesignation: "II",
        knownName: "Heliad",
        classification: "eta",
        climate: "Temperate",
        population: "80 billion",
        status:
          "The jewel of the Eastern Abyss, Heliad's colossal hive forges and barracks churn out hundreds of explosive-equipped infantry regiments; the 17th Heliad Grenadiers are lent to siege fronts across the sector, often deployed alongside rough rider cavalry from Anker.",
        governor: "Governor-Elect Octavia Hel",
        imperialRegiment: "17th Heliad Grenadiers",
      },
      {
        orbitalDesignation: "IV",
        knownName: "Anker",
        classification: "mu",
        climate: "Forest",
        population: "360 million",
        status:
          "A forested mountain world of terraced succulent-fruit farming that breeds a dour, hardy feudal warrior culture; its rough rider hosts answer both Imperial tithe and a secondary prophet-god cult, believing the Emperor grants visions in the form of a giant eagle.",
        governor: "Steward-Governor Halbrecht Voss",
        imperialRegiment: "6th Anker Rough Riders",
      },
    ],
  },
  {
    id: "praxedes",
    name: "Praxedes",
    x: 1560,
    y: 980,
    threat: "medium",
    faction: "Greenskin",
    summary: "A polluted star where ork clan docks spread along abandoned station rings.",
    starClass: "K8 Dwarf",
    starAge: "8.9 billion years",
    stability: "Stable",
    astralNote: "Captured augur buoys report constant scrap-hauler traffic.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Ruk",
        classification: "phiLambda",
        climate: "Desert",
        population: "740 million (estimated)",
        status: "Nomad warbands carve rolling fortresses into canyon routes.",
        warboss: "Warboss Snagrot Blazejaw",
      },
      {
        orbitalDesignation: "II",
        knownName: "Morka's Yard",
        classification: "phi",
        climate: "No Atmosphere",
        underSiege: true,
        population: "Unknown",
        status:
          "An Ork-occupied former Imperial forge world now under active Imperial siege to reclaim lost technology, with the Cadian 16th and Cadian 448th Armoured spearheading breach assaults on captured dock-forges.",
        warboss: "Mek-Lord Ugrakka",
      },
    ],
  },
  {
    id: "satrapa",
    name: "Satrapa",
    x: 980,
    y: 1030,
    threat: "high",
    faction: "Contested",
    summary: "A jurisdictional flashpoint where three fleets claim right of passage.",
    starClass: "A5 Star",
    starAge: "3.0 billion years",
    stability: "Radiant but stable",
    astralNote: "No two charts agree on local hazard gradients.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Korin",
        classification: "gamma",
        climate: "Arcapelago",
        ownerFaction: "Greenskin",
        population: "950 million",
        status:
          "An ork pirate world and major Freebooterz haven where docks and raider coves feed a mighty naval Waaagh; immense tidal activity from the nearby black hole batters its archipelagos, and its savage pirate lord Madsplasha is famed for felling the planet's giant squid.",
        warboss: "Pirate Lord Madsplasha",
      },
      {
        orbitalDesignation: "V",
        knownName: "Harrow Deep",
        classification: "rho",
        climate: "Ocean",
        ownerFaction: "Imperium",
        population: "340 thousand",
        status: "Survey arrays study gravitic shear near Agamemnon's pull.",
      },
    ],
  },
  {
    id: "ikarion",
    name: "Ikarion",
    x: 1120,
    y: 320,
    threat: "low",
    faction: "Imperium",
    summary: "A disciplined scholam-and-shipyard star supplying officers and escorts.",
    starClass: "F5 Star",
    starAge: "3.5 billion years",
    stability: "Stable",
    astralNote: "Officer cadet flotillas drill in high orbit every cycle.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Astraeum",
        classification: "rho",
        climate: "Temperate",
        population: "900 thousand",
        status: "Schola bastions expand their tactical simulation networks.",
        governor: "Governor-Provost Elara Quill",
      },
      {
        orbitalDesignation: "III",
        knownName: "Ferron",
        classification: "phi",
        climate: "Barren",
        population: "1.6 billion",
        status: "Escort frigate assembly quotas are doubled this quarter.",
        governor: "Forge Governor Darius Vennor",
        imperialRegiment: "9th Ferron Dock Wardens",
      },
    ],
  },
  {
    id: "barachiel",
    name: "Barachiel",
    x: 700,
    y: 640,
    threat: "high",
    faction: "Contested",
    summary:
      "A shrine-rich star where the Sons of Piety have risen in armed sedition after tithe collapse, igniting open war against nearby Imperial worlds.",
    starClass: "G6 Star",
    starAge: "5.0 billion years",
    stability: "Stable",
    astralNote:
      "Interrogator reports suggest Chaos agents have infiltrated the Sons of Piety command echelons.",
    worlds: [
      {
        orbitalDesignation: "II",
        knownName: "Vespera",
        classification: "epsilon",
        climate: "Tundra",
        ownerFaction: "Renegade",
        underSedition: true,
        population: "480 million",
        status:
          "A reliquary world under nominal Imperial ownership; after tithe demands broke the shrine clans, the Sons of Piety seized catacomb bastions and now wage a dogmatic war while suspected Chaos infiltrators fan the conflict.",
      },
      {
        orbitalDesignation: "IV",
        knownName: "Civitas Null",
        classification: "gamma",
        climate: "Temperate",
        ownerFaction: "Imperium",
        population: "1.7 billion",
        status: "Planetary senate fractured after dockworker uprisings.",
        imperialRegiment: "8th Civitas Null Suppression Corps",
      },
    ],
  },
  {
    id: "gryphonis",
    name: "Gryphonis",
    x: 1700,
    y: 360,
    threat: "high",
    faction: "Contested",
    summary: "An outer-rim star where ork freebooters raid long-haul convoy routes.",
    starClass: "K3 Star",
    starAge: "6.9 billion years",
    stability: "Stable",
    astralNote: "Long-range scanners record dense scrap fields in every high orbit.",
    worlds: [
      {
        orbitalDesignation: "I",
        knownName: "Ragmouth",
        classification: "phiLambda",
        climate: "Savannah",
        ownerFaction: "Greenskin",
        population: "610 million (estimated)",
        status: "Nomad war camps and scrap-harbours stage massive invasion fleets bound for Zubzaria.",
        warboss: "Warboss Hruk Ironsnout",
      },
      {
        orbitalDesignation: "III",
        knownName: "Zubzaria",
        classification: "deltaTau",
        climate: "Desert",
        ownerFaction: "Xenos",
        underSiege: true,
        population: "280 million",
        status:
          "A death world inhabited by the Zubzarians, four-armed lilac-skinned warrior clans whose elite genome psycommandos contest invading Waaagh columns at every turn; deadly fauna, toxic cloud belts, and sentient lightning storms ravage both sides, plasma fire burns mountain ranges of the dead each day, and the guns never fall silent.",
        xenosAuthority: "Psykommando Commerce Junta",
      },
    ],
  },
];
