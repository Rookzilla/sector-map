import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "helion-gate",
  name: "Maximus",
  x: 260,
  y: 220,
  threat: "low",
  faction: "Imperium",
  summary: "A fortress lane star anchoring tithe routes, shrine convoys, and munitorum escorts.",
  starClass: "K2 Imperial Main Sequence",
  starAge: "5.8 billion years",
  stability: "Stable output, low warp bleed",
  astralNote: "Primary navigational beacon for nearby Imperial shipping lanes.",
  worlds,
};
