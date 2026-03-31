import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
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
  worlds,
};
