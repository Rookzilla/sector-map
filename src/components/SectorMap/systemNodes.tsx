import { type WorldClassInfo, type WorldClassKey, type StarSystem, type World } from "../../data/systems";
import { SystemNode } from "../../app.styles";

type SystemNodesProps = {
  systems: StarSystem[];
  activeSystemId: string | undefined;
  lockedSystemId: string | null;
  connectedSystemIds: Set<string>;
  highlightedWorldKey: string | null;
  worldClassifications: Record<WorldClassKey, WorldClassInfo>;
  getWorldKey: (systemId: string, world: World) => string;
  inspectSystemAria: (systemName: string) => string;
  worldClassTitle: (classCode: string, classTitle: string, worldName: string) => string;
  onSystemSelect: (systemId: string) => void;
  onWorldSelect: (systemId: string, worldKey: string) => void;
};

export function SystemNodes({
  systems,
  activeSystemId,
  lockedSystemId,
  connectedSystemIds,
  highlightedWorldKey,
  worldClassifications,
  getWorldKey,
  inspectSystemAria,
  worldClassTitle,
  onSystemSelect,
  onWorldSelect,
}: SystemNodesProps) {
  return (
    <>
      {systems.map((system, index) => {
        const isActive = activeSystemId === system.id;
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
              onSystemSelect(system.id);
            }}
            aria-label={inspectSystemAria(system.name)}
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
                      title={worldClassTitle(classInfo.code, classInfo.title, world.knownName)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onWorldSelect(system.id, worldKey);
                      }}
                      onFocus={(event) => {
                        event.stopPropagation();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          onWorldSelect(system.id, worldKey);
                        }
                      }}
                    >
                      <span className="node-world-greek">{classInfo.code.split("-")[0]}</span>
                    </span>
                  );
                })}
              </span>
            </span>
          </SystemNode>
        );
      })}
    </>
  );
}
