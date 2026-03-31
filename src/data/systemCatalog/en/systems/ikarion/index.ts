import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "ikarion",
  name: "Ikarion",
  x: 1120,
  y: 320,
  threat: "low",
  faction: "Imperium",
  summary: "A disciplined scholam-and-shipyard star supplying officers and escorts.",
  starClass: "F5 Star",
  starAge: "3.5 billion years",
  stability: "Stable",
  astralNote: "Officer cadet flotillas drill in high orbit every cycle.",
  worlds,
};
