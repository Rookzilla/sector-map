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
