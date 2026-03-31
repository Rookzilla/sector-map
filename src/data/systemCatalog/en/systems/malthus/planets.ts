import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_malthus_I_Shale } from "./planets/i-shale";
import { planet as planet_malthus_V_Vesper_Oss } from "./planets/v-vesper-oss";

const planetByKey: Record<string, World> = {
  "malthus:Shale": planet_malthus_I_Shale,
  "malthus:Vesper Oss": planet_malthus_V_Vesper_Oss,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
