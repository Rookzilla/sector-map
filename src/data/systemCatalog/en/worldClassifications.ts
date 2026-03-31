import { type WorldClassInfo, type WorldClassKey } from "../../systems";

export const worldClassifications: Record<WorldClassKey, WorldClassInfo> = {
  alpha: { code: "α-class", title: "Agri-World", icon: "🌾", short: "Alpha" },
  gamma: { code: "γ-class", title: "Civilised World", icon: "🏛", short: "Gamma" },
  delta: { code: "δ-class", title: "Dead World", icon: "◌", short: "Delta" },
  deltaTau: { code: "δτ-class", title: "Death World", icon: "☠", short: "Delta Tau" },
  epsilon: { code: "ε-class", title: "Cemetery World", icon: "⚰", short: "Epsilon" },
  eta: { code: "η-class", title: "Hive World", icon: "🏙", short: "Eta" },
  mu: { code: "μ-class", title: "Feudal World", icon: "🛡", short: "Mu" },
  rho: { code: "ρ-class", title: "Research Station", icon: "🔬", short: "Rho" },
  phi: { code: "φ-class", title: "Forge World", icon: "⚙", short: "Phi" },
  phiLambda: { code: "φλ-class", title: "Feral World", icon: "🪓", short: "Phi Lambda" },
};
