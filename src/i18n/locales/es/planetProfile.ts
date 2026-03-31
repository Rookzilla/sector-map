import { type BuildPlanetDetailProfileFn } from "../../../common/lore/planetProfile";
import { type Climate, type StarSystem, type World, type WorldClassKey } from "../../../data/systems";

type MetricTone = "neutral" | "good" | "warn" | "danger";

type PlanetMetric = {
  label: string;
  value: string;
  tone?: MetricTone;
};

type PlanetSection = {
  title: string;
  content: string;
};

type PlanetDetailProfile = {
  infobox: Array<{ label: string; value: string }>;
  metrics: PlanetMetric[];
  sections: PlanetSection[];
  campaignNotes: string[];
};

const classRoleLabel: Record<WorldClassKey, string> = {
  alpha: "excedente agrario",
  gamma: "manufactura civil",
  delta: "extraccion de recursos",
  deltaTau: "interdiccion de riesgo",
  epsilon: "custodia de peregrinos",
  eta: "capacidad laboral de colmena",
  mu: "reclutamiento de levas",
  rho: "salidas de investigacion",
  phi: "produccion de forja",
  phiLambda: "mano de obra de frontera",
};

const climateDescriptors: Record<Climate, string> = {
  Temperate: "Franjas climaticas moderadas y ciclos agrarios estables",
  Arcapelago: "Cadenas de islas fragmentadas conectadas por rutas navales",
  Ocean: "Cuencas oceanicas globales con mesetas continentales dispersas",
  Forest: "Doseles de biomasa densa y zonas madereras en disputa",
  Tundra: "Mesetas frias y corredores logisticos sobre permafrost",
  Ice: "Frentes criogenicos con presion glacial permanente",
  Desert: "Plataformas aridas con nucleos poblacionales dependientes de agua",
  Savannah: "Grandes praderas aptas para asentamiento masivo y ganaderia",
  Barren: "Geologias pobres en recursos y biosfera hostil",
  "No Atmosphere": "Condiciones de vacio con habitacion sellada",
};

const isTitheNonCompliant = (system: StarSystem, world: World) => {
  const owner = world.ownerFaction ?? system.faction;
  return owner === "Chaos" || owner === "Renegade";
};

const resolveOwner = (system: StarSystem, world: World) => world.ownerFaction ?? system.faction;

const byClassMetrics: Record<WorldClassKey, (system: StarSystem, world: World) => PlanetMetric[]> = {
  alpha: (system, world) => [
    {
      label: "Rendimiento del Diezmo",
      value: isTitheNonCompliant(system, world) ? "0% - sin cumplimiento de diezmo imperial" : "87% de cumplimiento de pacto",
      tone: isTitheNonCompliant(system, world) ? "danger" : "warn",
    },
    { label: "Estabilidad de Cosecha", value: "Fragil al clima pero productiva", tone: "neutral" },
    { label: "Convoyes de Alimentos", value: "Demanda de escolta por encima de la linea base", tone: "warn" },
    { label: "Cumplimiento Civil", value: world.underSedition ? "Fragmentado" : "Estable", tone: world.underSedition ? "danger" : "good" },
  ],
  gamma: () => [
    { label: "Densidad Urbana", value: "Alta concentracion metropolitana", tone: "neutral" },
    { label: "Orden Civico", value: "Gestionado por autoridad de distrito en capas", tone: "good" },
    { label: "Rendimiento Industrial", value: "Perfil exportador autosostenido", tone: "good" },
    { label: "Potencial de Disturbio", value: "Focos laborales localizados", tone: "warn" },
  ],
  delta: () => [
    { label: "Habitabilidad", value: "Marginal", tone: "danger" },
    { label: "Valor de Recursos", value: "Solo asentamientos orientados a extraccion", tone: "neutral" },
    { label: "Riesgo de Superficie", value: "Desgaste ambiental extremo", tone: "danger" },
    { label: "Costo Logistico", value: "Alta dependencia de importaciones", tone: "warn" },
  ],
  deltaTau: () => [
    { label: "Indice de Supervivencia", value: "Por debajo del umbral sancionado", tone: "danger" },
    { label: "Riesgo de Depredacion", value: "Biosfera hostil persistente", tone: "danger" },
    { label: "Perdidas de Expedicion", value: "Desgaste cronico", tone: "warn" },
    { label: "Utilidad Militar", value: "Entorno de endurecimiento de veteranos", tone: "good" },
  ],
  epsilon: () => [
    { label: "Capacidad de Inhumacion", value: "Escala de necropolis planetaria", tone: "neutral" },
    { label: "Flujo de Peregrinos", value: "Picos estacionales", tone: "warn" },
    { label: "Integridad de Relicarios", value: "Supervisada bajo canon estricto", tone: "good" },
    { label: "Actividad Sectaria", value: "Sectas marginales bajo vigilancia", tone: "warn" },
  ],
  eta: () => [
    { label: "Carga de Niveles Colmena", value: "Sobrecapacidad en niveles inferiores", tone: "warn" },
    { label: "Alcance de Enforcers", value: "Fuerte en corredores de colmena superior", tone: "good" },
    { label: "Produccion Manufactoria", value: "Continua", tone: "good" },
    { label: "Volatilidad Subcolmena", value: "En escalada", tone: "danger" },
  ],
  mu: (_system, world) => [
    {
      label: "Base Tecnologica",
      value: world.knownName === "Bracken" ? "Feudal con importacion limitada de armas de fuera del mundo" : "Preindustrial",
      tone: "neutral",
    },
    {
      label: "Cohesion Nobiliaria",
      value: world.underSedition ? "Fracturada en casas cruzadas rivales" : "Rivalidad de clanes con cumplimiento de diezmo",
      tone: world.underSedition ? "danger" : "warn",
    },
    {
      label: "Preparacion de Levas",
      value: world.knownName === "Bracken" ? "Levas masivas de espada y hacha en campo abierto" : "Levas de infanteria fiables",
      tone: world.knownName === "Bracken" ? "warn" : "good",
    },
    {
      label: "Deriva Cultural",
      value: world.knownName === "Bracken" ? "Se expanden magias de cultos del Caos y ritos hereticos de santuario" : "Alta variacion doctrinal local",
      tone: world.knownName === "Bracken" ? "danger" : "warn",
    },
  ],
  rho: () => [
    { label: "Prioridad de Investigacion", value: "Estrategica", tone: "good" },
    { label: "Seguridad de Datos", value: "Restringida por ordenes del Magos", tone: "good" },
    { label: "Exposicion a Anomalias", value: "Elevada", tone: "warn" },
    { label: "Supervivencia del Personal", value: "Dependiente de mision", tone: "warn" },
  ],
  phi: () => [
    { label: "Rendimiento de Forja", value: "Optimizado para material belico", tone: "good" },
    { label: "Tiempo Operativo del Reactor", value: "Ciclos de maquina sagrados estables", tone: "good" },
    { label: "Entrada de Materiales", value: "Sensible a convoyes", tone: "warn" },
    { label: "Integridad Noosferica", value: "Intentos de intrusion detectados", tone: "danger" },
  ],
  phiLambda: () => [
    { label: "Cohesion Tribal", value: "Bandas de guerra fragmentadas", tone: "warn" },
    { label: "Indice Tecnologico", value: "Primitivo", tone: "neutral" },
    { label: "Carga de Pacificacion", value: "Alta", tone: "danger" },
    { label: "Potencial de Reclutamiento", value: "Poblacion fisicamente resistente", tone: "good" },
  ],
};

const byClassSections: Record<WorldClassKey, (system: StarSystem, world: World) => PlanetSection[]> = {
  alpha: (system, world) => [
    { title: "Vision General", content: `${world.knownName} esta catalogado como Mundo Agrario con grandes fincas mecanizadas y graneros de exportacion.` },
    { title: "Economia Agraria", content: "El procesamiento de cultivos combina plataformas mecanizadas, bloques laborales y ventanas de convoy orbital." },
    {
      title: "Situacion Politica",
      content: world.underSedition
        ? "Consejos de santuario rurales y capitanes de milicia disputan autoridad legitima mientras la disciplina de suministro se degrada."
        : "La administracion local mantiene cuotas de cosecha mediante tribunales de capilla y registros de graneros.",
    },
  ],
  gamma: (system, world) => [
    { title: "Vision General", content: `${world.knownName} es un Mundo Civilizado con industria diversificada, urbanizacion amplia y gobernanza civica en capas.` },
    {
      title: "Sociedad",
      content:
        system.faction === "Greenskin"
          ? "Distritos civicos previos fueron fracturados en zonas fortificadas de chatarra para produccion de guerra."
          : "Los nucleos poblacionales se organizan por gremios, cartas laborales y milicias de respuesta rapida.",
    },
    { title: "Seguridad", content: "La respuesta a amenazas combina aduanas orbitales, redes de arbitros y movilizacion contractual." },
  ],
  delta: (_system, world) => [
    { title: "Vision General", content: `${world.knownName} es reconocido como Mundo Muerto, mantenido por valor estrategico y extraccion.` },
    { title: "Condiciones de Superficie", content: "Inestabilidad atmosferica y esterilidad ambiental imponen alta carga de mantenimiento." },
    { title: "Funcion Estrategica", content: "Su valor se mide en recursos recuperables, control de rutas y operaciones de negacion." },
  ],
  deltaTau: (_system, world) => [
    { title: "Vision General", content: `${world.knownName} esta designado como Mundo Letal por factores ambientales hostiles persistentes.` },
    { title: "Amenazas Ecologicas", content: "Fauna agresiva, terreno letal y violencia climatica son restricciones operativas permanentes." },
    { title: "Relevancia Militar", content: "Pese al desgaste catastrofico, estas campanas producen formaciones veteranas endurecidas." },
  ],
  epsilon: (system, world) => [
    { title: "Vision General", content: `${world.knownName} se mantiene como Mundo Cementerio, dominado por complejos relicarios y catacumbas.` },
    {
      title: "Peregrinacion y Canon",
      content:
        system.faction === "Chaos"
          ? "Bovedas funerarias profanadas y reconvertidas para ritos de guerra cultista."
          : "Procesiones de peregrinos regulan acceso a bovedas santificadas bajo auditorias doctrinales.",
    },
    { title: "Tensiones Actuales", content: "Politica funeraria, custodia de santuarios y rivalidad sectaria condicionan la seguridad local." },
  ],
  eta: (_system, world) => [
    { title: "Vision General", content: `${world.knownName} se clasifica como Mundo Colmena de habitacion megaestructural y estratos socioeconomicos.` },
    { title: "Estructura Poblacional", content: "Administraciones superiores controlan comercio y ordenanzas; niveles bajos sostienen manufactura y reclutamiento." },
    { title: "Perfil de Conflicto", content: "Guerras de faccion subcolmena y cadenas de logistica negra siguen siendo desestabilizadores cronicos." },
  ],
  mu: (_system, world) => [
    { title: "Vision General", content: `${world.knownName} es un Mundo Feudal de baja tecnologia con autoridad en casas hereditarias.` },
    { title: "Gobernanza", content: world.knownName === "Bracken" ? "La guerra santa declarada enfrenta casas juramentadas, cultos del Caos y cuadros mercenarios Sslyth." : "Las levas de juramento se elevan por compactos nobiliarios y ritos marciales." },
    { title: "Utilidad Militar", content: "Levas numerosas y resistentes, habitualmente dependientes de mando externo para operaciones modernas." },
  ],
  rho: (_system, world) => [
    { title: "Vision General", content: `${world.knownName} funciona como Estacion de Investigacion para experimentacion restringida y recuperacion de datos estrategicos.` },
    { title: "Protocolos Operativos", content: "Control de acceso severo, equipos compartimentados y cuarentenas duras frente a hallazgos anomalos." },
    { title: "Impacto Estrategico", content: "Sus resultados influyen doctrina de flota, adaptacion de armas y planificacion de campana." },
  ],
  phi: (_system, world) => [
    { title: "Vision General", content: `${world.knownName} es un Mundo Forja donde teologia industrial y produccion de guerra dictan prioridades civicas.` },
    { title: "Doctrina de Manufactura", content: "La salida se optimiza para cadenas de adquisicion militar bajo ritos sincronos del Culto de la Maquina." },
    { title: "Postura de Seguridad", content: "Forjas criticas protegidas por cohortes en capas y pantallas de interdiccion orbital." },
  ],
  phiLambda: (system, world) => [
    { title: "Vision General", content: `${world.knownName} esta designado como Mundo Feral de poblaciones tribales descentralizadas y tecnologia minima.` },
    {
      title: "Orden Social",
      content:
        system.faction === "Greenskin"
          ? "El poder se negocia por autoridad de kaudillos, alianzas de chatarra y ciclos rituales de combate."
          : "El poder se negocia por jefaturas de guerra, alianzas de clan y combate ritual.",
    },
    { title: "Interes Imperial", content: "El mundo se vigila por potencial de reclutamiento, riesgo de incumplimiento y vectores cultistas emergentes." },
  ],
};

const buildUniqueFact = (system: StarSystem, world: World) =>
  world.dossierUniqueFact ??
  `${world.knownName} mantiene protocolos de compartimentacion y contrainteligencia adaptados a la volatilidad de campana en ${system.name}.`;

const buildInterdependence = (system: StarSystem, world: World) => {
  if (world.dossierInterdependence) {
    return world.dossierInterdependence;
  }

  if (system.id === "xandros" && world.knownName === "Xandrosia") {
    return "Xandrosia sigue bajo asedio y depende de reservas oceanicas y bovedas agrarias en terrazas mientras colapsan las entregas exteriores.";
  }

  if (system.id === "xandros" && world.knownName === "Kryost") {
    return "Kryost continua bajo asedio y opera con envios heredados y reservas anteriores a la fase actual de campana.";
  }

  const siblings = system.worlds.filter(
    (candidate) => `${candidate.orbitalDesignation}-${candidate.knownName}` !== `${world.orbitalDesignation}-${world.knownName}`,
  );

  if (siblings.length === 0) {
    return `${world.knownName} opera con logistica casi autarquica en ${system.name}, solicitando solo entregas especializadas intermitentes.`;
  }

  const preferred = siblings.find((candidate) => candidate.classification === "alpha" || candidate.classification === "phi");
  const primaryPartner = preferred ?? siblings[0];
  const secondaryPartner = siblings.length > 1 ? siblings[1] : siblings[0];

  return `${world.knownName} recibe entregas regulares de ${primaryPartner.knownName} para ${classRoleLabel[primaryPartner.classification]} y envia ${classRoleLabel[world.classification]} hacia ${secondaryPartner.knownName}, con solicitudes crecientes cuando se estrechan las ventanas de convoy en ${system.name}.`;
};

const buildCommandAuthority = (system: StarSystem, world: World) => {
  if (world.ownerFaction === "Imperium" || (!world.ownerFaction && system.faction === "Imperium")) {
    return world.governor ?? world.imperialRegiment ?? "Mando imperial no confirmado";
  }

  if (world.ownerFaction === "Chaos" || (!world.ownerFaction && system.faction === "Chaos")) {
    return world.rulingWarband ?? "Mando de banda traidora sin confirmar";
  }

  if (world.ownerFaction === "Greenskin" || (!world.ownerFaction && system.faction === "Greenskin")) {
    return world.warboss ?? "No se identifica kaudillo dominante";
  }

  if (world.ownerFaction === "Xenos") {
    return world.xenosAuthority ?? "Conclave xenos de mando no confirmado";
  }

  if (world.ownerFaction === "Renegade" || (!world.ownerFaction && system.faction === "Renegade")) {
    return world.renegadeCommander ?? "Jerarquia de mando renegada fragmentada";
  }

  return "Autoridad de mando disputada entre beligerantes";
};

const buildConflictState = (world: World) => {
  if (world.underSiege && world.underSedition) {
    return "Asedio activo y sedicion activa";
  }

  if (world.underSiege) {
    return "Asedio activo";
  }

  if (world.underSedition) {
    return "Sedicion activa";
  }

  return "Sin marcador formal de asedio o sedicion";
};

const buildConflictTheatre = (system: StarSystem, world: World) => {
  const owner = resolveOwner(system, world);

  if (world.underSiege && world.underSedition) {
    return `${world.knownName} se encuentra en crisis dual con frentes de asedio abiertos y dinamicas internas de sedicion. Las estructuras de mando de ${owner} estan tensionadas por amenazas externas e insurgencia interna simultaneas.`;
  }

  if (world.underSiege) {
    return `${world.knownName} esta bajo asedio activo. Las fuerzas de ${owner} priorizan sostenimiento perimetral, corredores de refuerzo y contraofensivas de desgaste.`;
  }

  if (world.underSedition) {
    return `${world.knownName} esta bajo presion de sedicion activa. Las autoridades de ${owner} ejecutan supresion, cribado de lealtad y contencion de milicias.`;
  }

  return `${world.knownName} no presenta marcador formal de asedio o sedicion y su postura de seguridad se mantiene dentro de la variacion esperada de campana para ${system.name}.`;
};

export const buildPlanetDetailProfile: BuildPlanetDetailProfileFn = (system, world): PlanetDetailProfile => {
  const classSections = byClassSections[world.classification](system, world);
  const classMetrics = byClassMetrics[world.classification](system, world);
  const uniqueFact = buildUniqueFact(system, world);
  const interdependence = buildInterdependence(system, world);
  const owner = resolveOwner(system, world);
  const titheFulfillment = isTitheNonCompliant(system, world)
    ? "Nulo - canales de diezmo cortados o rechazados"
    : "Activo bajo pacto sectorial";
  const conflictState = buildConflictState(world);
  const commandAuthority = buildCommandAuthority(system, world);
  const conflictTheatre = buildConflictTheatre(system, world);
  const seditionNote =
    world.underSedition && world.dossierSeditionNote
      ? world.dossierSeditionNote
      : world.underSedition
        ? "El riesgo de sedicion permanece activo. Retorica sectaria y movilizacion de milicias siguen en escalada."
        : "No hay marcador formal de sedicion en la ultima actualizacion de mando.";

  return {
    infobox: [
      { label: "Sistema", value: system.name },
      { label: "Designacion", value: `${system.name} ${world.orbitalDesignation}` },
      { label: "Nombre Conocido", value: world.knownName },
      { label: "Poblacion", value: world.population },
      { label: "Clima", value: climateDescriptors[world.climate] },
      { label: "Control", value: owner },
      { label: "Cumplimiento del Diezmo", value: titheFulfillment },
      { label: "Estado del Conflicto", value: conflictState },
      { label: "Autoridad de Mando", value: commandAuthority },
      { label: "Dato Unico", value: uniqueFact },
    ],
    metrics: [
      ...classMetrics,
      {
        label: "Postura de Conflicto",
        value: conflictState,
        tone: world.underSiege || world.underSedition ? "danger" : "good",
      },
    ],
    sections: [
      ...classSections,
      {
        title: "Teatro de Conflicto",
        content: conflictTheatre,
      },
      {
        title: "Postura Logistica",
        content: interdependence,
      },
    ],
    campaignNotes: [
      world.status,
      `La influencia de ${system.faction} en ${system.name} se mantiene en nivel de amenaza ${system.threat}.`,
      world.underSiege
        ? "La presion de asedio permanece activa. Lineas defensivas, fuego de artilleria y logistica de refuerzos dominan la planificacion."
        : "No hay marcador formal de asedio en la ultima actualizacion de mando.",
      interdependence,
      seditionNote,
    ],
  };
};
