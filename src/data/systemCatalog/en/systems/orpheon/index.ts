import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "orpheon",
  name: "Orpheon",
  x: 240,
  y: 500,
  threat: "medium",
  faction: "Imperium",
  summary: "A logistics star that feeds nearby crusade fronts with fuel and shell stock.",
  starClass: "K1 Main Sequence",
  starAge: "5.3 billion years",
  stability: "Stable",
  astralNote: "Munitorum records show repeated requisition spikes ahead of campaigns.",
  worlds,
};
