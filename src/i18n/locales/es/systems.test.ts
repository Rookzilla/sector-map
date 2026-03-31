import { systems } from "./systems";

describe("es systems catalog translation", () => {
  it("translates the Noctis Bloom system summary to Spanish", () => {
    const noctisBloom = systems.find((system) => system.id === "noctis-bloom");
    expect(noctisBloom).toBeDefined();
    expect(noctisBloom!.summary).toContain("bastion imperial reforzado");
  });

  it("translates Snowball status text to Spanish", () => {
    const tessarion = systems.find((system) => system.id === "tessarion");
    const snowball = tessarion?.worlds.find((world) => world.knownName === "Snowball");
    expect(snowball).toBeDefined();
    expect(snowball!.status).toContain("mundo de hielo de contrabandistas");
  });
});
