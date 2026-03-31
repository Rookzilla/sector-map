import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "mykene",
  name: "Mykene",
  x: 1620,
  y: 700,
  threat: "low",
  faction: "Imperium",
  summary: "A reserve mustering star with strict fleet discipline and dependable warp tides.",
  starClass: "G1 Star",
  starAge: "4.2 billion years",
  stability: "Excellent",
  astralNote: "Long-haul convoys use this star as their final armament stop.",
  worlds,
};
