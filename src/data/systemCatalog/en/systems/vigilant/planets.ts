import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_vigilant_II_Lumen } from "./planets/ii-lumen";
import { planet as planet_vigilant_IV_Guangshua } from "./planets/iv-guangshua";

const planetByKey: Record<string, World> = {
  "vigilant:Lumen": planet_vigilant_II_Lumen,
  "vigilant:Guangshua": planet_vigilant_IV_Guangshua,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
