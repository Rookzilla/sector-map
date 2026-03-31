import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "auric-null",
  name: "Nemoris",
  x: 1500,
  y: 260,
  threat: "critical",
  faction: "Contested",
  summary: "A grave star with null-zones and sealed vault worlds sought by both Inquisition and raiders.",
  starClass: "Collapsed White Dwarf",
  starAge: "11.2 billion years",
  stability: "Severe gravitic distortion",
  astralNote: "Chronometric drift makes standard cartography unreliable.",
  worlds,
};
