import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { panelSurfaceStyles } from "../../../common/styles/panelStyles";
import { type ThreatLevel } from "../../../data/systems";

const threatColor: Record<ThreatLevel, string> = {
  low: "#7cf7c5",
  medium: "#6be7ff",
  high: "#ffcb6b",
  critical: "#ff7d95",
};

export const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DetailPanel = styled(motion.article)`
  ${panelSurfaceStyles}
  flex: 1;
  border-radius: 30px;
  padding: 28px;
`;

export const EmptyDetailPanel = styled(motion.article)`
  ${panelSurfaceStyles}
  flex: 1;
  border-radius: 30px;
  padding: 28px;
  display: grid;
  align-content: center;
  gap: 10px;

  h2 {
    margin: 0;
    font-family: "Cinzel Decorative", serif;
    font-size: clamp(1.6rem, 2.2vw, 2.2rem);
  }

  p {
    margin: 0;
    color: #96a7c7;
    font-family: "Space Grotesk", sans-serif;
    line-height: 1.6;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;

  h2 {
    margin: 10px 0 0;
    font-family: "Cinzel Decorative", serif;
    letter-spacing: 0.05em;
    font-size: clamp(2rem, 3vw, 3rem);
  }

  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

export const Threat = styled.p<{ level: ThreatLevel }>`
  font-family: "Space Grotesk", sans-serif;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.72rem;
  color: ${({ level }) => threatColor[level]};
`;

export const FactionChip = styled.span`
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(126, 222, 255, 0.08);
  border: 1px solid rgba(126, 222, 255, 0.18);
  color: #dff7ff;
  font-family: "Cinzel Decorative", serif;
  letter-spacing: 0.04em;
  white-space: nowrap;
`;

export const DetailSummary = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin: 18px 0 26px;
  color: #96a7c7;
  line-height: 1.7;
`;

export const StarMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StarMetaCard = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(13, 22, 45, 0.72);
  border: 1px solid rgba(126, 176, 255, 0.16);

  strong {
    font-family: "Space Grotesk", sans-serif;
    display: block;
    margin-bottom: 6px;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9ed7ff;
  }

  span {
    font-family: "Space Grotesk", sans-serif;
    color: #e3eeff;
    font-size: 0.9rem;
  }
`;
