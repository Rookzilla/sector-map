import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "noctis-bloom",
  name: "Helican",
  x: 1180,
  y: 620,
  threat: "high",
  faction: "Imperium",
  summary: "A hardened Imperial bastion centered on hive security and sealed noosphere vaults, anchoring patrol lanes through unstable radiation bands.",
  starClass: "M0 Red Giant",
  starAge: "9.3 billion years",
  stability: "Unstable radiation bands",
  astralNote: "Storm-lantern beacons and orbital noosphere sentries track hostile incursions along the outer lanes.",
  worlds,
};
