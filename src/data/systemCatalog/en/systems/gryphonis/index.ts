import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "gryphonis",
  name: "Gryphonis",
  x: 1700,
  y: 360,
  threat: "high",
  faction: "Contested",
  summary: "An outer-rim star where ork freebooters raid long-haul convoy routes.",
  starClass: "K3 Star",
  starAge: "6.9 billion years",
  stability: "Stable",
  astralNote: "Long-range scanners record dense scrap fields in every high orbit.",
  worlds,
};
