import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_tessarion_I_Scoria } from "./planets/i-scoria";
import { planet as planet_tessarion_II_Bracken } from "./planets/ii-bracken";
import { planet as planet_tessarion_X_Snowball } from "./planets/x-snowball";

const planetByKey: Record<string, World> = {
  "tessarion:Scoria": planet_tessarion_I_Scoria,
  "tessarion:Bracken": planet_tessarion_II_Bracken,
  "tessarion:Snowball": planet_tessarion_X_Snowball,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
