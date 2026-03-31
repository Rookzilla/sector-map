import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_mykene_II_Heliad } from "./planets/ii-heliad";
import { planet as planet_mykene_IV_Anker } from "./planets/iv-anker";

const planetByKey: Record<string, World> = {
  "mykene:Heliad": planet_mykene_II_Heliad,
  "mykene:Anker": planet_mykene_IV_Anker,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
