import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "elysion",
  name: "Elysion",
  x: 520,
  y: 980,
  threat: "low",
  faction: "Imperium",
  summary: "A breadbasket star whose worlds sustain nearby fortress sectors.",
  starClass: "G3 Star",
  starAge: "4.6 billion years",
  stability: "Stable",
  astralNote: "Imperial crop futures from this system influence sector logistics planning.",
  worlds,
};
