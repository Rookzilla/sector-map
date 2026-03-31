import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { panelSurfaceStyles } from "../../common/styles/panelStyles";

export const HeroPanel = styled.section`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.8fr);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const HeroCopy = styled(motion.div)`
  ${panelSurfaceStyles}
  border-radius: 28px;
  padding: 28px 32px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const LanguagePicker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid rgba(126, 176, 255, 0.25);
  background: rgba(15, 26, 51, 0.65);

  span {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #88cfff;
    padding-left: 8px;
  }

  button {
    border: 0;
    border-radius: 999px;
    padding: 4px 10px;
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.74rem;
    cursor: pointer;
    color: #dceeff;
    background: transparent;
  }

  button.active {
    background: rgba(107, 186, 255, 0.24);
    color: #eff7ff;
  }
`;

export const Eyebrow = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.72rem;
  color: #6be7ff;
`;

export const Title = styled.h1`
  margin: 10px 0 16px;
  max-width: none;
  white-space: nowrap;
  font-family: "Cinzel Decorative", serif;
  font-size: clamp(2.8rem, 7vw, 5.8rem);
  line-height: 1;
`;

export const Lede = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin: 0;
  max-width: 56ch;
  color: #96a7c7;
  font-size: 1rem;
  line-height: 1.7;
`;

export const StatusCard = styled(motion.aside)`
  ${panelSurfaceStyles}
  border-radius: 24px;
  padding: 24px;

  span {
    font-family: "Space Grotesk", sans-serif;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    font-size: 0.72rem;
    color: #6be7ff;
  }

  strong {
    display: block;
    font-family: "Space Grotesk", sans-serif;
    margin-top: 12px;
    font-size: 1.5rem;
  }

  p {
    font-family: "Space Grotesk", sans-serif;
    color: #96a7c7;
    line-height: 1.7;
  }
`;
