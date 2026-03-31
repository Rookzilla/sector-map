import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { Global } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { PlanetDetailPanel } from "./components/PlanetDetailPanel";
import { SectorMapViewport } from "./components/SectorMap";
import { SystemDetails } from "./components/SystemDetails";
import { AppShell, globalStyles, MapLayout } from "./app.styles";
import { useI18n } from "./i18n";
import { clamp, getMapScale, getPanBounds, MAP_SIZE } from "./map/constants";
import { buildTravelRoutes, getWorldKey } from "./map/routes";

function App() {
  const MIN_USER_ZOOM = 0.72;
  const MAX_USER_ZOOM = 2.15;
  const ZOOM_STEP = 0.12;
  const { catalog } = useI18n();
  const { systems, worldClassifications } = catalog.data;
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
  const [baseScale, setBaseScale] = useState(1);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [highlightedWorldKey, setHighlightedWorldKey] = useState<string | null>(null);
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapScale = useMemo(() => clamp(baseScale * zoomFactor, 0.5, 3), [baseScale, zoomFactor]);

  const systemById = new Map(systems.map((system) => [system.id, system]));
  const travelRoutes = useMemo(() => buildTravelRoutes(systems), [systems]);
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
      setBaseScale(getMapScale(window.innerWidth));
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
      setIsDragging(false);
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
    setIsDragging(true);
    document.body.style.cursor = "grabbing";
  };

  const applyZoom = (nextZoomFactor: number) => {
    setZoomFactor(clamp(nextZoomFactor, MIN_USER_ZOOM, MAX_USER_ZOOM));
  };

  const zoomIn = () => applyZoom(zoomFactor + ZOOM_STEP);
  const zoomOut = () => applyZoom(zoomFactor - ZOOM_STEP);
  const zoomReset = () => applyZoom(1);

  const handleWheelZoom = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    applyZoom(zoomFactor + direction * ZOOM_STEP * 0.45);
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
          <SectorMapViewport
            viewportRef={viewportRef}
            offset={offset}
            mapScale={mapScale}
            dragging={isDragging}
            systems={systems}
            systemById={systemById}
            travelRoutes={travelRoutes}
            lockedSystemId={lockedSystemId}
            connectedSystemIds={connectedSystemIds}
            activeSystemId={activeSystem?.id}
            highlightedWorldKey={highlightedWorldKey}
            worldClassifications={worldClassifications}
            getWorldKey={getWorldKey}
            mapAriaLabel={catalog.ui.app.mapAriaLabel}
            blackHoleLabel={catalog.ui.app.blackHoleLabel}
            zoomInLabel={catalog.ui.app.zoomIn}
            zoomOutLabel={catalog.ui.app.zoomOut}
            zoomResetLabel={catalog.ui.app.zoomReset}
            zoomLevelLabel={catalog.ui.app.zoomLevelLabel(Math.round(zoomFactor * 100))}
            canZoomIn={zoomFactor < MAX_USER_ZOOM}
            canZoomOut={zoomFactor > MIN_USER_ZOOM}
            inspectSystemAria={catalog.ui.app.inspectSystemAria}
            worldClassTitle={catalog.ui.app.worldClassTitle}
            formatFaction={(faction) => catalog.ui.systemDetails.factionDisplay[faction]}
            onStartDrag={startDrag}
            onViewportClick={handleViewportClick}
            onWheelZoom={handleWheelZoom}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onZoomReset={zoomReset}
            onSystemSelect={setLockedSystemId}
            onWorldSelect={(systemId, worldKey) => {
              setLockedSystemId(systemId);
              selectPlanet(worldKey);
            }}
          />

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
