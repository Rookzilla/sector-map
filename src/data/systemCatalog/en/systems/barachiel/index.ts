import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "barachiel",
  name: "Barachiel",
  x: 700,
  y: 640,
  threat: "high",
  faction: "Contested",
  summary: "A shrine-rich star where the Sons of Piety have risen in armed sedition after tithe collapse, igniting open war against nearby Imperial worlds.",
  starClass: "G6 Star",
  starAge: "5.0 billion years",
  stability: "Stable",
  astralNote: "Interrogator reports suggest Chaos agents have infiltrated the Sons of Piety command echelons.",
  worlds,
};
