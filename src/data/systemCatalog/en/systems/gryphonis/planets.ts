import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_gryphonis_I_Ragmouth } from "./planets/i-ragmouth";
import { planet as planet_gryphonis_III_Zubzaria } from "./planets/iii-zubzaria";

const planetByKey: Record<string, World> = {
  "gryphonis:Ragmouth": planet_gryphonis_I_Ragmouth,
  "gryphonis:Zubzaria": planet_gryphonis_III_Zubzaria,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
