import { type StarSystem, type WorldClassInfo, type WorldClassKey } from "../data/systems";
import { type BuildPlanetDetailProfileFn } from "../common/lore/planetProfile";

export type AppLocale = "en" | "es";

export type UiCopy = {
  app: {
    mapAriaLabel: string;
    blackHoleLabel: string;
    zoomIn: string;
    zoomOut: string;
    zoomReset: string;
    zoomLevelLabel: (percentage: number) => string;
    inspectSystemAria: (systemName: string) => string;
    worldClassTitle: (classCode: string, classTitle: string, worldName: string) => string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    statusLabel: string;
    statusHeadline: string;
    statusBody: string;
  };
  language: {
    label: string;
    english: string;
    spanish: string;
  };
  interaction: {
    title: string;
    description: string;
  };
  systemDetails: {
    threatCopy: Record<"low" | "medium" | "high" | "critical", string>;
    threatLevelLabel: Record<"low" | "medium" | "high" | "critical", string>;
    climateDisplay: Record<
      "Temperate" | "Arcapelago" | "Ocean" | "Forest" | "Tundra" | "Ice" | "Desert" | "Savannah" | "Barren" | "No Atmosphere",
      string
    >;
    factionDisplay: Record<"Imperium" | "Chaos" | "Contested" | "Greenskin" | "Renegade" | "Xenos", string>;
    emptyTitle: string;
    emptyBody: string;
    starClass: string;
    estimatedAge: string;
    stability: string;
    astralNote: string;
    openPlanetDossier: (systemName: string, designation: string, worldName: string) => string;
    worldClassTooltip: (classCode: string, classTitle: string) => string;
    climateLabel: string;
    underSiege: string;
    sedition: string;
    populationLabel: string;
    factionIntelLabels: {
      imperialGuardRegiment: string;
      rulingWarband: string;
      primaryBelligerents: string;
      knownWarboss: string;
      renegadeCommander: string;
      xenosAuthority: string;
      planetaryGovernor: string;
      patronWorship: string;
    };
    intelFallbacks: {
      noStandingRegiment: string;
      regimentRedacted: string;
      traitorUnconfirmed: string;
      noDominantWarboss: string;
      renegadeFragmented: string;
      imperialHostileContest: string;
      imperialGarrisonUnknown: string;
      traitorActivityConfirmed: string;
      renegadeCellsContest: string;
      greenskinRaidersHold: string;
      xenosCommandUnknown: string;
      governorUnknown: string;
      chaosUndivided: string;
    };
  };
  planetPanel: {
    closeOverlayAria: string;
    dialogAria: (worldName: string) => string;
    kicker: string;
    close: string;
    systemThreat: string;
    underSiege: string;
    sedition: string;
    orbitalChart: string;
    noMoons: string;
    moonCount: (count: number) => string;
    infobox: string;
    operationalMetrics: string;
    campaignNotes: string;
    moonHoverLabel: (designation: string, knownName: string) => string;
    moonAriaLabel: (designation: string, knownName: string) => string;
    planetAriaLabel: (worldName: string) => string;
  };
};

export type I18nCatalog = {
  ui: UiCopy;
  data: {
    systems: StarSystem[];
    worldClassifications: Record<WorldClassKey, WorldClassInfo>;
    buildPlanetDetailProfile: BuildPlanetDetailProfileFn;
  };
};
