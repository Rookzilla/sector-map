import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
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
  worlds,
};
