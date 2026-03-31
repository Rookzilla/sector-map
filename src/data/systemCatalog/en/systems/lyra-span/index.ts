import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "lyra-span",
  name: "Hydraspes",
  x: 1680,
  y: 920,
  threat: "low",
  faction: "Greenskin",
  summary: "A supply-route star overrun by Ork flotillas building scrap fortresses across habitable worlds.",
  starClass: "K4 Orange Dwarf",
  starAge: "6.4 billion years",
  stability: "Stable but dust-obscured",
  astralNote: "Pict-feeds show ramshackle dockyards multiplying each cycle.",
  worlds,
};
