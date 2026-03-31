import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_vesper_drift_I_Eidon } from "./planets/i-eidon";
import { planet as planet_vesper_drift_III_Karsis } from "./planets/iii-karsis";

const planetByKey: Record<string, World> = {
  "vesper-drift:Eidon": planet_vesper_drift_I_Eidon,
  "vesper-drift:Karsis": planet_vesper_drift_III_Karsis,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
