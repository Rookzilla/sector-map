import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "carthon-veil",
  name: "Hakkara",
  x: 980,
  y: 180,
  threat: "medium",
  faction: "Contested",
  summary: "A trade star at the edge of a dust veil contested by privateer houses.",
  starClass: "G8 Dwarf",
  starAge: "6.1 billion years",
  stability: "Stable with particulate eclipses",
  astralNote: "Long-duration scans show hidden docks moving within the veil.",
  worlds,
};
