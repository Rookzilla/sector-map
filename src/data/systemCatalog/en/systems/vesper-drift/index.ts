import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "vesper-drift",
  name: "Vortanna",
  x: 760,
  y: 340,
  threat: "medium",
  faction: "Contested",
  summary: "A border star where Imperial battlegroups and raider fleets clash over jump gates.",
  starClass: "G5 Yellow Dwarf",
  starAge: "4.1 billion years",
  stability: "Minor flare cycles, tactical concern",
  astralNote: "Astropathic choir traffic spikes before every major engagement window.",
  worlds,
};
