import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_auric_null_I_Sepulcrum } from "./planets/i-sepulcrum";
import { planet as planet_auric_null_II_Tenebra } from "./planets/ii-tenebra";

const planetByKey: Record<string, World> = {
  "auric-null:Sepulcrum": planet_auric_null_I_Sepulcrum,
  "auric-null:Tenebra": planet_auric_null_II_Tenebra,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
