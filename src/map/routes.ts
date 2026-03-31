import { type StarSystem, type World } from "../data/systems";

export type WarpRoute = {
  from: string;
  to: string;
  status: "stable" | "unstable";
};

const FORCED_TRAVEL_ROUTES: Array<readonly [string, string]> = [
  ["ikarion", "aegis-prime"],
  ["noctis-bloom", "mykene"],
];

export const getWorldKey = (systemId: string, world: World) =>
  `${systemId}-${world.orbitalDesignation}-${world.knownName}`;

export const buildTravelRoutes = (allSystems: StarSystem[]): WarpRoute[] => {
  const routeMap = new Map<string, WarpRoute>();
  const systemIds = new Set(allSystems.map((system) => system.id));

  allSystems.forEach((system) => {
    const nearest = allSystems
      .filter((candidate) => candidate.id !== system.id)
      .map((candidate) => {
        const dx = candidate.x - system.x;
        const dy = candidate.y - system.y;
        return { candidate, distance: Math.hypot(dx, dy) };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    nearest.forEach(({ candidate, distance }) => {
      const from = system.id < candidate.id ? system.id : candidate.id;
      const to = system.id < candidate.id ? candidate.id : system.id;
      const key = `${from}->${to}`;
      const status: WarpRoute["status"] = distance < 450 ? "stable" : "unstable";

      if (!routeMap.has(key)) {
        routeMap.set(key, { from, to, status });
      }
    });
  });

  FORCED_TRAVEL_ROUTES.forEach(([a, b]) => {
    if (!systemIds.has(a) || !systemIds.has(b) || a === b) {
      return;
    }

    const from = a < b ? a : b;
    const to = a < b ? b : a;
    const key = `${from}->${to}`;
    if (!routeMap.has(key)) {
      routeMap.set(key, { from, to, status: "stable" });
    }
  });

  return Array.from(routeMap.values());
};
