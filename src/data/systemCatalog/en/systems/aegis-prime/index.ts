import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
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
  worlds,
};
