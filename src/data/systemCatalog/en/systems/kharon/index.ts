import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "kharon",
  name: "Kharon",
  x: 760,
  y: 820,
  threat: "high",
  faction: "Chaos",
  summary: "A void-lashed star where traitor flotillas replenish from hidden docks.",
  starClass: "A7 Star",
  starAge: "2.5 billion years",
  stability: "Turbulent",
  astralNote: "Warp static here causes frequent auspex ghost readings.",
  worlds,
};
