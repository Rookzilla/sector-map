import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_kharon_I_Acher } from "./planets/i-acher";
import { planet as planet_kharon_II_Black_Pyre } from "./planets/ii-black-pyre";

const planetByKey: Record<string, World> = {
  "kharon:Acher": planet_kharon_I_Acher,
  "kharon:Black Pyre": planet_kharon_II_Black_Pyre,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
