import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_ikarion_I_Astraeum } from "./planets/i-astraeum";
import { planet as planet_ikarion_III_Ferron } from "./planets/iii-ferron";

const planetByKey: Record<string, World> = {
  "ikarion:Astraeum": planet_ikarion_I_Astraeum,
  "ikarion:Ferron": planet_ikarion_III_Ferron,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
