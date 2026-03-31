import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "cryon-reach",
  name: "Dreyr",
  x: 420,
  y: 780,
  threat: "medium",
  faction: "Chaos",
  summary: "A blood-soaked lane star where traitor cruisers emerge from dust veils to raid convoys.",
  starClass: "F7 White Star",
  starAge: "3.2 billion years",
  stability: "Erratic flare bursts, warp harmonics detected",
  astralNote: "Long-range augurs detect recurring daemon-sign over the inner belt.",
  worlds,
};
