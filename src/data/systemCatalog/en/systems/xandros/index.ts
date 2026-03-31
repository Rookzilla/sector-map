import { type StarSystem } from "../../../../systems";
import { worlds } from "./planets";

export const system: StarSystem = {
  id: "xandros",
  name: "Xandros",
  x: 980,
  y: 900,
  threat: "high",
  faction: "Renegade",
  summary: "A rebel corridor star inside Agamemnon's relativistic fringe, where naval operations desynchronize and causality windows fracture command coherence.",
  starClass: "A9 Blue-White Star",
  starAge: "2.7 billion years",
  stability: "Relativistic tidal distortion and intermittent radiation storms",
  astralNote: "Imperial campaign logs in this system return out of phase, with operations begun in one century resolving in another.",
  worlds,
};
