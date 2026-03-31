import { AnimatePresence } from "framer-motion";
import { useI18n } from "../../i18n";
import { type StarSystem, type World } from "../../data/systems";
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
import { getFactionIntel, getIntelLabel, getSecondaryIntel, resolvePlanetOwner } from "./intel";

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
  const { catalog } = useI18n();
  const { systemDetails } = catalog.ui;
  const { worldClassifications } = catalog.data;

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
                <Threat level={activeSystem.threat}>{systemDetails.threatCopy[activeSystem.threat]}</Threat>
                <h2>{activeSystem.name}</h2>
              </div>
              <FactionChip>{systemDetails.factionDisplay[activeSystem.faction]}</FactionChip>
            </DetailHeader>

            <DetailSummary className="system-summary">{activeSystem.summary}</DetailSummary>

            <StarMetaGrid className="system-meta-grid">
              <StarMetaCard className="meta-star-class">
                <strong>{systemDetails.starClass}</strong>
                <span>{activeSystem.starClass}</span>
              </StarMetaCard>
              <StarMetaCard className="meta-star-age">
                <strong>{systemDetails.estimatedAge}</strong>
                <span>{activeSystem.starAge}</span>
              </StarMetaCard>
              <StarMetaCard className="meta-stability">
                <strong>{systemDetails.stability}</strong>
                <span>{activeSystem.stability}</span>
              </StarMetaCard>
              <StarMetaCard className="meta-astral-note">
                <strong>{systemDetails.astralNote}</strong>
                <span>{activeSystem.astralNote}</span>
              </StarMetaCard>
            </StarMetaGrid>

            <WorldList>
              {activeSystem.worlds.map((world, index) => {
                const worldKey = getWorldKey(activeSystem.id, world);
                const owner = resolvePlanetOwner(activeSystem.faction, world);
                const secondaryIntel = getSecondaryIntel(activeSystem.faction, world, systemDetails);
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
                    aria-label={systemDetails.openPlanetDossier(activeSystem.name, world.orbitalDesignation, world.knownName)}
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
                          title={systemDetails.worldClassTooltip(
                            worldClassifications[world.classification].code,
                            worldClassifications[world.classification].title,
                          )}
                        >
                          {worldClassifications[world.classification].code.split("-")[0]}
                        </ClassBubble>
                        <span className="class-title">{worldClassifications[world.classification].title}</span>
                      </WorldClassBlock>
                    </WorldTopline>
                    <WorldBadges>
                      <ClimateBadge climate={world.climate}>
                        {systemDetails.climateLabel}: {systemDetails.climateDisplay[world.climate]}
                      </ClimateBadge>
                      {world.underSiege ? <SiegeBadge>{systemDetails.underSiege}</SiegeBadge> : null}
                      {world.underSedition ? <SeditionBadge>{systemDetails.sedition}</SeditionBadge> : null}
                    </WorldBadges>
                    <p className="world-population">
                      {systemDetails.populationLabel}: {world.population}
                    </p>
                    <p className="world-status">{world.status}</p>
                    <IntelLine className="world-intel-line">
                      <strong>{getIntelLabel(activeSystem.faction, world, systemDetails)}:</strong>
                      {getFactionIntel(activeSystem.faction, world, systemDetails)}
                      {!secondaryIntel ? (
                        <OwnerPill owner={owner} className="intel-owner">
                          {systemDetails.factionDisplay[owner]}
                        </OwnerPill>
                      ) : null}
                    </IntelLine>
                    {secondaryIntel ? (
                      <IntelSubLine className="world-intel-subline">
                        <strong>{secondaryIntel.label}:</strong>
                        {secondaryIntel.value}
                        <OwnerPill owner={owner} className="intel-owner">
                          {systemDetails.factionDisplay[owner]}
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
            <h2>{systemDetails.emptyTitle}</h2>
            <p>{systemDetails.emptyBody}</p>
          </EmptyDetailPanel>
        )}
      </AnimatePresence>

      <InteractionCard />
    </DetailColumn>
  );
}
