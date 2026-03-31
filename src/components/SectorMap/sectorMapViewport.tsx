import { type PointerEvent as ReactPointerEvent, type RefObject, type WheelEvent as ReactWheelEvent } from "react";
import { type WorldClassInfo, type WorldClassKey, type StarSystem, type World } from "../../data/systems";
import { AGAMEMNON_COORDS, GRID_SIZE, MAP_SIZE } from "../../map/constants";
import { type WarpRoute } from "../../map/routes";
import { BlackHole, MapCanvas, MapControls, MapViewport, MapZoomLabel, Nebula } from "../../app.styles";
import { RouteLayer } from "./routeLayer";
import { SystemNodes } from "./systemNodes";

type SectorMapViewportProps = {
  viewportRef: RefObject<HTMLDivElement | null>;
  offset: { x: number; y: number };
  mapScale: number;
  dragging: boolean;
  systems: StarSystem[];
  systemById: Map<string, StarSystem>;
  travelRoutes: WarpRoute[];
  lockedSystemId: string | null;
  connectedSystemIds: Set<string>;
  activeSystemId: string | undefined;
  highlightedWorldKey: string | null;
  worldClassifications: Record<WorldClassKey, WorldClassInfo>;
  getWorldKey: (systemId: string, world: World) => string;
  mapAriaLabel: string;
  blackHoleLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  zoomResetLabel: string;
  zoomLevelLabel: string;
  canZoomIn: boolean;
  canZoomOut: boolean;
  inspectSystemAria: (systemName: string) => string;
  worldClassTitle: (classCode: string, classTitle: string, worldName: string) => string;
  formatFaction: (faction: StarSystem["faction"]) => string;
  onStartDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onViewportClick: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onWheelZoom: (event: ReactWheelEvent<HTMLDivElement>) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onSystemSelect: (systemId: string) => void;
  onWorldSelect: (systemId: string, worldKey: string) => void;
};

export function SectorMapViewport({
  viewportRef,
  offset,
  mapScale,
  dragging,
  systems,
  systemById,
  travelRoutes,
  lockedSystemId,
  connectedSystemIds,
  activeSystemId,
  highlightedWorldKey,
  worldClassifications,
  getWorldKey,
  mapAriaLabel,
  blackHoleLabel,
  zoomInLabel,
  zoomOutLabel,
  zoomResetLabel,
  zoomLevelLabel,
  canZoomIn,
  canZoomOut,
  inspectSystemAria,
  worldClassTitle,
  formatFaction,
  onStartDrag,
  onViewportClick,
  onWheelZoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onSystemSelect,
  onWorldSelect,
}: SectorMapViewportProps) {
  return (
    <MapViewport
      ref={viewportRef}
      onPointerDown={onStartDrag}
      onClick={onViewportClick}
      onWheel={onWheelZoom}
      role="presentation"
      aria-label={mapAriaLabel}
    >
      <MapControls>
        <button type="button" aria-label={zoomInLabel} onClick={onZoomIn} disabled={!canZoomIn}>
          +
        </button>
        <button type="button" aria-label={zoomOutLabel} onClick={onZoomOut} disabled={!canZoomOut}>
          -
        </button>
        <button type="button" aria-label={zoomResetLabel} onClick={onZoomReset}>
          1:1
        </button>
        <MapZoomLabel>{zoomLevelLabel}</MapZoomLabel>
      </MapControls>
      <MapCanvas
        animate={{ x: offset.x, y: offset.y, scale: mapScale }}
        transition={dragging ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 26, mass: 0.34 }}
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
          <span className="label">{blackHoleLabel}</span>
        </BlackHole>

        <RouteLayer travelRoutes={travelRoutes} systemById={systemById} lockedSystemId={lockedSystemId} />

        <SystemNodes
          systems={systems}
          activeSystemId={activeSystemId}
          lockedSystemId={lockedSystemId}
          connectedSystemIds={connectedSystemIds}
          highlightedWorldKey={highlightedWorldKey}
          worldClassifications={worldClassifications}
          getWorldKey={getWorldKey}
          inspectSystemAria={inspectSystemAria}
          worldClassTitle={worldClassTitle}
          formatFaction={formatFaction}
          onSystemSelect={onSystemSelect}
          onWorldSelect={onWorldSelect}
        />
      </MapCanvas>
    </MapViewport>
  );
}
