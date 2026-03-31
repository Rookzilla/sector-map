import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "satrapa",
  name: "Satrapa",
  x: 980,
  y: 1030,
  threat: "high",
  faction: "Contested",
  summary: "A jurisdictional flashpoint where three fleets claim right of passage.",
  starClass: "A5 Star",
  starAge: "3.0 billion years",
  stability: "Radiant but stable",
  astralNote: "No two charts agree on local hazard gradients.",
  worlds,
};
