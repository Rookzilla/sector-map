import {
  systems as enSystems,
  worldClassifications as enWorldClassifications,
} from "../en/systems";
import { type WorldClassInfo, type WorldClassKey } from "../../../data/systems";

export const systems = enSystems;
export const worldClassifications: Record<WorldClassKey, WorldClassInfo> = {
  ...enWorldClassifications,
  alpha: { ...enWorldClassifications.alpha, title: "Mundo Agrario", short: "Alfa" },
  gamma: { ...enWorldClassifications.gamma, title: "Mundo Civilizado", short: "Gamma" },
  delta: { ...enWorldClassifications.delta, title: "Mundo Muerto", short: "Delta" },
  deltaTau: { ...enWorldClassifications.deltaTau, title: "Mundo Letal", short: "Delta Tau" },
  epsilon: { ...enWorldClassifications.epsilon, title: "Mundo Cementerio", short: "Epsilon" },
  eta: { ...enWorldClassifications.eta, title: "Mundo Colmena", short: "Eta" },
  mu: { ...enWorldClassifications.mu, title: "Mundo Feudal", short: "Mu" },
  rho: { ...enWorldClassifications.rho, title: "Estacion de Investigacion", short: "Rho" },
  phi: { ...enWorldClassifications.phi, title: "Mundo Forja", short: "Phi" },
  phiLambda: { ...enWorldClassifications.phiLambda, title: "Mundo Feral", short: "Phi Lambda" },
};
