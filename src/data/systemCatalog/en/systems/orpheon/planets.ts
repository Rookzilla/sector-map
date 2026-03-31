import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_orpheon_I_Hektor } from "./planets/i-hektor";
import { planet as planet_orpheon_II_Nysa } from "./planets/ii-nysa";

const planetByKey: Record<string, World> = {
  "orpheon:Hektor": planet_orpheon_I_Hektor,
  "orpheon:Nysa": planet_orpheon_II_Nysa,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
