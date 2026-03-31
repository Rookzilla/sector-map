import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_lyra_span_I_Urk_Prime } from "./planets/i-urk-prime";
import { planet as planet_lyra_span_III_Gorath } from "./planets/iii-gorath";

const planetByKey: Record<string, World> = {
  "lyra-span:Urk Prime": planet_lyra_span_I_Urk_Prime,
  "lyra-span:Gorath": planet_lyra_span_III_Gorath,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
