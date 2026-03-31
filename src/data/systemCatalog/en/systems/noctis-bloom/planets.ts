import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_noctis_bloom_I_Crownfall } from "./planets/i-crownfall";
import { planet as planet_noctis_bloom_II_Orison } from "./planets/ii-orison";

const planetByKey: Record<string, World> = {
  "noctis-bloom:Crownfall": planet_noctis_bloom_I_Crownfall,
  "noctis-bloom:Orison": planet_noctis_bloom_II_Orison,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
