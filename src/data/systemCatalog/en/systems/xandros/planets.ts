import { type World } from "../../../../systems";
import { planetOrder } from "./planetOrder";
import { planet as planet_xandros_XIV_Xandrosia } from "./planets/xiv-xandrosia";
import { planet as planet_xandros_XV_Kryost } from "./planets/xv-kryost";

const planetByKey: Record<string, World> = {
  "xandros:Xandrosia": planet_xandros_XIV_Xandrosia,
  "xandros:Kryost": planet_xandros_XV_Kryost,
};

export const worlds: World[] = planetOrder.map((key) => planetByKey[key]);
