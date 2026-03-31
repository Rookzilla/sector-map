import { type Climate, type StarSystem, type World, type WorldClassKey } from "../../../data/systems";

type MetricTone = "neutral" | "good" | "warn" | "danger";

export type PlanetMetric = {
  label: string;
  value: string;
  tone?: MetricTone;
};

export type PlanetSection = {
  title: string;
  content: string;
};

export type PlanetDetailProfile = {
  infobox: Array<{ label: string; value: string }>;
  metrics: PlanetMetric[];
  sections: PlanetSection[];
  campaignNotes: string[];
};

const classRoleLabel: Record<WorldClassKey, string> = {
  alpha: "agri surplus",
  gamma: "civil manufacturing",
  delta: "raw extraction",
  deltaTau: "hazard interdiction",
  epsilon: "pilgrim custodianship",
  eta: "hive labor capacity",
  mu: "levy recruitment",
  rho: "research outputs",
  phi: "forge production",
  phiLambda: "frontier manpower",
};

const isTitheNonCompliant = (system: StarSystem, world: World) => {
  const owner = world.ownerFaction ?? system.faction;
  return owner === "Chaos" || owner === "Renegade";
};

const climateDescriptors: Record<Climate, string> = {
  Temperate: "Moderate climate belts and stable agrarian cycles",
  Arcapelago: "Fragmented island chains linked by naval convoy routes",
  Ocean: "Global ocean basins with sparse continental plateaus",
  Forest: "Dense biomass canopies and contested timber zones",
  Tundra: "Cold steppe plateaus and permafrost logistics corridors",
  Ice: "Cryogenic fronts with permanent glacial pressure",
  Desert: "Arid continental shelves with water-dependent population hubs",
  Savannah: "Broad grassland belts suited to mass habitation and ranching",
  Barren: "Resource-scarce geologies and hostile biosphere conditions",
  "No Atmosphere": "Vacuum conditions requiring sealed habitation",
};

const byClassMetrics: Record<WorldClassKey, (system: StarSystem, world: World) => PlanetMetric[]> = {
  alpha: (system, world) => [
    {
      label: "Tithe Yield",
      value: isTitheNonCompliant(system, world) ? "0% - no Imperial tithe fulfillment" : "87% covenant fulfillment",
      tone: isTitheNonCompliant(system, world) ? "danger" : "warn",
    },
    { label: "Harvest Stability", value: "Weather-fragile but productive", tone: "neutral" },
    { label: "Food Convoys", value: "Escort demand above baseline", tone: "warn" },
    { label: "Civil Compliance", value: world.underSedition ? "Fractured" : "Stable", tone: world.underSedition ? "danger" : "good" },
  ],
  gamma: () => [
    { label: "Urban Density", value: "High metropolitan concentration", tone: "neutral" },
    { label: "Civic Order", value: "Managed by layered precinct authority", tone: "good" },
    { label: "Industrial Throughput", value: "Self-sustaining export profile", tone: "good" },
    { label: "Unrest Potential", value: "Localized labor flashpoints", tone: "warn" },
  ],
  delta: () => [
    { label: "Habitability", value: "Marginal", tone: "danger" },
    { label: "Resource Value", value: "Extraction-driven settlements only", tone: "neutral" },
    { label: "Surface Risk", value: "Extreme environmental attrition", tone: "danger" },
    { label: "Logistics Cost", value: "High import dependency", tone: "warn" },
  ],
  deltaTau: () => [
    { label: "Survival Index", value: "Below sanctioned threshold", tone: "danger" },
    { label: "Predation Risk", value: "Persistent hostile biosphere", tone: "danger" },
    { label: "Expedition Losses", value: "Chronic attrition", tone: "warn" },
    { label: "Military Utility", value: "Veteran hardening environment", tone: "good" },
  ],
  epsilon: () => [
    { label: "Interment Capacity", value: "Planetary necropolis scale", tone: "neutral" },
    { label: "Pilgrim Traffic", value: "Seasonal surges", tone: "warn" },
    { label: "Reliquary Integrity", value: "Monitored under strict canon", tone: "good" },
    { label: "Cult Activity", value: "Watchlisted fringe sects", tone: "warn" },
  ],
  eta: () => [
    { label: "Hive Stack Load", value: "Overcapacity in lower tiers", tone: "warn" },
    { label: "Enforcer Reach", value: "Strong in upper hive corridors", tone: "good" },
    { label: "Manufactoria Output", value: "Continuous", tone: "good" },
    { label: "Underhive Volatility", value: "Escalating", tone: "danger" },
  ],
  mu: (_system, world) => [
    {
      label: "Tech Baseline",
      value: world.knownName === "Bracken" ? "Feudal with limited off-world arms imports" : "Pre-industrial",
      tone: "neutral",
    },
    {
      label: "Noble Cohesion",
      value: world.underSedition ? "Splintered into rival crusading houses" : "Clan rivalry with tithe compliance",
      tone: world.underSedition ? "danger" : "warn",
    },
    {
      label: "Levy Readiness",
      value: world.knownName === "Bracken" ? "Mass sword-and-axe musters in open fields" : "Reliable infantry musters",
      tone: world.knownName === "Bracken" ? "warn" : "good",
    },
    {
      label: "Cultural Drift",
      value:
        world.knownName === "Bracken"
          ? "Chaos cult magicks and heretical shrine rites spreading"
          : "High local doctrine variance",
      tone: world.knownName === "Bracken" ? "danger" : "warn",
    },
  ],
  rho: () => [
    { label: "Research Priority", value: "Strategic", tone: "good" },
    { label: "Data Security", value: "Restricted by Magos order", tone: "good" },
    { label: "Anomaly Exposure", value: "Elevated", tone: "warn" },
    { label: "Staff Survivability", value: "Mission-dependent", tone: "warn" },
  ],
  phi: () => [
    { label: "Forge Throughput", value: "War materiel optimized", tone: "good" },
    { label: "Reactor Uptime", value: "Sacred machine cycles stable", tone: "good" },
    { label: "Material Input", value: "Convoy-sensitive", tone: "warn" },
    { label: "Noosphere Integrity", value: "Intrusion attempts detected", tone: "danger" },
  ],
  phiLambda: () => [
    { label: "Tribal Cohesion", value: "Fragmented warbands", tone: "warn" },
    { label: "Technological Index", value: "Primitive", tone: "neutral" },
    { label: "Pacification Burden", value: "High", tone: "danger" },
    { label: "Recruitment Potential", value: "Physically resilient stock", tone: "good" },
  ],
};

const byClassSections: Record<WorldClassKey, (system: StarSystem, world: World) => PlanetSection[]> = {
  alpha: (system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is categorized as an Agri-World with large mechanized estates and export granaries that anchor local food security.`,
    },
    {
      title: "Agrarian Economy",
      content:
        "Crop processing combines mechanized estate platforms with bonded labor blocs, and shipment schedules are coordinated against convoy windows and orbital weather.",
    },
    {
      title: "Political Situation",
      content: world.underSedition
        ? "Rural shrine councils and militia captains now contest lawful authority, presenting the conflict as sacred resistance while supply discipline degrades."
        : system.faction === "Imperium"
          ? "Administratum clerks and shrine militias enforce harvest quotas through chapel courts and grain-marshal registries."
          : system.faction === "Renegade"
            ? "Regional barons and guild factors enforce grain levies through oath tribunals and convoy compacts loyal to the ruling house."
            : system.faction === "Contested"
              ? "Rival authorities compete to seize silo networks, and each offensive cycle disrupts planting and collection schedules."
              : "Harvest infrastructure is increasingly directed toward military provisioning rather than civilian stability.",
    },
  ],
  gamma: (system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is a Civilised World with diversified industry, broad urbanization, and layered civic governance.`,
    },
    {
      title: "Society",
      content:
        system.faction === "Imperium"
          ? "Most population centers are tiered by guild and labor charter, with civic ritual and defense levies integrated into municipal law."
          : system.faction === "Renegade"
            ? "Most population centers are governed by charter blocs and dock syndicates, with civic order tied to militia oaths and industrial output."
            : system.faction === "Greenskin"
              ? "Former civic districts are fractured into fortified scrap zones where ork mobs repurpose infrastructure for war production."
              : "Population centers remain divided between competing councils, private militias, and faction-aligned labor combines.",
    },
    {
      title: "Security",
      content: "Threat response relies on orbital customs, arbites precinct nets, and rapid mobilization from contract militia cadres.",
    },
  ],
  delta: (_system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is recognized as a Dead World where settlement persists only for strategic extraction or waystation purposes.`,
    },
    {
      title: "Surface Conditions",
      content: "Atmospheric instability and environmental sterility impose severe maintenance burdens on any permanent outpost infrastructure.",
    },
    {
      title: "Strategic Function",
      content: "Its value is measured in recoverable resources, route control, and denial operations rather than population capacity.",
    },
  ],
  deltaTau: (_system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is designated a Death World, with hostile environmental factors making civilian habitation exceptionally costly.`,
    },
    {
      title: "Ecological Threats",
      content: "Fauna aggression, terrain lethality, and weather violence are persistent operational constraints for all ground deployments.",
    },
    {
      title: "Military Relevance",
      content: "Despite catastrophic attrition rates, campaigns on such worlds are valued for producing hardened veteran formations.",
    },
  ],
  epsilon: (system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is maintained as a Cemetery World, dominated by reliquary complexes and interment catacombs.`,
    },
    {
      title: "Pilgrimage & Canon",
      content:
        system.faction === "Chaos"
          ? "Funerary vaults are now profaned and repurposed for war-cult rite processions, with relic stores converted into ritual strongpoints."
          : "Pilgrim processions regulate access to sanctified vaults, while relic registries are audited to prevent doctrinal fraud.",
    },
    {
      title: "Current Tensions",
      content: "Burial politics, shrine custodianship, and sectarian rivalry regularly shape local security conditions.",
    },
  ],
  eta: (_system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is classified as a Hive World characterized by megastructure habitation and stratified socio-economic tiers.`,
    },
    {
      title: "Population Structure",
      content: "Upper hive administrations control trade and ordinance while lower tiers sustain industrial labor and militia recruitment pools.",
    },
    {
      title: "Conflict Profile",
      content: "Underhive faction wars and black-market logistics chains remain chronic destabilizing factors.",
    },
  ],
  mu: (system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is a Feudal World with low technological development and authority vested in hereditary houses.`,
    },
    {
      title: "Governance",
      content:
        world.knownName === "Bracken"
          ? "A declared holy war pits oathbound houses against Chaos-affiliated cult sects practicing battlefield magicks, while renegade rulers rely on hired Sslyth mercenary cadres to hold key fronts."
          : system.faction === "Imperium"
          ? "Tithe obligations are translated into oath levies through local chivalric codes and shrine-sanctioned legitimacy rituals."
          : "Oath levies are raised through house compacts and martial rites, with authority legitimized by local lineage and force.",
    },
    {
      title: "Military Utility",
      content:
        world.knownName === "Bracken"
          ? "Imperial relief arrives as paltry detached regiments, so the war is decided primarily by feudal hosts in prolonged field battles fought with sword and axe."
          : "Levy forces are resilient and numerous, though usually dependent on external command for modern theater operations.",
    },
  ],
  rho: (system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} functions as a Research Station world focused on restricted experimentation and strategic data recovery.`,
    },
    {
      title: "Operational Protocols",
      content:
        system.faction === "Imperium"
          ? "Access control is severe, with compartmentalized teams and doctrinal quarantine procedures for anomalous findings."
          : "Access control is severe, with compartmentalized teams and hard-seal quarantine routines around anomalous findings.",
    },
    {
      title: "Strategic Impact",
      content: "Outputs from these facilities influence fleet doctrine, weapons adaptation, and long-horizon campaign planning.",
    },
  ],
  phi: (_system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is a Forge World, where industrial theology and war production dictate all civic priorities.`,
    },
    {
      title: "Manufacturing Doctrine",
      content: "Output is optimized around military procurement chains, with manufactoria rites synchronized to machine-cult ordinances.",
    },
    {
      title: "Security Posture",
      content: "Critical foundries are guarded by layered defense cohorts and orbital interdiction screens.",
    },
  ],
  phiLambda: (system, world) => [
    {
      title: "Overview",
      content: `${world.knownName} is designated a Feral World with decentralized tribal populations and minimal technological infrastructure.`,
    },
    {
      title: "Social Order",
      content:
        system.faction === "Greenskin"
          ? "Power is negotiated through warboss authority, scrap-kin alliances, and ritualized combat cycles."
          : "Power is negotiated through war-chief authority, kin alliances, and ritual combat cycles.",
    },
    {
      title: "Imperial Interest",
      content: "The world is monitored for recruitment potential, compliance risk, and emergent hostile cult vectors.",
    },
  ],
};

const uniqueFactsByWorld: Record<string, string> = {
  "helion-gate:Carthae": "Carthae's forge-shrines still maintain an unbroken macro-cannon blessing liturgy dating back seven crusade eras.",
  "helion-gate:Alecto": "Alecto's lower transit grid is mapped by shrine-wardens using incense-coded route signals instead of standard lumen beacons.",
  "vesper-drift:Eidon": "Eidon's orbital bastions rotate firing doctrine every twelve hours to mirror siege telemetry from Karsis.",
  "vesper-drift:Karsis": "Karsis reliquary vaults are now defended by layered trench cathedrals built directly into shattered shrine districts.",
  "noctis-bloom:Crownfall": "Crownfall's curfew sirens are synchronized to hive-spire airlocks so sabotage cells cannot move between sectors unseen.",
  "noctis-bloom:Orison": "Orison's vault custodians circulate noosphere keys in rotating triads, preventing any single breach path from persisting.",
  "cryon-reach:Kroadaria": "Kroadaria's armored kill-zones are so saturated with wrecks that new assault lanes are often carved through burning hull fields.",
  "cryon-reach:Ruinfall": "Ruinfall enclaves mark safe corridors with pressure-lamps because warp storms repeatedly erase conventional cartography.",
  "auric-null:Sepulcrum": "The mausoleum-plex of Saint Arkonidas the True is guarded by rotating Sepulcrum Watch reliquary cordons at all hours.",
  "auric-null:Tenebra": "Tenebra's active warp gate has made daemonfall events so frequent that Ork assault waves treat each emergence like a muster gong.",
  "lyra-span:Urk Prime": "Urk Prime foundries now stamp salvage armor with clan glyph batches tied to weekly Waaagh levy quotas.",
  "lyra-span:Gorath": "Gorath's overgrown hive canyons are crossed by looter ropeways built through collapsed spires and vine-choked transit decks.",
  "xandros:Xandrosia": "Xandrosia convoy plans are written in phased campaign script to survive Agamemnon-driven causality drift.",
  "xandros:Kryost": "Kryost trenchworks are reinforced with frozen wreck plating because fresh ferrocrete deliveries no longer arrive on schedule.",
  "aegis-prime:Castrum": "Castrum household knights still settle disputed charters through formal lance courts before wider deployment orders are issued.",
  "aegis-prime:Medea": "Medea grain elevators are paired with void-lock annexes so harvest output can be diverted to convoy holds in minutes.",
  "carthon-veil:Dalmor": "Dalmor ganger councils now broadcast anti-Imperial decrees from reclaimed senate vox towers under Senator Hargreave's seal.",
  "carthon-veil:Pella": "Pella abyssal survey crews track gravitic wakes by chaining bathyscanner relays directly to orbital watch stations.",
  "malthus:Shale": "Shale pilgrim roads are now used as ritual procession lanes for war-cults moving between blackened reliquary fronts.",
  "malthus:Vesper Oss": "Vesper Oss catacomb elevators are powered by captured shrine reactors repurposed for continuous chant-cycle operations.",
  "orpheon:Hektor": "Hektor line forges can refit an armored company from hull frame to live-fire test in under three standard days.",
  "orpheon:Nysa": "Nysa convoy depots maintain triple-redundant grain vaults to absorb emergency requisitions from siege-bound neighbors.",
  "tessarion:Scoria": "Scoria palace districts are linked by armored toll bridges privately held by archon-loyal mercenary combines.",
  "tessarion:Bracken": "Bracken's crusading houses issue battlefield oaths on ironwood tablets carried into swordline charges by mounted heralds.",
  "vigilant:Lumen": "Lumen polar labs test convoy shielding inside cryo-tempest chambers that mimic deep-void particulate shear.",
  "vigilant:Guangshua": "Guangshua weather-wardens stage stormbreak drills with Jade Falcon outrider flights over flooded rice terraces.",
  "drakonis:Skrap": "Skrap gun-ridges are tuned by mek crews who fire calibration barrages into neighboring mountain chains each dawn.",
  "drakonis:Mekhold": "Mekhold's dead manufactoria now operate as vacuum mek-yards where hull fragments are welded into void ram craft.",
  "elysion:Ionia": "Ionia harvest lifts are timed to orbital traffic bells so tithe grain can launch continuously during convoy windows.",
  "elysion:Prax": "Prax militias have converted civilian transit loops into perimeter redoubts to survive the expanding Chaos siege.",
  "kharon:Acher": "Acher siege cells anchor mountain gun-nests with chain-linked bastions carved directly into frostbound escarpments.",
  "kharon:Black Pyre": "Black Pyre black pilgrimages now converge on the Hessicus gate under artillery cover from cult-held grave plains.",
  "mykene:Heliad": "Heliad assault academies train breacher cohorts with live charge discipline before rotation into sector siege battlegroups.",
  "mykene:Anker": "Anker rough rider clans begin mustering seasons with eagle-vision vigils atop terraced mountain shrines.",
  "praxedes:Ruk": "Ruk nomad columns tow mobile fortress segments between canyon fronts to preserve momentum during clan feuds.",
  "praxedes:Morka's Yard": "Morka's Yard breach sectors are measured by wreck-depth markers after repeated Cadian armored assaults.",
  "satrapa:Korin": "Korin tide-harbours are built on chained breakwaters that are rebuilt after every black-hole-driven surge cycle.",
  "satrapa:Harrow Deep": "Harrow Deep gravitic arrays are calibrated against Agamemnon drift signatures before each abyssal survey descent.",
  "ikarion:Astraeum": "Astraeum scholam commandants grade cadets through void-bridge war games mirrored from active sector sieges.",
  "ikarion:Ferron": "Ferron dock-priests sanctify each new escort keel with fragment data from recent convoy interception reports.",
  "barachiel:Vespera": "Vespera shrine-fortresses now fly Sons of Piety banners stitched from seized tithe parchments.",
  "barachiel:Civitas Null": "Civitas Null suppression cordons rotate by senate district to contain dockyard unrest before it spreads hive-wide.",
  "gryphonis:Ragmouth": "Ragmouth invasion docks launch continuous war convoys aimed at Zubzaria's contested drop corridors.",
  "gryphonis:Zubzaria": "Zubzaria psykommando cadres coordinate resistance through encrypted trade-cant run by the Psykommando Commerce Junta.",
};

const buildUniqueFact = (system: StarSystem, world: World) =>
  uniqueFactsByWorld[`${system.id}:${world.knownName}`] ??
  `${world.knownName} maintains hardened dossier protocols adapted to current campaign volatility in ${system.name}.`;

const buildInterdependence = (system: StarSystem, world: World) => {
  if (system.id === "xandros" && world.knownName === "Xandrosia") {
    return "Xandrosia remains under siege and relies on stockpiled oceanic harvest reserves and terraced grain vaults while off-world deliveries collapse into asynchronous Agamemnon windows.";
  }

  if (system.id === "xandros" && world.knownName === "Kryost") {
    return "Kryost is under siege and receives no dependable fresh deliveries, so current garrisons operate on legacy shipments and pre-siege stores transferred in earlier campaign phases.";
  }

  const siblings = system.worlds.filter(
    (candidate) => `${candidate.orbitalDesignation}-${candidate.knownName}` !== `${world.orbitalDesignation}-${world.knownName}`,
  );

  if (siblings.length === 0) {
    return `${world.knownName} operates with near-autarkic logistics in ${system.name}, requesting only intermittent specialist deliveries when local production falls short.`;
  }

  const preferred = siblings.find((candidate) => candidate.classification === "alpha" || candidate.classification === "phi");
  const primaryPartner = preferred ?? siblings[0];
  const secondaryPartner = siblings.length > 1 ? siblings[1] : siblings[0];

  return `${world.knownName} draws regular deliveries from ${primaryPartner.knownName} for ${classRoleLabel[primaryPartner.classification]} and sends ${
    classRoleLabel[world.classification]
  } back toward ${secondaryPartner.knownName}, with fresh supply requests rising whenever convoy windows narrow in ${system.name}.`;
};

const smoothSentence = (value: string) => value.replace(/;\s*/g, ", ");

const resolveOwner = (system: StarSystem, world: World) => world.ownerFaction ?? system.faction;

const buildCommandAuthority = (system: StarSystem, world: World) => {
  if (world.ownerFaction === "Imperium" || (!world.ownerFaction && system.faction === "Imperium")) {
    return world.governor ?? world.imperialRegiment ?? "Imperial command not fully confirmed";
  }

  if (world.ownerFaction === "Chaos" || (!world.ownerFaction && system.faction === "Chaos")) {
    return world.rulingWarband ?? "Traitor warband command unconfirmed";
  }

  if (world.ownerFaction === "Greenskin" || (!world.ownerFaction && system.faction === "Greenskin")) {
    return world.warboss ?? "No dominant warboss identified";
  }

  if (world.ownerFaction === "Xenos") {
    return world.xenosAuthority ?? "Xenos governance conclaves direct planetary resistance";
  }

  if (world.ownerFaction === "Renegade" || (!world.ownerFaction && system.faction === "Renegade")) {
    return world.renegadeCommander ?? "Renegade command hierarchy fragmented";
  }

  return (
    world.governor ??
    world.imperialRegiment ??
    world.rulingWarband ??
    world.warboss ??
    world.renegadeCommander ??
    "Command authority contested between multiple belligerents"
  );
};

const buildConflictState = (world: World) => {
  if (world.underSiege && world.underSedition) {
    return "Active siege and active sedition";
  }

  if (world.underSiege) {
    return "Active siege";
  }

  if (world.underSedition) {
    return "Active sedition";
  }

  return "No formal siege or sedition marker";
};

const buildConflictTheatre = (system: StarSystem, world: World) => {
  const owner = resolveOwner(system, world);
  if (world.underSiege && world.underSedition) {
    return `${world.knownName} is in dual-crisis conditions with open siege fronts and internal sedition dynamics. ${owner} command structures are stretched across simultaneous external assaults and internal insurgent action.`;
  }

  if (world.underSiege) {
    return `${world.knownName} is under active siege. ${owner} forces are prioritizing perimeter hold operations, reinforcement corridors, and attritional counteroffensives.`;
  }

  if (world.underSedition) {
    return `${world.knownName} is under active sedition pressure. ${owner} authorities are conducting suppression, loyalty screening, and militia containment operations.`;
  }

  return `${world.knownName} is not currently marked for formal siege or sedition operations, and security posture remains within expected campaign variance for ${system.name}.`;
};

export const buildPlanetDetailProfile = (system: StarSystem, world: World): PlanetDetailProfile => {
  const classSections = byClassSections[world.classification](system, world);
  const classMetrics = byClassMetrics[world.classification](system, world);
  const uniqueFact = buildUniqueFact(system, world);
  const interdependence = buildInterdependence(system, world);
  const owner = resolveOwner(system, world);
  const titheFulfillment = isTitheNonCompliant(system, world)
    ? "None - tithe channels severed or rejected"
    : "Active under sector covenant";
  const conflictState = buildConflictState(world);
  const commandAuthority = buildCommandAuthority(system, world);
  const conflictTheatre = buildConflictTheatre(system, world);
  const seditionNote =
    world.underSedition && system.id === "tessarion" && world.knownName === "Bracken"
      ? "Sedition risk is severe: holy-war banners mobilize feudal levies while Chaos cult magicks and contracted Sslyth mercenaries intensify attritional field fighting."
      : world.underSedition
        ? "Sedition risk remains active. Shrine rhetoric and militia mobilization are escalating."
        : "No formal sedition marker is active at the latest command update.";

  return {
    infobox: [
      { label: "System", value: system.name },
      { label: "Designation", value: `${system.name} ${world.orbitalDesignation}` },
      { label: "Known Name", value: world.knownName },
      { label: "Population", value: world.population },
      { label: "Climate", value: climateDescriptors[world.climate] },
      { label: "Control", value: owner },
      { label: "Tithe Fulfilment", value: titheFulfillment },
      { label: "Conflict State", value: conflictState },
      { label: "Command Authority", value: commandAuthority },
      { label: "Unique Fact", value: uniqueFact },
    ],
    metrics: [
      ...classMetrics,
      {
        label: "Conflict Posture",
        value: conflictState,
        tone: world.underSiege || world.underSedition ? "danger" : "good",
      },
    ],
    sections: [
      ...classSections,
      {
        title: "Conflict Theatre",
        content: conflictTheatre,
      },
      {
        title: "Logistics Posture",
        content: interdependence,
      },
    ],
    campaignNotes: [
      smoothSentence(world.status),
      `${system.faction} influence in ${system.name} currently tracks at ${system.threat} threat grade.`,
      world.underSiege
        ? "Siege pressure remains active. Defensive lines, artillery exchange, and reinforcement logistics dominate campaign planning."
        : "No formal siege marker is active at the latest command update.",
      smoothSentence(interdependence),
      seditionNote,
    ],
  };
};
