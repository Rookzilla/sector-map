import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Global } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { PlanetDetailPanel } from "./components/PlanetDetailPanel";
import { SystemDetails } from "./components/SystemDetails";
import {
  AppShell,
  BlackHole,
  globalStyles,
  MapCanvas,
  MapLayout,
  MapViewport,
  Nebula,
  SystemNode,
  WarpRouteLayer,
  WarpRouteLine,
} from "./app.styles";
import {
  systems,
  worldClassifications,
  type StarSystem,
  type World,
} from "./data/systems";

const MAP_SIZE = { width: 1750, height: 1100 };
const GRID_SIZE = 190;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const MAP_PADDING = 80;
const NODE_CENTER_OFFSET = 8;
const AGAMEMNON_COORDS = { x: 1140, y: 980 };

const getMapScale = (viewportWidth: number) => {
  if (viewportWidth <= 520) {
    return 0.58;
  }

  if (viewportWidth <= 720) {
    return 0.66;
  }

  if (viewportWidth <= 980) {
    return 0.74;
  }

  if (viewportWidth <= 1280) {
    return 0.86;
  }

  return 1;
};

const getPanBounds = (viewportSize: number, scaledMapSize: number) => {
  if (scaledMapSize + MAP_PADDING * 2 <= viewportSize) {
    const centered = (viewportSize - scaledMapSize) / 2;
    const slack = Math.min(MAP_PADDING, Math.max(24, (viewportSize - scaledMapSize) / 2));
    return { min: centered - slack, max: centered + slack };
  }

  return {
    min: viewportSize - scaledMapSize - MAP_PADDING,
    max: MAP_PADDING,
  };
};

type WarpRoute = {
  from: string;
  to: string;
  status: "stable" | "unstable";
};

type HostileEnd = "from" | "to" | "none";
const FORCED_TRAVEL_ROUTES: Array<readonly [string, string]> = [
  ["ikarion", "aegis-prime"],
  ["noctis-bloom", "mykene"],
];

const getWorldKey = (systemId: string, world: World) =>
  `${systemId}-${world.orbitalDesignation}-${world.knownName}`;

const buildTravelRoutes = (allSystems: StarSystem[]): WarpRoute[] => {
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



function App() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragMovedRef = useRef(false);
  const dragState = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [lockedSystemId, setLockedSystemId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: -300, y: -180 });
  const [mapScale, setMapScale] = useState(1);
  const [highlightedWorldKey, setHighlightedWorldKey] = useState<string | null>(null);
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const systemById = new Map(systems.map((system) => [system.id, system]));
  const travelRoutes = useMemo(() => buildTravelRoutes(systems), []);
  const activeSystem = lockedSystemId ? systemById.get(lockedSystemId) ?? null : null;
  const connectedSystemIds = useMemo(() => {
    if (!lockedSystemId) {
      return new Set<string>();
    }

    const connected = new Set<string>();
    travelRoutes.forEach((route) => {
      if (route.from === lockedSystemId) {
        connected.add(route.to);
      } else if (route.to === lockedSystemId) {
        connected.add(route.from);
      }
    });

    return connected;
  }, [lockedSystemId, travelRoutes]);
  const selectedPlanet = useMemo(() => {
    if (!activeSystem || !selectedPlanetKey) {
      return null;
    }

    const world = activeSystem.worlds.find((candidate) => getWorldKey(activeSystem.id, candidate) === selectedPlanetKey);
    if (!world) {
      return null;
    }

    return { system: activeSystem, world, worldKey: selectedPlanetKey };
  }, [activeSystem, selectedPlanetKey]);

  const flashWorld = (worldKey: string) => {
    setHighlightedWorldKey(worldKey);

    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }

    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedWorldKey(null);
    }, 1300);
  };

  useEffect(
    () => () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!activeSystem && selectedPlanetKey) {
      setSelectedPlanetKey(null);
      return;
    }

    if (activeSystem && selectedPlanetKey) {
      const stillExists = activeSystem.worlds.some((world) => getWorldKey(activeSystem.id, world) === selectedPlanetKey);
      if (!stillExists) {
        setSelectedPlanetKey(null);
      }
    }
  }, [activeSystem, selectedPlanetKey]);

  useEffect(() => {
    const handleResize = () => {
      setMapScale(getMapScale(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    const rect = viewportRef.current.getBoundingClientRect();
    const scaledWidth = MAP_SIZE.width * mapScale;
    const scaledHeight = MAP_SIZE.height * mapScale;
    const xBounds = getPanBounds(rect.width, scaledWidth);
    const yBounds = getPanBounds(rect.height, scaledHeight);

    setOffset((current) => ({
      x: clamp(current.x, xBounds.min, xBounds.max),
      y: clamp(current.y, yBounds.min, yBounds.max),
    }));
  }, [mapScale]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!dragState.current || !viewportRef.current) {
        return;
      }

      const { startX, startY, originX, originY } = dragState.current;
      const nextX = originX + (event.clientX - startX);
      const nextY = originY + (event.clientY - startY);
      if (Math.abs(event.clientX - startX) > 2 || Math.abs(event.clientY - startY) > 2) {
        dragMovedRef.current = true;
      }
      const rect = viewportRef.current.getBoundingClientRect();
      const scaledWidth = MAP_SIZE.width * mapScale;
      const scaledHeight = MAP_SIZE.height * mapScale;
      const xBounds = getPanBounds(rect.width, scaledWidth);
      const yBounds = getPanBounds(rect.height, scaledHeight);

      setOffset({
        x: clamp(nextX, xBounds.min, xBounds.max),
        y: clamp(nextY, yBounds.min, yBounds.max),
      });
    };

    const handlePointerUp = () => {
      dragState.current = null;
      document.body.style.cursor = "";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [mapScale]);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    dragMovedRef.current = false;
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    document.body.style.cursor = "grabbing";
  };

  const clearContext = () => {
    setLockedSystemId(null);
    setHighlightedWorldKey(null);
    setSelectedPlanetKey(null);
  };

  const handleViewportClick = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }

    clearContext();
  };

  const selectPlanet = (worldKey: string) => {
    setSelectedPlanetKey(worldKey);
    flashWorld(worldKey);
  };

  const hoverPlanet = (worldKey: string | null) => {
    setHighlightedWorldKey(worldKey ?? selectedPlanetKey);
  };

  return (
    <>
      <Global styles={globalStyles} />
      <AppShell>
        <HeroSection />

        <MapLayout>
          <MapViewport
            ref={viewportRef}
            onPointerDown={startDrag}
            onClick={handleViewportClick}
            role="presentation"
            aria-label="Galactic sector map"
          >
            <MapCanvas
              animate={{ x: offset.x, y: offset.y, scale: mapScale }}
              transition={{
                type: "spring",
                stiffness: dragState.current ? 420 : 120,
                damping: dragState.current ? 42 : 24,
                mass: 0.35,
              }}
              style={{
                width: MAP_SIZE.width,
                height: MAP_SIZE.height,
                backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
                transformOrigin: "top left",
              }}
            >
              <Nebula variant="a" />
              <Nebula variant="b" />
              <Nebula variant="c" />
              <BlackHole style={{ left: AGAMEMNON_COORDS.x, top: AGAMEMNON_COORDS.y }}>
                <span className="singularity-glow" />
                <span className="accretion-ring-a" />
                <span className="accretion-ring-b" />
                <span className="accretion-ring-c" />
                <span className="event-horizon" />
                <span className="label">Agamemnon</span>
              </BlackHole>
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

                  const routeInFocus = lockedSystemId
                    ? route.from === lockedSystemId || route.to === lockedSystemId
                    : false;
                  const hostileEnd: HostileEnd =
                    routeInFocus && fromSystem.faction !== toSystem.faction
                      ? lockedSystemId === route.from
                        ? "to"
                        : "from"
                      : "none";
                  const gradientId = `route-gradient-${route.from}-${route.to}`;
                  const baseColor =
                    route.status === "stable" ? "rgba(122,231,255,0.22)" : "rgba(255,186,117,0.16)";
                  const focusedColor =
                    route.status === "stable" ? "rgba(146,224,255,0.9)" : "rgba(255,211,154,0.84)";

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

              {systems.map((system, index) => {
                const isActive = activeSystem?.id === system.id;
                const isLocked = lockedSystemId === system.id;
                const isConnected = lockedSystemId ? connectedSystemIds.has(system.id) : false;

                return (
                  <SystemNode
                    key={system.id}
                    active={isActive}
                    locked={isLocked}
                    connected={isConnected}
                    style={{ left: system.x, top: system.y }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ scale: 1.06 }}
                    onFocus={() => {}}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setLockedSystemId(system.id);
                    }}
                    aria-label={`Inspect ${system.name}`}
                  >
                    <span className="node-halo" />
                    <span className="node-core" />
                    <span className="node-pulse" />
                    <span className="node-orbit-1" />
                    <span className="node-orbit-2" />
                    <span className="node-label">
                      <strong>{system.name}</strong>
                      <small>{system.faction}</small>
                      <span className="node-world-links">
                        {system.worlds.map((world) => {
                          const worldKey = getWorldKey(system.id, world);
                          const classInfo = worldClassifications[world.classification];

                          return (
                            <span
                              key={`${system.id}-link-${world.orbitalDesignation}-${world.knownName}`}
                              className={`node-world-link ${highlightedWorldKey === worldKey ? "active" : ""} ${
                                world.underSiege || world.underSedition ? "under-siege" : ""
                              }`}
                              role="button"
                              tabIndex={0}
                              title={`${classInfo.code} ${classInfo.title}: ${world.knownName}`}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setLockedSystemId(system.id);
                                selectPlanet(worldKey);
                              }}
                              onFocus={(event) => {
                                event.stopPropagation();
                              }}
                              onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  setLockedSystemId(system.id);
                                  selectPlanet(worldKey);
                                }
                              }}
                            >
                              <span className="node-world-greek">
                                {classInfo.code.split("-")[0]}
                              </span>
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  </SystemNode>
                );
              })}
            </MapCanvas>
          </MapViewport>

          <SystemDetails
            activeSystem={activeSystem}
            highlightedWorldKey={highlightedWorldKey}
            selectedPlanetKey={selectedPlanetKey}
            onPlanetSelect={selectPlanet}
            onPlanetHover={hoverPlanet}
            getWorldKey={getWorldKey}
          />
        </MapLayout>
        <AnimatePresence>
          {selectedPlanet ? <PlanetDetailPanel selection={selectedPlanet} onClose={() => setSelectedPlanetKey(null)} /> : null}
        </AnimatePresence>
      </AppShell>
    </>
  );
}

export default App;
