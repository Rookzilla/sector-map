import { systems } from "./systems";
import { buildPlanetDetailProfile } from "./planetProfile";

describe("en planet profile", () => {
  it("uses planet-local dossier unique fact when present", () => {
    const system = systems.find((candidate) => candidate.id === "helion-gate");
    const world = system?.worlds.find((candidate) => candidate.knownName === "Infernus");
    expect(system).toBeDefined();
    expect(world).toBeDefined();

    const profile = buildPlanetDetailProfile(system!, world!);
    const uniqueFact = profile.infobox.find((entry) => entry.label === "Unique Fact");
    expect(uniqueFact?.value).toContain("Infernus pit-abbeys");
  });

  it("uses planet-local interdependence override when present", () => {
    const system = systems.find((candidate) => candidate.id === "xandros");
    const world = system?.worlds.find((candidate) => candidate.knownName === "Xandrosia");
    expect(system).toBeDefined();
    expect(world).toBeDefined();

    const profile = buildPlanetDetailProfile(system!, world!);
    const logistics = profile.sections.find((section) => section.title === "Logistics Posture");
    expect(logistics?.content).toContain("asynchronous Agamemnon windows");
  });
});
