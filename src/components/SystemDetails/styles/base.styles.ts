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
  min-height: 0;
  height: var(--map-pane-height);

  @media (max-width: 1280px) {
    height: auto;
  }

  @media (max-width: 700px) {
    gap: 12px;
  }
`;

export const DetailPanel = styled(motion.article)`
  ${panelSurfaceStyles}
  flex: 1;
  min-height: 0;
  border-radius: 30px;
  padding: 28px;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(132, 198, 255, 0.62) rgba(8, 18, 38, 0.72);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(8, 18, 38, 0.72);
    border-radius: 999px;
    border: 1px solid rgba(126, 176, 255, 0.14);
    margin: 32px 4px 32px 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 2px solid rgba(8, 18, 38, 0.72);
    background: linear-gradient(180deg, rgba(112, 190, 255, 0.86), rgba(86, 142, 225, 0.9));
    box-shadow: 0 0 10px rgba(108, 186, 255, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(139, 212, 255, 0.94), rgba(104, 164, 242, 0.96));
  }

  @media (max-height: 940px) {
    padding: 22px;
  }

  @media (max-width: 700px) {
    border-radius: 20px;
    padding: 14px;

    .system-summary {
      display: none;
    }

    .meta-star-age,
    .meta-astral-note {
      display: none;
    }

    .system-meta-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
  }
`;

export const EmptyDetailPanel = styled(motion.article)`
  ${panelSurfaceStyles}
  flex: 1;
  min-height: 0;
  border-radius: 30px;
  padding: 28px;
  display: grid;
  align-content: center;
  gap: 10px;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(132, 198, 255, 0.62) rgba(8, 18, 38, 0.72);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(8, 18, 38, 0.72);
    border-radius: 999px;
    border: 1px solid rgba(126, 176, 255, 0.14);
    margin: 32px 4px 32px 0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 2px solid rgba(8, 18, 38, 0.72);
    background: linear-gradient(180deg, rgba(112, 190, 255, 0.86), rgba(86, 142, 225, 0.9));
    box-shadow: 0 0 10px rgba(108, 186, 255, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(139, 212, 255, 0.94), rgba(104, 164, 242, 0.96));
  }

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

  @media (max-width: 700px) {
    border-radius: 20px;
    padding: 16px 14px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  min-width: 0;

  > div {
    min-width: 0;
  }

  h2 {
    margin: 10px 0 0;
    font-family: "Cinzel Decorative", serif;
    letter-spacing: 0.05em;
    font-size: clamp(2rem, 3vw, 3rem);
  }

  @media (max-width: 980px) {
    flex-direction: column;
  }

  @media (max-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;

    h2 {
      margin-top: 6px;
      font-size: clamp(1.7rem, 8vw, 2.15rem);
      white-space: nowrap;
      line-height: 1;
    }
  }
`;

export const Threat = styled.p<{ level: ThreatLevel }>`
  font-family: "Space Grotesk", sans-serif;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.72rem;
  color: ${({ level }) => threatColor[level]};

  @media (max-width: 700px) {
    font-size: 0.62rem;
    letter-spacing: 0.16em;
  }
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
  flex-shrink: 0;
  align-self: flex-start;

  @media (max-width: 700px) {
    padding: 7px 10px;
    font-size: 0.72rem;
  }
`;

export const DetailSummary = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin: 18px 0 26px;
  color: #96a7c7;
  line-height: 1.7;

  @media (max-width: 700px) {
    margin: 12px 0 14px;
    font-size: 0.88rem;
    line-height: 1.5;
  }
`;

export const StarMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 18px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 700px) {
    margin-bottom: 12px;
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

  @media (max-width: 700px) {
    padding: 8px 10px;

    strong {
      font-size: 0.64rem;
      margin-bottom: 4px;
    }

    span {
      font-size: 0.82rem;
      line-height: 1.35;
      word-break: break-word;
    }
  }
`;
