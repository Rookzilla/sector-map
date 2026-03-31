import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "malthus",
  name: "Malthus",
  x: 1320,
  y: 120,
  threat: "high",
  faction: "Chaos",
  summary: "A cursed star with recurring warp-echoes and collapsing shrine routes.",
  starClass: "M4 Dying Red Star",
  starAge: "10.8 billion years",
  stability: "Terminal instability",
  astralNote: "Every seventh cycle, choir-vox returns unknown liturgies.",
  worlds,
};
