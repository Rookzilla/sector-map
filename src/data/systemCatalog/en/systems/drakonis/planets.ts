import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_drakonis_I_Skrap } from "./planets/i-skrap";
import { planet as planet_drakonis_II_Mekhold } from "./planets/ii-mekhold";

const planetByKey: Record<string, World> = {
  "drakonis:Skrap": planet_drakonis_I_Skrap,
  "drakonis:Mekhold": planet_drakonis_II_Mekhold,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
