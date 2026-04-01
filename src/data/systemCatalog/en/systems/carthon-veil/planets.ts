import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_carthon_veil_II_Silberheim } from "./planets/ii-silberheim";
import { planet as planet_carthon_veil_IV_Pella } from "./planets/iv-pella";

const planetByKey: Record<string, World> = {
  "carthon-veil:Silberheim": planet_carthon_veil_II_Silberheim,
  "carthon-veil:Pella": planet_carthon_veil_IV_Pella,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
