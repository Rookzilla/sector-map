import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_satrapa_I_Korin } from "./planets/i-korin";
import { planet as planet_satrapa_V_Harrow_Deep } from "./planets/v-harrow-deep";

const planetByKey: Record<string, World> = {
  "satrapa:Korin": planet_satrapa_I_Korin,
  "satrapa:Harrow Deep": planet_satrapa_V_Harrow_Deep,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
