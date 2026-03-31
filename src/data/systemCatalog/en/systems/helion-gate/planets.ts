import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_helion_gate_I_Infernus } from "./planets/i-infernus";
import { planet as planet_helion_gate_II_Carthago } from "./planets/ii-carthago";
import { planet as planet_helion_gate_III_Alecto } from "./planets/iii-alecto";
import { planet as planet_helion_gate_V_Ashrot } from "./planets/v-ashrot";

const planetByKey: Record<string, World> = {
  "helion-gate:Infernus": planet_helion_gate_I_Infernus,
  "helion-gate:Carthago": planet_helion_gate_II_Carthago,
  "helion-gate:Alecto": planet_helion_gate_III_Alecto,
  "helion-gate:Ashrot": planet_helion_gate_V_Ashrot,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
