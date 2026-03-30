import { AnimatePresence } from "framer-motion";
import {
  worldClassifications,
  type Climate,
  type PlanetOwnerFaction,
  type SpaceFaction,
  type StarSystem,
  type ThreatLevel,
  type World,
} from "../../data/systems";
import { InteractionCard } from "../InteractionCard";
import {
  ClassBubble,
  ClimateBadge,
  DetailColumn,
  DetailHeader,
  DetailPanel,
  DetailSummary,
  EmptyDetailPanel,
  FactionChip,
  IntelLine,
  IntelSubLine,
  KnownWorldName,
  OwnerPill,
  SiegeBadge,
  SeditionBadge,
  StarMetaCard,
  StarMetaGrid,
  Threat,
  WorldBadges,
  WorldCard,
  WorldClassBlock,
  WorldDesignation,
  WorldList,
  WorldTopline,
} from "./systemDetails.styles";

const threatCopy: Record<ThreatLevel, string> = {
  low: "Tithe lanes secure",
  medium: "Xenos raids rising",
  high: "Warp breach threat",
  critical: "Exterminatus watch",
};

const climateDisplay: Record<Climate, string> = {
  Temperate: "Temperate",
  Arcapelago: "Archipelago",
  Ocean: "Oceanic",
  Forest: "Forested",
  Tundra: "Tundra",
  Ice: "Ice",
  Desert: "Desert",
  Savannah: "Savannah",
  Barren: "Barren",
  "No Atmosphere": "No Atmosphere",
};

const factionIntelLabel: Record<SpaceFaction, string> = {
  Imperium: "Imperial Guard Regiment",
  Chaos: "Ruling Warband",
  Contested: "Primary Belligerents",
  Greenskin: "Known Warboss",
  Renegade: "Renegade Commander",
};

const ownerIntelLabel: Record<PlanetOwnerFaction, string> = {
  Imperium: "Imperial Guard Regiment",
  Chaos: "Ruling Warband",
  Renegade: "Renegade Commander",
  Greenskin: "Known Warboss",
  Xenos: "Xenos Authority",
};

const getIntelLabel = (faction: SpaceFaction, world: World) => {
  if (faction === "Contested" && world.ownerFaction) {
    return ownerIntelLabel[world.ownerFaction];
  }

  return factionIntelLabel[faction];
};

const getFactionIntel = (faction: SpaceFaction, world: World) => {
  if (faction === "Imperium") {
    if (world.classification === "rho" || world.classification === "delta") {
      return "No standing planetary regiment. Security is maintained by rotating off-world detachments.";
    }
    return world.imperialRegiment ?? "Regiment data redacted";
  }

  if (faction === "Chaos") {
    return world.rulingWarband ?? "Traitor warband unconfirmed";
  }

  if (faction === "Greenskin") {
    return world.warboss ?? "No dominant warboss identified";
  }

  if (faction === "Renegade") {
    return world.renegadeCommander ?? "Renegade command hierarchy fragmented";
  }

  if (faction === "Contested") {
    if (world.ownerFaction === "Imperium") {
      return world.imperialRegiment ?? "Imperial garrison strength unknown";
    }

    if (world.ownerFaction === "Chaos") {
      return world.rulingWarband ?? "Traitor warband activity confirmed";
    }

    if (world.ownerFaction === "Renegade") {
      return world.renegadeCommander ?? "Renegade cells contest orbital command";
    }

    if (world.ownerFaction === "Greenskin") {
      return world.warboss ?? "Greenskin raiding mobs hold the lower zones";
    }

    if (world.ownerFaction === "Xenos") {
      return world.xenosAuthority ?? "Xenos command body not fully identified";
    }
  }

  return "Imperial and hostile fleets contest orbital control";
};

const getSecondaryIntel = (faction: SpaceFaction, world: World) => {
  if (faction === "Imperium") {
    return {
      label: "Planetary Governor",
      value: world.governor ?? "Governor not confirmed",
    };
  }

  if (faction === "Chaos") {
    return {
      label: "Patron Worship",
      value: world.patronWorship ?? "Chaos Undivided",
    };
  }

  return null;
};

const resolvePlanetOwner = (systemFaction: SpaceFaction, world: World): PlanetOwnerFaction => {
  if (world.ownerFaction) {
    return world.ownerFaction;
  }

  if (
    systemFaction === "Imperium" ||
    systemFaction === "Chaos" ||
    systemFaction === "Renegade" ||
    systemFaction === "Greenskin"
  ) {
    return systemFaction;
  }

  return "Imperium";
};

type SystemDetailsProps = {
  activeSystem: StarSystem | null;
  highlightedWorldKey: string | null;
  selectedPlanetKey: string | null;
  onPlanetSelect: (worldKey: string) => void;
  onPlanetHover: (worldKey: string | null) => void;
  getWorldKey: (systemId: string, world: World) => string;
};

export function SystemDetails({
  activeSystem,
  highlightedWorldKey,
  selectedPlanetKey,
  onPlanetSelect,
  onPlanetHover,
  getWorldKey,
}: SystemDetailsProps) {
  return (
    <DetailColumn>
      <AnimatePresence mode="wait">
        {activeSystem ? (
          <DetailPanel
            key={activeSystem.id}
            initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <DetailHeader>
              <div>
                <Threat level={activeSystem.threat}>{threatCopy[activeSystem.threat]}</Threat>
                <h2>{activeSystem.name}</h2>
              </div>
              <FactionChip>{activeSystem.faction}</FactionChip>
            </DetailHeader>

            <DetailSummary>{activeSystem.summary}</DetailSummary>

            <StarMetaGrid>
              <StarMetaCard>
                <strong>Star Class</strong>
                <span>{activeSystem.starClass}</span>
              </StarMetaCard>
              <StarMetaCard>
                <strong>Estimated Age</strong>
                <span>{activeSystem.starAge}</span>
              </StarMetaCard>
              <StarMetaCard>
                <strong>Stability</strong>
                <span>{activeSystem.stability}</span>
              </StarMetaCard>
              <StarMetaCard>
                <strong>Astral Note</strong>
                <span>{activeSystem.astralNote}</span>
              </StarMetaCard>
            </StarMetaGrid>

            <WorldList>
              {activeSystem.worlds.map((world, index) => {
                const worldKey = getWorldKey(activeSystem.id, world);
                const owner = resolvePlanetOwner(activeSystem.faction, world);
                const secondaryIntel = getSecondaryIntel(activeSystem.faction, world);
                return (
                  <WorldCard
                    key={worldKey}
                    className="world-card"
                    highlighted={highlightedWorldKey === worldKey}
                    selected={selectedPlanetKey === worldKey}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * (index + 1) }}
                    onClick={() => onPlanetSelect(worldKey)}
                    onMouseEnter={() => onPlanetHover(worldKey)}
                    onMouseLeave={() => onPlanetHover(selectedPlanetKey)}
                    onFocus={() => onPlanetHover(worldKey)}
                    onBlur={() => onPlanetHover(selectedPlanetKey)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onPlanetSelect(worldKey);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open planet dossier for ${activeSystem.name} ${world.orbitalDesignation} ${world.knownName}`}
                  >
                    <WorldTopline>
                      <WorldDesignation>
                        {activeSystem.name} {world.orbitalDesignation}
                      </WorldDesignation>
                      <KnownWorldName>"{world.knownName}"</KnownWorldName>
                      <WorldClassBlock>
                        <ClassBubble
                          active={highlightedWorldKey === worldKey}
                          onClick={(event) => {
                            event.stopPropagation();
                            onPlanetSelect(worldKey);
                          }}
                          type="button"
                          title={`${worldClassifications[world.classification].code} ${worldClassifications[world.classification].title}`}
                        >
                          {worldClassifications[world.classification].code.split("-")[0]}
                        </ClassBubble>
                        <span className="class-title">{worldClassifications[world.classification].title}</span>
                      </WorldClassBlock>
                    </WorldTopline>
                    <WorldBadges>
                      <ClimateBadge climate={world.climate}>Climate: {climateDisplay[world.climate]}</ClimateBadge>
                      {world.underSiege ? <SiegeBadge>Under Siege</SiegeBadge> : null}
                      {world.underSedition ? <SeditionBadge>Sedition</SeditionBadge> : null}
                    </WorldBadges>
                    <p>Population: {world.population}</p>
                    <p>{world.status}</p>
                    <IntelLine>
                      <strong>{getIntelLabel(activeSystem.faction, world)}:</strong>
                      {getFactionIntel(activeSystem.faction, world)}
                      {!secondaryIntel ? (
                        <OwnerPill owner={owner} className="intel-owner">
                          {owner}
                        </OwnerPill>
                      ) : null}
                    </IntelLine>
                    {secondaryIntel ? (
                      <IntelSubLine>
                        <strong>{secondaryIntel.label}:</strong>
                        {secondaryIntel.value}
                        <OwnerPill owner={owner} className="intel-owner">
                          {owner}
                        </OwnerPill>
                      </IntelSubLine>
                    ) : null}
                  </WorldCard>
                );
              })}
            </WorldList>
          </DetailPanel>
        ) : (
          <EmptyDetailPanel
            key="empty-state"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <h2>No System Selected</h2>
            <p>Click a system to lock it in the dossier. Click empty space on the map to clear.</p>
          </EmptyDetailPanel>
        )}
      </AnimatePresence>

      <InteractionCard />
    </DetailColumn>
  );
}
