import { useMemo, useState } from "react";
import { buildPlanetDetailProfile } from "../../common/lore/planetProfile";
import { useI18n } from "../../i18n";
import {
  type PlanetOwnerFaction,
  type SpaceFaction,
  type StarSystem,
  type World,
  type WorldClassKey,
} from "../../data/systems";
import {
  Backdrop,
  ChartCard,
  ChartFootnote,
  ChartLabel,
  ChartViewport,
  Chip,
  ChipRow,
  CloseButton,
  ColumnStack,
  Content,
  Header,
  HeaderTopline,
  InfoCard,
  InfoList,
  Kicker,
  LoreSection,
  MetricCard,
  MetricsGrid,
  MoonBody,
  NotesList,
  OrbitRing,
  Panel,
  PlanetBody,
  PlanetTitle,
  Subtitle,
} from "./planetDetailPanel.styles";

type PlanetSelection = {
  system: StarSystem;
  world: World;
  worldKey: string;
};

type PlanetDetailPanelProps = {
  selection: PlanetSelection;
  onClose: () => void;
};

type MoonSpec = {
  designation: string;
  knownName: string;
  diameter: number;
  duration: number;
  delay: number;
  size: number;
  tint: string;
};

const toArabicDesignation = (designation: string) => {
  const romanMap: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const value = designation.toUpperCase().trim();
  let total = 0;
  let previous = 0;

  for (let index = value.length - 1; index >= 0; index -= 1) {
    const numeral = romanMap[value[index]];
    if (!numeral) {
      return designation;
    }

    if (numeral < previous) {
      total -= numeral;
    } else {
      total += numeral;
      previous = numeral;
    }
  }

  return String(total);
};

const hashSeed = (value: string) =>
  value.split("").reduce((acc, character, index) => acc + character.charCodeAt(0) * (index + 3), 0);

const buildSystemTag = (systemName: string) =>
  systemName
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 3)
    .toUpperCase();

const makeMoonSpecs = (system: StarSystem, world: World): MoonSpec[] => {
  const seed = hashSeed(`${system.id}-${world.orbitalDesignation}-${world.knownName}`);
  const moonRoll = seed % 100;
  const count = moonRoll >= 77 ? 2 : moonRoll >= 60 ? 1 : 0;

  if (count === 0) {
    return [];
  }

  const tints = ["#8ea3b8", "#9eb59f", "#9f8fb8"];
  const moonRootsA = ["Aster", "Cinder", "Vigil", "Khar", "Nox", "Thyr", "Val", "Orin"];
  const moonRootsB = ["ion", "eth", "arus", "os", "yx", "ael", "or", "ith"];
  const moonLetters = ["B", "C", "D", "E"];
  const planetaryDesignation = toArabicDesignation(world.orbitalDesignation);
  const systemTag = buildSystemTag(system.name);

  return Array.from({ length: count }).map((_, index) => {
    const nameSeed = seed + index * 13;
    const codename = `${moonRootsA[nameSeed % moonRootsA.length]}${moonRootsB[(nameSeed >> 2) % moonRootsB.length]}-${systemTag}${planetaryDesignation}${moonLetters[index] ?? String.fromCharCode(66 + index)}`;
    const suffix = moonLetters[index] ?? String.fromCharCode(66 + index);
    return {
      designation: `Moon - ${system.name} ${planetaryDesignation}${suffix}`,
      knownName: codename,
      diameter: 172 + index * 36,
      duration: 42 + index * 10 + (seed % 6),
      delay: -index * 1.8,
      size: 14 + index * 3,
      tint: tints[index % tints.length],
    };
  });
};

const planetPaletteByClass: Record<WorldClassKey, { primary: string; secondary: string; accent: string }> = {
  alpha: { primary: "#4c7a43", secondary: "#7eb166", accent: "#3f5f3a" },
  gamma: { primary: "#315a7f", secondary: "#5f8ab1", accent: "#2a486c" },
  delta: { primary: "#5b5f6e", secondary: "#878d9d", accent: "#434957" },
  deltaTau: { primary: "#5a3f3f", secondary: "#7e5858", accent: "#3e2b2b" },
  epsilon: { primary: "#5c5e79", secondary: "#8b8faa", accent: "#3f4258" },
  eta: { primary: "#65557d", secondary: "#8f7ba8", accent: "#4a3c60" },
  mu: { primary: "#6e5c41", secondary: "#9e8764", accent: "#4f402a" },
  rho: { primary: "#345f8a", secondary: "#6194bf", accent: "#27496a" },
  phi: { primary: "#6b4f3a", secondary: "#9a7050", accent: "#4b3828" },
  phiLambda: { primary: "#4f6d4a", secondary: "#7d9a6f", accent: "#364f33" },
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

export function PlanetDetailPanel({ selection, onClose }: PlanetDetailPanelProps) {
  const { system, world } = selection;
  const { catalog } = useI18n();
  const classInfo = catalog.data.worldClassifications[world.classification];
  const profile = buildPlanetDetailProfile(system, world);
  const moonSpecs = useMemo(() => makeMoonSpecs(system, world), [system, world]);
  const planetPalette = planetPaletteByClass[world.classification];
  const owner = resolvePlanetOwner(system.faction, world);
  const [hoverBody, setHoverBody] = useState<string>(world.knownName);
  const panelCopy = catalog.ui.planetPanel;

  return (
    <>
      <Backdrop aria-label={panelCopy.closeOverlayAria} onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <Panel
        initial={{ x: 54, opacity: 0, filter: "blur(10px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ x: 42, opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        role="dialog"
        aria-label={panelCopy.dialogAria(world.knownName)}
      >
        <Header>
          <HeaderTopline>
            <Kicker>{panelCopy.kicker}</Kicker>
            <CloseButton type="button" onClick={onClose}>
              {panelCopy.close}
            </CloseButton>
          </HeaderTopline>
          <PlanetTitle>{world.knownName}</PlanetTitle>
          <Subtitle>{`${system.name} ${world.orbitalDesignation} - ${profile.sections[0]?.content ?? ""}`}</Subtitle>
          <ChipRow>
            <Chip>{classInfo.code}</Chip>
            <Chip>{classInfo.title}</Chip>
            <Chip>{owner}</Chip>
            <Chip tone={system.threat === "critical" ? "danger" : system.threat === "high" ? "warn" : "neutral"}>
              {panelCopy.systemThreat}: {system.threat}
            </Chip>
            {world.underSiege ? <Chip tone="danger">{panelCopy.underSiege}</Chip> : null}
            {world.underSedition ? <Chip tone="danger">{panelCopy.sedition}</Chip> : null}
          </ChipRow>
        </Header>

        <Content>
          <ColumnStack sticky>
            <ChartCard>
              <h3>{panelCopy.orbitalChart}</h3>
              <ChartViewport onMouseEnter={() => setHoverBody(world.knownName)} onMouseLeave={() => setHoverBody(world.knownName)}>
                <ChartLabel>{hoverBody}</ChartLabel>
                {moonSpecs.map((moon) => (
                  <OrbitRing key={`${moon.designation}-${moon.knownName}`} diameter={moon.diameter} duration={moon.duration} delay={moon.delay}>
                    <MoonBody
                      size={moon.size}
                      tint={moon.tint}
                      onMouseEnter={() => setHoverBody(panelCopy.moonHoverLabel(moon.designation, moon.knownName))}
                      onFocus={() => setHoverBody(panelCopy.moonHoverLabel(moon.designation, moon.knownName))}
                      onBlur={() => setHoverBody(world.knownName)}
                      aria-label={panelCopy.moonAriaLabel(moon.designation, moon.knownName)}
                    />
                  </OrbitRing>
                ))}
                <PlanetBody
                  primary={planetPalette.primary}
                  secondary={planetPalette.secondary}
                  accent={planetPalette.accent}
                  onMouseEnter={() => setHoverBody(world.knownName)}
                  onFocus={() => setHoverBody(world.knownName)}
                  aria-label={panelCopy.planetAriaLabel(world.knownName)}
                />
              </ChartViewport>
              <ChartFootnote>{moonSpecs.length === 0 ? panelCopy.noMoons : panelCopy.moonCount(moonSpecs.length)}</ChartFootnote>
            </ChartCard>

            <InfoCard>
              <h3>{panelCopy.infobox}</h3>
              <InfoList>
                {profile.infobox.map((entry) => (
                  <div key={entry.label}>
                    <dt>{entry.label}</dt>
                    <dd>{entry.value}</dd>
                  </div>
                ))}
              </InfoList>
            </InfoCard>
            <InfoCard>
              <h3>{panelCopy.operationalMetrics}</h3>
              <MetricsGrid>
                {profile.metrics.map((metric) => (
                  <MetricCard key={metric.label} tone={metric.tone}>
                    <strong>{metric.label}</strong>
                    <span>{metric.value}</span>
                  </MetricCard>
                ))}
              </MetricsGrid>
            </InfoCard>
          </ColumnStack>

          <ColumnStack>
            {profile.sections.map((section) => (
              <LoreSection key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.content}</p>
              </LoreSection>
            ))}
            <LoreSection>
              <h3>{panelCopy.campaignNotes}</h3>
              <NotesList>
                {profile.campaignNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </NotesList>
            </LoreSection>
          </ColumnStack>
        </Content>
      </Panel>
    </>
  );
}
