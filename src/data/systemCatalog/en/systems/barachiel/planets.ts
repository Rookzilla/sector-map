import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_barachiel_II_Vespera } from "./planets/ii-vespera";
import { planet as planet_barachiel_IV_Civitas_Null } from "./planets/iv-civitas-null";

const planetByKey: Record<string, World> = {
  "barachiel:Vespera": planet_barachiel_II_Vespera,
  "barachiel:Civitas Null": planet_barachiel_IV_Civitas_Null,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
