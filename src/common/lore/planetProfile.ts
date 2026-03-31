import { type StarSystem, type World } from "../../data/systems";

type MetricTone = "neutral" | "good" | "warn" | "danger";

export type PlanetMetric = {
  label: string;
  value: string;
  tone?: MetricTone;
};

export type PlanetSection = {
  title: string;
  content: string;
};

export type PlanetDetailProfile = {
  infobox: Array<{ label: string; value: string }>;
  metrics: PlanetMetric[];
  sections: PlanetSection[];
  campaignNotes: string[];
};

export type BuildPlanetDetailProfileFn = (system: StarSystem, world: World) => PlanetDetailProfile;
