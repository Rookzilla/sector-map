import { systems } from "./systems";

describe("system catalog", () => {
  it("keeps Maximus planets in the expected ordered lineup", () => {
    const maximus = systems.find((system) => system.id === "helion-gate");
    expect(maximus).toBeDefined();

    const lineup = maximus!.worlds.map((world) => `${world.orbitalDesignation}:${world.knownName}`);
    expect(lineup).toEqual(["I:Infernus", "II:Carthago", "III:Alecto", "V:Ashrot"]);
  });

  it("keeps world keys unique across the full catalog", () => {
    const keys = systems.flatMap((system) => system.worlds.map((world) => `${system.id}:${world.knownName}`));
    expect(new Set(keys).size).toBe(keys.length);
  });
});
