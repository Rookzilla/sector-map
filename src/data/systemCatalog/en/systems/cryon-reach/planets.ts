import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_cryon_reach_I_Kroadaria } from "./planets/i-kroadaria";
import { planet as planet_cryon_reach_IV_Ruinfall } from "./planets/iv-ruinfall";

const planetByKey: Record<string, World> = {
  "cryon-reach:Kroadaria": planet_cryon_reach_I_Kroadaria,
  "cryon-reach:Ruinfall": planet_cryon_reach_IV_Ruinfall,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
