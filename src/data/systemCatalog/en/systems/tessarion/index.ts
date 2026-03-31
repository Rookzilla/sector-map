import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "tessarion",
  name: "Tessarion",
  x: 900,
  y: 500,
  threat: "high",
  faction: "Renegade",
  summary: "A splinter star system ruled by breakaway captains and oathless planetary militias.",
  starClass: "G2 Star",
  starAge: "4.4 billion years",
  stability: "Moderate flare activity",
  astralNote: "Forgery-grade astropath seals circulate from this system.",
  worlds,
};
