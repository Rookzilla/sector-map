import {
  systems as enSystems,
  worldClassifications as enWorldClassifications,
  type StarSystem,
} from "../en/systems";
import { type WorldClassInfo, type WorldClassKey } from "../../../data/systems";

const translatedText: Record<string, string> = {
  "A fortress lane star anchoring tithe routes, shrine convoys, and munitorum escorts.":
    "Una estrella de corredor fortaleza que ancla rutas de diezmo, convoyes santuario y escoltas del Munitorum.",
  "A border star where Imperial battlegroups and raider fleets clash over jump gates.":
    "Una estrella fronteriza donde grupos de batalla imperiales y flotas saqueadoras chocan por compuertas de salto.",
  "A hardened Imperial bastion centered on hive security and sealed noosphere vaults, anchoring patrol lanes through unstable radiation bands.":
    "Un bastion imperial reforzado centrado en la seguridad de la colmena y en bovedas noosfericas selladas, anclando rutas de patrulla a traves de bandas de radiacion inestables.",
  "A blood-soaked lane star where traitor cruisers emerge from dust veils to raid convoys.":
    "Una estrella de corredor empapada en sangre donde cruceros traidores emergen de velos de polvo para asaltar convoyes.",
  "A grave star with null-zones and sealed vault worlds sought by both Inquisition and raiders.":
    "Una estrella funebre con zonas nulas y mundos-boveda sellados buscados tanto por la Inquisicion como por saqueadores.",
  "A supply-route star overrun by Ork flotillas building scrap fortresses across habitable worlds.":
    "Una estrella de ruta de suministro sobrepasada por flotillas orkas que levantan fortalezas de chatarra en mundos habitables.",
  "A rebel corridor star inside Agamemnon's relativistic fringe, where naval operations desynchronize and causality windows fracture command coherence.":
    "Una estrella de corredor rebelde en el borde relativista de Agamemnon, donde las operaciones navales se desincronizan y ventanas de causalidad fracturan la coherencia de mando.",
  "A watch-star guarding naval approach corridors with layered picket fleets.":
    "Una estrella de vigilancia que protege corredores de aproximacion naval con flotas de piquete en capas.",
  "A trade star at the edge of a dust veil contested by privateer houses.":
    "Una estrella comercial al borde de un velo de polvo disputada por casas corsarias.",
  "A cursed star with recurring warp-echoes and collapsing shrine routes.":
    "Una estrella maldita con ecos disformes recurrentes y rutas santuario colapsadas.",
  "A logistics star that feeds nearby crusade fronts with fuel and shell stock.":
    "Una estrella logistica que abastece frentes de cruzada cercanos con combustible y municion.",
  "A splinter star system ruled by breakaway captains and oathless planetary militias.":
    "Un sistema estelar fracturado gobernado por capitanes secesionistas y milicias planetarias sin juramento.",
  "A sentinel star holding astropath towers and reserve naval docks.":
    "Una estrella centinela que alberga torres astropaticas y diques navales de reserva.",
  "A frontier star where roaming ork fleets test ramshackle gun platforms.":
    "Una estrella fronteriza donde flotas orkas errantes prueban plataformas de artilleria improvisadas.",
  "A breadbasket star whose worlds sustain nearby fortress sectors.":
    "Una estrella granero cuyos mundos sostienen sectores fortaleza cercanos.",
  "A void-lashed star where traitor flotillas replenish from hidden docks.":
    "Una estrella azotada por el vacio donde flotillas traidoras se reabastecen en diques ocultos.",
  "A reserve mustering star with strict fleet discipline and dependable warp tides.":
    "Una estrella de concentracion de reserva con estricta disciplina de flota y mareas disformes fiables.",
  "A polluted star where ork clan docks spread along abandoned station rings.":
    "Una estrella contaminada donde diques de clanes orkos se extienden por anillos de estaciones abandonadas.",
  "A jurisdictional flashpoint where three fleets claim right of passage.":
    "Un punto critico jurisdiccional donde tres flotas reclaman derecho de paso.",
  "A disciplined scholam-and-shipyard star supplying officers and escorts.":
    "Una estrella disciplinada de scholam y astilleros que suministra oficiales y escoltas.",
  "A shrine-rich star where the Sons of Piety have risen in armed sedition after tithe collapse, igniting open war against nearby Imperial worlds.":
    "Una estrella rica en santuarios donde los Hijos de la Piedad se alzaron en sedicion armada tras el colapso del diezmo, desatando guerra abierta contra mundos imperiales cercanos.",
  "An outer-rim star where ork freebooters raid long-haul convoy routes.":
    "Una estrella del borde exterior donde corsarios orkos saquean rutas de convoyes de largo alcance.",

  "K2 Imperial Main Sequence": "K2 Secuencia Principal Imperial",
  "G5 Yellow Dwarf": "G5 Enana Amarilla",
  "M0 Red Giant": "M0 Gigante Roja",
  "F7 White Star": "F7 Estrella Blanca",
  "Collapsed White Dwarf": "Enana Blanca Colapsada",
  "K4 Orange Dwarf": "K4 Enana Naranja",
  "A9 Blue-White Star": "A9 Estrella Azul-Blanca",
  "F2 White Dwarf Pair": "F2 Par de Enanas Blancas",
  "G8 Dwarf": "G8 Enana",
  "M4 Dying Red Star": "M4 Estrella Roja Moribunda",
  "K1 Main Sequence": "K1 Secuencia Principal",
  "G2 Star": "G2 Estrella",
  "F4 Star": "F4 Estrella",
  "M1 Dwarf": "M1 Enana",
  "G3 Star": "G3 Estrella",
  "A7 Star": "A7 Estrella",
  "G1 Star": "G1 Estrella",
  "K8 Dwarf": "K8 Enana",
  "A5 Star": "A5 Estrella",
  "F5 Star": "F5 Estrella",
  "G6 Star": "G6 Estrella",
  "K3 Star": "K3 Estrella",

  "Stable output, low warp bleed": "Produccion estable, baja fuga disforme",
  "Minor flare cycles, tactical concern": "Ciclos menores de fulguracion, preocupacion tactica",
  "Unstable radiation bands": "Bandas de radiacion inestables",
  "Erratic flare bursts, warp harmonics detected": "Estallidos de fulguracion erraticos, armonicas disformes detectadas",
  "Severe gravitic distortion": "Distorsion gravitica severa",
  "Stable but dust-obscured": "Estable pero oscurecida por polvo",
  "Relativistic tidal distortion and intermittent radiation storms": "Distorsion de marea relativista y tormentas de radiacion intermitentes",
  "Stable dual-output": "Salida dual estable",
  "Stable with particulate eclipses": "Estable con eclipses particulados",
  "Terminal instability": "Inestabilidad terminal",
  Stable: "Estable",
  "Moderate flare activity": "Actividad de fulguracion moderada",
  Excellent: "Excelente",
  Turbulent: "Turbulento",
  "Radiant but stable": "Radiante pero estable",

  "Primary navigational beacon for nearby Imperial shipping lanes.":
    "Baliza de navegacion primaria para rutas de transporte imperial cercanas.",
  "Astropathic choir traffic spikes before every major engagement window.":
    "El trafico de coros astropaticos se dispara antes de cada gran ventana de combate.",
  "Storm-lantern beacons and orbital noosphere sentries track hostile incursions along the outer lanes.":
    "Balizas de farol tormenta y centinelas noosfericos orbitales rastrean incursiones hostiles en las rutas exteriores.",
  "Long-range augurs detect recurring daemon-sign over the inner belt.":
    "Auspex de largo alcance detectan signos demoniacos recurrentes sobre el cinturon interior.",
  "Chronometric drift makes standard cartography unreliable.":
    "La deriva cronometrica vuelve poco fiable la cartografia estandar.",
  "Pict-feeds show ramshackle dockyards multiplying each cycle.":
    "Los pict-registros muestran astilleros improvisados multiplicandose cada ciclo.",
  "Imperial campaign logs in this system return out of phase, with operations begun in one century resolving in another.":
    "Los registros de campana imperiales de este sistema regresan fuera de fase, con operaciones iniciadas en un siglo y resueltas en otro.",
  "Psykana beacons here are used to calibrate long-range astropath relays.":
    "Las balizas psykana aqui se usan para calibrar relevos astropaticos de largo alcance.",
  "Long-duration scans show hidden docks moving within the veil.":
    "Escaneos de larga duracion muestran diques ocultos moviendose dentro del velo.",
  "Every seventh cycle, choir-vox returns unknown liturgies.":
    "Cada septimo ciclo, el coro-vox devuelve liturgias desconocidas.",
  "Munitorum records show repeated requisition spikes ahead of campaigns.":
    "Registros del Munitorum muestran picos repetidos de requisicion antes de las campanas.",
  "Forgery-grade astropath seals circulate from this system.":
    "Sellos astropaticos de calidad falsificacion circulan desde este sistema.",
  "Segmentum command uses this system as a rally point for relief fleets.":
    "El mando de Segmentum usa este sistema como punto de reunion para flotas de socorro.",
  "Wreck fields around the inner belt grow by the week.": "Los campos de restos alrededor del cinturon interior crecen cada semana.",
  "Imperial crop futures from this system influence sector logistics planning.":
    "Los futuros de cosecha imperiales de este sistema influyen en la planificacion logistica del sector.",
  "Warp static here causes frequent auspex ghost readings.":
    "La estatica disforme aqui provoca lecturas fantasma frecuentes en auspex.",
  "Long-haul convoys use this star as their final armament stop.":
    "Los convoyes de largo recorrido usan esta estrella como ultima parada de armamento.",
  "Captured augur buoys report constant scrap-hauler traffic.":
    "Boyas augur capturadas informan trafico constante de cargueros de chatarra.",
  "No two charts agree on local hazard gradients.": "Ninguna dos cartas coincide sobre gradientes de riesgo locales.",
  "Officer cadet flotillas drill in high orbit every cycle.": "Flotillas de cadetes oficiales maniobran en orbita alta cada ciclo.",
  "Interrogator reports suggest Chaos agents have infiltrated the Sons of Piety command echelons.":
    "Informes de interrogadores sugieren que agentes del Caos han infiltrado los escalones de mando de los Hijos de la Piedad.",
  "Long-range scanners record dense scrap fields in every high orbit.":
    "Escaneres de largo alcance registran campos densos de chatarra en cada orbita alta.",

  "Macro-cannon and armored chassis production exceeds sector quota.":
    "La produccion de macrocanones y chasis acorazados supera la cuota del sector.",
  "Infernus strip-mines and magma-shaft drills feed adamant ore into Helion Gate manufactoria under strict Imperial convoy guard.":
    "Las minas a cielo abierto y perforaciones de magma de Infernus alimentan de mineral de adamantio las manufactorias de Helion Gate bajo estricta escolta imperial.",
  "Underhive purges continue after discovery of a heretek signal lattice.":
    "Las purgas del subcolmena continúan tras descubrirse una reticula de senal hereje-tecnologica.",
  "Orbital bastions are trading fire daily after Karsis was defiled by Chaos, and the world now serves as the primary siege mustering point for reclamation campaigns.":
    "Los bastiones orbitales intercambian fuego a diario despues de que Karsis fuera profanado por el Caos, y el mundo ahora sirve como principal punto de concentracion de asedio para campanas de recuperacion.",
  "Once a shrine world, Karsis has been defiled by Chaos and is now under siege by Imperial task forces attempting to reclaim its reliquaries.":
    "Antes mundo santuario, Karsis ha sido profanado por el Caos y ahora esta bajo asedio de fuerzas de tarea imperiales que intentan recuperar sus relicarios.",
  "Hive spires run strict curfews following sabotage in lower transit sectors.":
    "Las agujas colmena mantienen toques de queda estrictos tras sabotajes en sectores inferiores de transito.",
  "Vault lockdown after noosphere contamination from unknown source.":
    "Bovedas en cierre total tras contaminacion noosferica de origen desconocido.",
  "Mine shafts and trench networks are engulfed in huge armored battles as Imperial tank columns launched from Orpheon force repeated breach assaults into Chaos-held bastions.":
    "Galerias mineras y redes de trincheras quedan envueltas en enormes batallas acorazadas mientras columnas de tanques imperiales lanzadas desde Orpheon fuerzan asaltos de brecha repetidos sobre bastiones del Caos.",
  "Civilian enclaves endure nightly warp storms and mass possession events.":
    "Enclaves civiles soportan tormentas disformes nocturnas y eventos de posesion masiva.",
  "Sepulcrum holds the mausoleum-plex of Saint Arkonidas the True, and the Sepulcrum Watch repeatedly faces down Ork loota raids and Chaos daemon incursions near the sanctified vault approaches.":
    "Sepulcrum alberga el complejo-mausoleo de San Arkonidas el Verdadero, y la Guardia de Sepulcrum repele repetidas incursiones de saqueadores orkos y demonios del Caos cerca de los accesos a bovedas santificadas.",
  "Under active Ork siege as warbands descend to battle daemonic hosts across Tenebra's wastes; unusual warp activity has opened a gate that endlessly spawns hell-bent Bloodletters of Khorne, yet the Orks keep charging in for a worthy fight.":
    "Bajo asedio orko activo mientras bandas de guerra descienden para combatir huestes demoniacas por los yermos de Tenebra; actividad disforme inusual ha abierto una puerta que engendra sin fin Desangradores de Khorne, pero los orkos siguen cargando en busca de una pelea digna.",
  "Planetary foundries now produce improvised armor for Greenskin warbands.":
    "Las fundiciones planetarias ahora producen armadura improvisada para bandas de guerra pielverde.",
  "A derelict ancient hive world locked in crashing tides of Greenskin territorial conquest over buried hive treasures; over centuries the ecumenopolis has surrendered to the wastes, with greenery, brush, and shrub choking its ruins, and brave explorers still attempt to plunder archeotech hidden in its dead vaults.":
    "Un antiguo mundo colmena en ruinas atrapado en mareas de conquista territorial pielverde sobre tesoros colmena enterrados; durante siglos la ecumenopolis se ha rendido a los yermos, con vegetacion y matorral ahogando sus ruinas, y aun asi exploradores valientes intentan saquear arqueotecnologia oculta en sus bovedas muertas.",
  "A temperate ocean-rich agri world beyond Imperial architecture, defined by terraced farmlands, salt-reactor cities, and integrated civic industry, ruled by the Basileus and currently under active Imperial siege that repeatedly falls out of phase near Agamemnon.":
    "Un mundo agrario templado y rico en oceanos, mas alla de la arquitectura imperial, definido por campos en terrazas, ciudades de reactores salinos e industria civica integrada, gobernado por el Basileus y actualmente bajo asedio imperial activo que cae repetidamente fuera de fase cerca de Agamemnon.",
  "A cold dead world locked in near-absolute-zero conditions, now under siege as hardened trench lines are contested by Basileus loyalists and Imperial assault cadres in relentless ice warfare.":
    "Un mundo muerto y frio en condiciones cercanas al cero absoluto, ahora bajo asedio mientras lineas de trincheras reforzadas son disputadas por lealistas del Basileus y cuadros de asalto imperiales en una guerra de hielo implacable.",
  "Knightly households feud over charter rights while obeying tithe law.":
    "Casas de caballeria rivalizan por derechos de carta mientras obedecen la ley de diezmo.",
  "Grain convoys now move under escort after repeated voidborne thefts.":
    "Los convoyes de grano ahora se mueven con escolta tras repetidos robos en el vacio.",
  "Open sedition followed a mass uprising that handed power back to the populace; ganger syndicates now rule under the self-proclaimed Senator Hargreave, have renounced Imperial faith, and attract waves of hereteks practicing unchecked machine science and the worst excesses of technological innovation.":
    "Una sedicion abierta siguio a un levantamiento masivo que devolvio el poder a la poblacion; sindicatos de pandilleros gobiernan ahora bajo el autoproclamado Senador Hargreave, han renunciado a la fe imperial y atraen oleadas de herejes-tecnologicos que practican ciencia de maquina sin control y los peores excesos de innovacion.",
  "Survey stations map unusual gravitic wakes beneath abyssal basins.":
    "Estaciones de sondeo cartografian estelas graviticas inusuales bajo cuencas abisales.",
  "Pilgrim roads are lined with charred reliquaries and daemon marks.":
    "Los caminos de peregrinos estan bordeados de relicarios calcinados y marcas demoniacas.",
  "Catacomb vaults are occupied by chanting warbands.":
    "Bovedas catacumba estan ocupadas por bandas de guerra que cantan letanias.",
  "Tank hull assembly lines run without pause under priesthood supervision.":
    "Las lineas de ensamblaje de cascos de tanque operan sin pausa bajo supervision sacerdotal.",
  "Food levies expanded to support three neighboring war zones.":
    "Se ampliaron las levas de alimentos para sostener tres zonas de guerra vecinas.",
  "Governor-palaces are fortified by mercenary regiments.":
    "Los palacios del gobernador estan fortificados por regimientos mercenarios.",
  "A feudal world in the clutches of a declared holy war: seditionist hosts battle Chaos-affiliated cults practicing magicks, renegade rulers have hired Sslyth mercenaries, and paltry Imperial regiment detachments can only reinforce vast sword-and-axe field battles.":
    "Un mundo feudal en las garras de una guerra santa declarada: huestes sedicionistas combaten cultos afiliados al Caos que practican magias, gobernantes renegados han contratado mercenarios Sslyth, y pequeños destacamentos imperiales solo pueden reforzar enormes batallas campales de espada y hacha.",
  "Polar laboratories test anti-void shielding for convoy escorts.":
    "Laboratorios polares prueban blindaje antivial para escoltas de convoyes.",
  "Vast rice fields, swamps, and swelling river plains feed a disciplined agri economy, while chapter-wardens of the Jade Falcons, a White Scars successor chapter, oversee fast-response defense and weather operations that leave the world prone to natural disasters.":
    "Vastos arrozales, pantanos y llanuras fluviales crecientes alimentan una economia agraria disciplinada, mientras los guardianes de capitulo de los Halcones de Jade, sucesores de Cicatrices Blancas, supervisan defensa de respuesta rapida y operaciones climaticas que dejan al mundo propenso a desastres naturales.",
  "Mountain ranges are carved into giant gun emplacements.":
    "Cordilleras montanosas han sido talladas en gigantescas posiciones de artilleria.",
  "Abandoned manufactoria converted into ork mek forges.": "Manufactoria abandonadas convertidas en forjas mek orkas.",
  "Harvest orbital lifts run around the clock.": "Elevadores orbitales de cosecha operan las 24 horas.",
  "Chaos warbands have escalated raider probes into a full siege, with Prax's civil defense networks and line infantry holding shrinking perimeter zones.":
    "Bandas de guerra del Caos han escalado incursiones a un asedio total, con redes de defensa civil e infanteria de linea de Prax sosteniendo perimetros cada vez mas reducidos.",
  "Mountain redoubts are controlled by apostate siege cells.": "Reductos de montana estan controlados por celulas de asedio apostatas.",
  "Mass grave plains host profane rituals as Ordo Malleus observers report repeated daemonic incursions; the Hessicus daemon gate spews forth unwitting horrors and draws black pilgrimages, marking Black Pyre as the center of Chaos in the Cowled Abyss.":
    "Llanuras de fosas comunes albergan rituales profanos mientras observadores del Ordo Malleus reportan incursiones demoniacas repetidas; la puerta demoniaca de Hessicus vomita horrores sin fin y atrae peregrinaciones negras, marcando a Black Pyre como el centro del Caos en el Abismo Encapuchado.",
  "The jewel of the Eastern Abyss, Heliad's colossal hive forges and barracks churn out hundreds of explosive-equipped infantry regiments; the 17th Heliad Grenadiers are lent to siege fronts across the sector, often deployed alongside rough rider cavalry from Anker.":
    "La joya del Abismo Oriental, las colosales forjas-colmena y barracones de Heliad producen cientos de regimientos de infanteria equipados con explosivos; los Granaderos 17 de Heliad se ceden a frentes de asedio por todo el sector, a menudo junto a caballeria rough rider de Anker.",
  "A forested mountain world of terraced succulent-fruit farming that breeds a dour, hardy feudal warrior culture; its rough rider hosts answer both Imperial tithe and a secondary prophet-god cult, believing the Emperor grants visions in the form of a giant eagle.":
    "Un mundo montanoso boscoso de cultivo en terrazas de frutas suculentas que forja una cultura guerrera feudal austera y resistente; sus huestes rough rider obedecen tanto al diezmo imperial como a un culto secundario del dios profeta, creyendo que el Emperador concede visiones en forma de aguila gigante.",
  "Nomad warbands carve rolling fortresses into canyon routes.":
    "Bandas de guerra nomadas tallan fortalezas rodantes a lo largo de rutas de canones.",
  "An Ork-occupied former Imperial forge world now under active Imperial siege to reclaim lost technology, with the Cadian 16th and Cadian 448th Armoured spearheading breach assaults on captured dock-forges.":
    "Un antiguo mundo forja imperial ocupado por orkos, ahora bajo asedio imperial activo para recuperar tecnologia perdida, con la 16 de Cadia y la 448 Acorazada de Cadia encabezando asaltos de brecha sobre diques-forja capturados.",
  "An ork pirate world and major Freebooterz haven where docks and raider coves feed a mighty naval Waaagh; immense tidal activity from the nearby black hole batters its archipelagos, and its savage pirate lord Madsplasha is famed for felling the planet's giant squid.":
    "Un mundo pirata orko y gran refugio Freebooterz donde diques y calas saqueadoras alimentan un poderoso Waaagh naval; la inmensa actividad de mareas del agujero negro cercano golpea sus archipielagos, y su salvaje senor pirata Madsplasha es famoso por abatir los calamares gigantes del planeta.",
  "Survey arrays study gravitic shear near Agamemnon's pull.":
    "Matrices de sondeo estudian cizalladura gravitica cerca de la atraccion de Agamemnon.",
  "Schola bastions expand their tactical simulation networks.":
    "Bastiones Schola amplian sus redes de simulacion tactica.",
  "Escort frigate assembly quotas are doubled this quarter.":
    "Las cuotas de ensamblaje de fragatas de escolta se duplican este trimestre.",
  "A reliquary world under nominal Imperial ownership; after tithe demands broke the shrine clans, the Sons of Piety seized catacomb bastions and now wage a dogmatic war while suspected Chaos infiltrators fan the conflict.":
    "Un mundo relicario bajo propiedad imperial nominal; tras romperse los clanes santuario por exigencias de diezmo, los Hijos de la Piedad tomaron bastiones catacumba y ahora libran una guerra dogmatica mientras presuntos infiltrados del Caos avivan el conflicto.",
  "Planetary senate fractured after dockworker uprisings.":
    "El senado planetario se fracturo tras levantamientos de obreros portuarios.",
  "Nomad war camps and scrap-harbours stage massive invasion fleets bound for Zubzaria.":
    "Campamentos de guerra nomadas y puertos de chatarra preparan flotas de invasion masivas con destino a Zubzaria.",
  "A low-population prison world administered by Colonel Isinkov, where penal citadels and whiteout storms make escape and landing equally lethal.":
    "Un mundo-prision de baja poblacion administrado por el Coronel Isinkov, donde ciudadelas penales y tormentas blancas hacen que escapar y aterrizar sean igual de letales.",
  "A tiny smuggler ice world run by Feltz and his crew as a stowaway haven; ferocious storm bands sheath the planet, and any attempted landing is near-folly.":
    "Un pequeno mundo de hielo de contrabandistas dirigido por Feltz y su tripulacion como refugio de polizones; feroces bandas de tormenta envuelven el planeta y cualquier intento de aterrizaje roza la locura.",
  "A death world inhabited by the Zubzarians, four-armed lilac-skinned warrior clans whose elite genome psycommandos contest invading Waaagh columns at every turn; deadly fauna, toxic cloud belts, and sentient lightning storms ravage both sides, plasma fire burns mountain ranges of the dead each day, and the guns never fall silent.":
    "Un mundo letal habitado por los Zubzarianos, clanes guerreros de piel lila y cuatro brazos cuyos psicomandos de elite combaten columnas invasoras Waaagh en cada frente; fauna mortal, cinturones de nubes toxicas y tormentas electricas conscientes devastan a ambos bandos, el fuego plasma quema cordilleras de muertos cada dia y las armas nunca callan.",
};

const translate = (value: string | undefined) => {
  if (!value) {
    return value;
  }

  return translatedText[value] ?? value.replace("billion years", "mil millones de anos");
};

export const systems: StarSystem[] = enSystems.map((system) => ({
  ...system,
  summary: translate(system.summary) ?? system.summary,
  starClass: translate(system.starClass) ?? system.starClass,
  starAge: translate(system.starAge) ?? system.starAge,
  stability: translate(system.stability) ?? system.stability,
  astralNote: translate(system.astralNote) ?? system.astralNote,
  worlds: system.worlds.map((world) => ({
    ...world,
    status: translate(world.status) ?? world.status,
    dossierUniqueFact: translate(world.dossierUniqueFact),
    dossierInterdependence: translate(world.dossierInterdependence),
    dossierSeditionNote: translate(world.dossierSeditionNote),
  })),
}));

export const worldClassifications: Record<WorldClassKey, WorldClassInfo> = {
  ...enWorldClassifications,
  alpha: { ...enWorldClassifications.alpha, title: "Mundo Agrario", short: "Alfa" },
  gamma: { ...enWorldClassifications.gamma, title: "Mundo Civilizado", short: "Gamma" },
  delta: { ...enWorldClassifications.delta, title: "Mundo Muerto", short: "Delta" },
  deltaTau: { ...enWorldClassifications.deltaTau, title: "Mundo Letal", short: "Delta Tau" },
  epsilon: { ...enWorldClassifications.epsilon, title: "Mundo Cementerio", short: "Epsilon" },
  eta: { ...enWorldClassifications.eta, title: "Mundo Colmena", short: "Eta" },
  mu: { ...enWorldClassifications.mu, title: "Mundo Feudal", short: "Mu" },
  rho: { ...enWorldClassifications.rho, title: "Estacion de Investigacion", short: "Rho" },
  phi: { ...enWorldClassifications.phi, title: "Mundo Forja", short: "Phi" },
  phiLambda: { ...enWorldClassifications.phiLambda, title: "Mundo Feral", short: "Phi Lambda" },
};
