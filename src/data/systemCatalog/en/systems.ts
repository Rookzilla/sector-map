import { type StarSystem } from "../../systems";
import { systemOrder } from "./systemOrder";
import { system as system_aegis_prime } from "./systems/aegis-prime";
import { system as system_auric_null } from "./systems/auric-null";
import { system as system_barachiel } from "./systems/barachiel";
import { system as system_carthon_veil } from "./systems/carthon-veil";
import { system as system_cryon_reach } from "./systems/cryon-reach";
import { system as system_drakonis } from "./systems/drakonis";
import { system as system_elysion } from "./systems/elysion";
import { system as system_gryphonis } from "./systems/gryphonis";
import { system as system_helion_gate } from "./systems/helion-gate";
import { system as system_ikarion } from "./systems/ikarion";
import { system as system_kharon } from "./systems/kharon";
import { system as system_lyra_span } from "./systems/lyra-span";
import { system as system_malthus } from "./systems/malthus";
import { system as system_mykene } from "./systems/mykene";
import { system as system_noctis_bloom } from "./systems/noctis-bloom";
import { system as system_orpheon } from "./systems/orpheon";
import { system as system_praxedes } from "./systems/praxedes";
import { system as system_satrapa } from "./systems/satrapa";
import { system as system_tessarion } from "./systems/tessarion";
import { system as system_vesper_drift } from "./systems/vesper-drift";
import { system as system_vigilant } from "./systems/vigilant";
import { system as system_xandros } from "./systems/xandros";

const systemById: Record<string, StarSystem> = {
  "aegis-prime": system_aegis_prime,
  "auric-null": system_auric_null,
  "barachiel": system_barachiel,
  "carthon-veil": system_carthon_veil,
  "cryon-reach": system_cryon_reach,
  "drakonis": system_drakonis,
  "elysion": system_elysion,
  "gryphonis": system_gryphonis,
  "helion-gate": system_helion_gate,
  "ikarion": system_ikarion,
  "kharon": system_kharon,
  "lyra-span": system_lyra_span,
  "malthus": system_malthus,
  "mykene": system_mykene,
  "noctis-bloom": system_noctis_bloom,
  "orpheon": system_orpheon,
  "praxedes": system_praxedes,
  "satrapa": system_satrapa,
  "tessarion": system_tessarion,
  "vesper-drift": system_vesper_drift,
  "vigilant": system_vigilant,
  "xandros": system_xandros,
};

export const systems: StarSystem[] = systemOrder.map((id) => systemById[id]);
