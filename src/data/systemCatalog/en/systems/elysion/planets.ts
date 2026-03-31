import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_elysion_I_Ionia } from "./planets/i-ionia";
import { planet as planet_elysion_III_Prax } from "./planets/iii-prax";

const planetByKey: Record<string, World> = {
  "elysion:Ionia": planet_elysion_I_Ionia,
  "elysion:Prax": planet_elysion_III_Prax,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
