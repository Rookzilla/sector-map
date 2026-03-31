import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_aegis_prime_I_Castrum } from "./planets/i-castrum";
import { planet as planet_aegis_prime_III_Medea } from "./planets/iii-medea";

const planetByKey: Record<string, World> = {
  "aegis-prime:Castrum": planet_aegis_prime_I_Castrum,
  "aegis-prime:Medea": planet_aegis_prime_III_Medea,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
