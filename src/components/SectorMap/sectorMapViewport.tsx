import { type PointerEvent as ReactPointerEvent, type RefObject } from "react";
import { type WorldClassInfo, type WorldClassKey, type StarSystem, type World } from "../../data/systems";
import { AGAMEMNON_COORDS, GRID_SIZE, MAP_SIZE } from "../../map/constants";
import { type WarpRoute } from "../../map/routes";
import { BlackHole, MapCanvas, MapViewport, Nebula } from "../../app.styles";
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
  inspectSystemAria: (systemName: string) => string;
  worldClassTitle: (classCode: string, classTitle: string, worldName: string) => string;
  onStartDrag: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onViewportClick: (event: ReactPointerEvent<HTMLDivElement>) => void;
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
  inspectSystemAria,
  worldClassTitle,
  onStartDrag,
  onViewportClick,
  onSystemSelect,
  onWorldSelect,
}: SectorMapViewportProps) {
  return (
    <MapViewport
      ref={viewportRef}
      onPointerDown={onStartDrag}
      onClick={onViewportClick}
      role="presentation"
      aria-label={mapAriaLabel}
    >
      <MapCanvas
        animate={{ x: offset.x, y: offset.y, scale: mapScale }}
        transition={{
          type: "spring",
          stiffness: dragging ? 420 : 120,
          damping: dragging ? 42 : 24,
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
          onSystemSelect={onSystemSelect}
          onWorldSelect={onWorldSelect}
        />
      </MapCanvas>
    </MapViewport>
  );
}
