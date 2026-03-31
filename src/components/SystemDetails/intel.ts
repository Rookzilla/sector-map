import { type PlanetOwnerFaction, type SpaceFaction, type World } from "../../data/systems";

type IntelCopy = {
  factionIntelLabels: {
    imperialGuardRegiment: string;
    rulingWarband: string;
    primaryBelligerents: string;
    knownWarboss: string;
    renegadeCommander: string;
    xenosAuthority: string;
    planetaryGovernor: string;
    patronWorship: string;
  };
  intelFallbacks: {
    noStandingRegiment: string;
    regimentRedacted: string;
    traitorUnconfirmed: string;
    noDominantWarboss: string;
    renegadeFragmented: string;
    imperialHostileContest: string;
    imperialGarrisonUnknown: string;
    traitorActivityConfirmed: string;
    renegadeCellsContest: string;
    greenskinRaidersHold: string;
    xenosCommandUnknown: string;
    governorUnknown: string;
    chaosUndivided: string;
  };
};

export const getIntelLabel = (faction: SpaceFaction, world: World, copy: IntelCopy) => {
  const factionIntelLabel: Record<SpaceFaction, string> = {
    Imperium: copy.factionIntelLabels.imperialGuardRegiment,
    Chaos: copy.factionIntelLabels.rulingWarband,
    Contested: copy.factionIntelLabels.primaryBelligerents,
    Greenskin: copy.factionIntelLabels.knownWarboss,
    Renegade: copy.factionIntelLabels.renegadeCommander,
  };

  const ownerIntelLabel: Record<PlanetOwnerFaction, string> = {
    Imperium: copy.factionIntelLabels.imperialGuardRegiment,
    Chaos: copy.factionIntelLabels.rulingWarband,
    Renegade: copy.factionIntelLabels.renegadeCommander,
    Greenskin: copy.factionIntelLabels.knownWarboss,
    Xenos: copy.factionIntelLabels.xenosAuthority,
  };

  if (faction === "Contested" && world.ownerFaction) {
    return ownerIntelLabel[world.ownerFaction];
  }

  return factionIntelLabel[faction];
};

export const getFactionIntel = (faction: SpaceFaction, world: World, copy: IntelCopy) => {
  if (faction === "Imperium") {
    if (world.classification === "rho" || world.classification === "delta") {
      return copy.intelFallbacks.noStandingRegiment;
    }
    return world.imperialRegiment ?? copy.intelFallbacks.regimentRedacted;
  }

  if (faction === "Chaos") {
    return world.rulingWarband ?? copy.intelFallbacks.traitorUnconfirmed;
  }

  if (faction === "Greenskin") {
    return world.warboss ?? copy.intelFallbacks.noDominantWarboss;
  }

  if (faction === "Renegade") {
    return world.renegadeCommander ?? copy.intelFallbacks.renegadeFragmented;
  }

  if (faction === "Contested") {
    if (world.ownerFaction === "Imperium") {
      return world.imperialRegiment ?? copy.intelFallbacks.imperialGarrisonUnknown;
    }

    if (world.ownerFaction === "Chaos") {
      return world.rulingWarband ?? copy.intelFallbacks.traitorActivityConfirmed;
    }

    if (world.ownerFaction === "Renegade") {
      return world.renegadeCommander ?? copy.intelFallbacks.renegadeCellsContest;
    }

    if (world.ownerFaction === "Greenskin") {
      return world.warboss ?? copy.intelFallbacks.greenskinRaidersHold;
    }

    if (world.ownerFaction === "Xenos") {
      return world.xenosAuthority ?? copy.intelFallbacks.xenosCommandUnknown;
    }
  }

  return copy.intelFallbacks.imperialHostileContest;
};

export const getSecondaryIntel = (faction: SpaceFaction, world: World, copy: IntelCopy) => {
  if (faction === "Imperium") {
    return {
      label: copy.factionIntelLabels.planetaryGovernor,
      value: world.governor ?? copy.intelFallbacks.governorUnknown,
    };
  }

  if (faction === "Chaos") {
    return {
      label: copy.factionIntelLabels.patronWorship,
      value: world.patronWorship ?? copy.intelFallbacks.chaosUndivided,
    };
  }

  return null;
};

export const resolvePlanetOwner = (systemFaction: SpaceFaction, world: World): PlanetOwnerFaction => {
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
