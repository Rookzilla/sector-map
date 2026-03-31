import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { Global } from "@emotion/react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "./components/HeroSection";
import { SectorMapViewport } from "./components/SectorMap";
import { SystemDetails } from "./components/SystemDetails";
import { MobileLanguageDock, MobileLanguagePicker } from "./components/HeroSection/heroSection.styles";
import { AppShell, globalStyles, MapLayout } from "./app.styles";
import { useI18n } from "./i18n";
import { clamp, getMapScale, getPanBounds, MAP_SIZE } from "./map/constants";
import { buildTravelRoutes, getWorldKey } from "./map/routes";

const PlanetDetailPanel = lazy(() =>
  import("./components/PlanetDetailPanel").then((module) => ({ default: module.PlanetDetailPanel })),
);

function App() {
  const MIN_USER_ZOOM = 0.72;
  const MAX_USER_ZOOM = 2.15;
  const ZOOM_STEP = 0.12;
  const { locale, setLocale, catalog } = useI18n();
  const { systems, worldClassifications } = catalog.data;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragMovedRef = useRef(false);
  const dragState = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const touchPointsRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStateRef = useRef<{ startDistance: number; startZoom: number } | null>(null);
  const [lockedSystemId, setLockedSystemId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: -300, y: -180 });
  const [baseScale, setBaseScale] = useState(1);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [highlightedWorldKey, setHighlightedWorldKey] = useState<string | null>(null);
  const [selectedPlanetKey, setSelectedPlanetKey] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offsetRef = useRef(offset);
  const mapScale = useMemo(() => clamp(baseScale * zoomFactor, 0.5, 3), [baseScale, zoomFactor]);

  const getTouchDistance = () => {
    const points = Array.from(touchPointsRef.current.values());
    if (points.length < 2) {
      return null;
    }

    const [a, b] = points;
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

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
    offsetRef.current = offset;
  }, [offset]);

  const applyZoom = useCallback((nextZoomFactor: number) => {
    setZoomFactor(clamp(nextZoomFactor, MIN_USER_ZOOM, MAX_USER_ZOOM));
  }, [MAX_USER_ZOOM, MIN_USER_ZOOM]);

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
      if (touchPointsRef.current.has(event.pointerId)) {
        touchPointsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (pinchStateRef.current && touchPointsRef.current.size >= 2) {
        const distance = getTouchDistance();
        if (!distance) {
          return;
        }

        const pinchRatio = distance / pinchStateRef.current.startDistance;
        applyZoom(pinchStateRef.current.startZoom * pinchRatio);
        dragMovedRef.current = true;
        return;
      }

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

    const handlePointerUp = (event: PointerEvent) => {
      if (touchPointsRef.current.has(event.pointerId)) {
        touchPointsRef.current.delete(event.pointerId);
      }

      if (touchPointsRef.current.size < 2) {
        pinchStateRef.current = null;
      }

      if (touchPointsRef.current.size === 1) {
        const [remainingPoint] = Array.from(touchPointsRef.current.values());
        dragState.current = {
          startX: remainingPoint.x,
          startY: remainingPoint.y,
          originX: offsetRef.current.x,
          originY: offsetRef.current.y,
        };
        setIsDragging(true);
        return;
      }

      if (touchPointsRef.current.size === 0) {
        dragState.current = null;
        setIsDragging(false);
        document.body.style.cursor = "";
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [applyZoom, mapScale]);

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) {
      return;
    }

    if (event.pointerType === "touch") {
      touchPointsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (touchPointsRef.current.size >= 2) {
        const distance = getTouchDistance();
        if (distance) {
          pinchStateRef.current = { startDistance: distance, startZoom: zoomFactor };
          dragState.current = null;
          setIsDragging(false);
        }
        return;
      }
    }

    dragMovedRef.current = false;
    pinchStateRef.current = null;
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    setIsDragging(true);
    if (event.pointerType !== "touch") {
      document.body.style.cursor = "grabbing";
    }
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
          {selectedPlanet ? (
            <Suspense fallback={null}>
              <PlanetDetailPanel selection={selectedPlanet} onClose={() => setSelectedPlanetKey(null)} />
            </Suspense>
          ) : null}
        </AnimatePresence>
        <MobileLanguageDock>
          <MobileLanguagePicker>
            <span>{catalog.ui.language.label}</span>
            <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>
              {catalog.ui.language.english}
            </button>
            <button type="button" className={locale === "es" ? "active" : ""} onClick={() => setLocale("es")}>
              {catalog.ui.language.spanish}
            </button>
          </MobileLanguagePicker>
        </MobileLanguageDock>
      </AppShell>
    </>
  );
}

export default App;
