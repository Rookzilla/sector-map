import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "drakonis",
  name: "Drakonis",
  x: 180,
  y: 980,
  threat: "medium",
  faction: "Greenskin",
  summary: "A frontier star where roaming ork fleets test ramshackle gun platforms.",
  starClass: "M1 Dwarf",
  starAge: "8.2 billion years",
  stability: "Stable",
  astralNote: "Wreck fields around the inner belt grow by the week.",
  worlds,
};
