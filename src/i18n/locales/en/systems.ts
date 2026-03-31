import { type StarSystem, type WorldClassInfo, type WorldClassKey } from "../../../data/systems";
import { systems as catalogSystems, worldClassifications as catalogWorldClassifications } from "../../../data/systemCatalog/en";

export type { Climate, PlanetOwnerFaction, SpaceFaction, StarSystem, ThreatLevel, World, WorldClassInfo, WorldClassKey } from "../../../data/systems";

export const systems: StarSystem[] = catalogSystems;
export const worldClassifications: Record<WorldClassKey, WorldClassInfo> = catalogWorldClassifications;
