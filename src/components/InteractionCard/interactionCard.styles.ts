import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { panelSurfaceStyles } from "../../common/styles/panelStyles";

export const Card = styled(motion.div)`
  ${panelSurfaceStyles}
  border-radius: 24px;
  padding: 24px;

  span {
    text-transform: uppercase;
    letter-spacing: 0.22em;
    font-size: 0.72rem;
    color: #6be7ff;
  }

  p {
    font-family: "Space Grotesk", sans-serif;
    margin-bottom: 0;
    color: #96a7c7;
    line-height: 1.6;
  }
`;
