import { WarpRouteLayer, WarpRouteLine } from "../../app.styles";
import { type StarSystem } from "../../data/systems";
import { MAP_SIZE, NODE_CENTER_OFFSET } from "../../map/constants";
import { type WarpRoute } from "../../map/routes";

type HostileEnd = "from" | "to" | "none";

type RouteLayerProps = {
  travelRoutes: WarpRoute[];
  systemById: Map<string, StarSystem>;
  lockedSystemId: string | null;
};

export function RouteLayer({ travelRoutes, systemById, lockedSystemId }: RouteLayerProps) {
  return (
    <WarpRouteLayer viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        {travelRoutes.map((route) => {
          const fromSystem = systemById.get(route.from);
          const toSystem = systemById.get(route.to);
          if (!fromSystem || !toSystem || !lockedSystemId) {
            return null;
          }

          if (route.from !== lockedSystemId && route.to !== lockedSystemId) {
            return null;
          }

          const hostile =
            fromSystem.faction !== toSystem.faction
              ? lockedSystemId === route.from
                ? "to"
                : "from"
              : "none";

          if (hostile === "none") {
            return null;
          }

          const gradientId = `route-gradient-${route.from}-${route.to}`;

          return (
            <linearGradient
              key={gradientId}
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1={fromSystem.x + NODE_CENTER_OFFSET}
              y1={fromSystem.y + NODE_CENTER_OFFSET}
              x2={toSystem.x + NODE_CENTER_OFFSET}
              y2={toSystem.y + NODE_CENTER_OFFSET}
            >
              {hostile === "to" ? (
                <>
                  <stop offset="0%" stopColor="rgba(146,224,255,0.86)" />
                  <stop offset="70%" stopColor="rgba(146,224,255,0.66)" />
                  <stop offset="100%" stopColor="rgba(255,106,106,0.95)" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="rgba(255,106,106,0.95)" />
                  <stop offset="30%" stopColor="rgba(146,224,255,0.66)" />
                  <stop offset="100%" stopColor="rgba(146,224,255,0.86)" />
                </>
              )}
            </linearGradient>
          );
        })}
      </defs>
      {travelRoutes.map((route) => {
        const fromSystem = systemById.get(route.from);
        const toSystem = systemById.get(route.to);

        if (!fromSystem || !toSystem) {
          return null;
        }

        const routeInFocus = lockedSystemId ? route.from === lockedSystemId || route.to === lockedSystemId : false;
        const hostileEnd: HostileEnd =
          routeInFocus && fromSystem.faction !== toSystem.faction
            ? lockedSystemId === route.from
              ? "to"
              : "from"
            : "none";
        const gradientId = `route-gradient-${route.from}-${route.to}`;
        const baseColor = route.status === "stable" ? "rgba(122,231,255,0.22)" : "rgba(255,186,117,0.16)";
        const focusedColor = route.status === "stable" ? "rgba(146,224,255,0.9)" : "rgba(255,211,154,0.84)";

        return (
          <WarpRouteLine
            key={`${route.from}-${route.to}`}
            x1={fromSystem.x + NODE_CENTER_OFFSET}
            y1={fromSystem.y + NODE_CENTER_OFFSET}
            x2={toSystem.x + NODE_CENTER_OFFSET}
            y2={toSystem.y + NODE_CENTER_OFFSET}
            stroke={hostileEnd === "none" ? (routeInFocus ? focusedColor : baseColor) : `url(#${gradientId})`}
            strokeWidth={routeInFocus ? 3 : route.status === "stable" ? 2.1 : 1.5}
            strokeDasharray={route.status === "stable" ? "0" : "8 9"}
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: routeInFocus
                ? route.status === "stable"
                  ? [0.58, 1, 0.58]
                  : [0.45, 0.88, 0.45]
                : route.status === "stable"
                  ? [0.15, 0.32, 0.15]
                  : [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: route.status === "stable" ? 5.8 : 3.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        );
      })}
    </WarpRouteLayer>
  );
}
