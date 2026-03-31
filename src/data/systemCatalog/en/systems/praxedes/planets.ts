import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_praxedes_I_Ruk } from "./planets/i-ruk";
import { planet as planet_praxedes_II_Morka_s_Yard } from "./planets/ii-morka-s-yard";

const planetByKey: Record<string, World> = {
  "praxedes:Ruk": planet_praxedes_I_Ruk,
  "praxedes:Morka's Yard": planet_praxedes_II_Morka_s_Yard,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
