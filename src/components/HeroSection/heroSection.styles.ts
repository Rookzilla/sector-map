import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { panelSurfaceStyles } from "../../common/styles/panelStyles";

export const HeroPanel = styled.section`
  display: flex;
`;

export const HeroCopy = styled(motion.div)`
  ${panelSurfaceStyles}
  border-radius: 28px;
  padding: 24px 30px;
  width: 100%;

  @media (max-height: 940px) {
    padding: 18px 22px;
  }
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

  @media (max-width: 700px) {
    display: none;
  }
`;

export const MobileLanguageDock = styled.div`
  display: none;

  @media (max-width: 700px) {
    position: sticky;
    bottom: 8px;
    z-index: 12;
    display: flex;
    justify-content: center;
    pointer-events: none;
    margin-top: 6px;
  }
`;

export const MobileLanguagePicker = styled(LanguagePicker)`
  @media (max-width: 700px) {
    display: inline-flex;
    pointer-events: auto;
    padding: 5px;
    background: rgba(7, 16, 36, 0.92);
    border-color: rgba(140, 190, 255, 0.32);
    box-shadow: 0 10px 24px rgba(2, 6, 15, 0.45);

    span {
      font-size: 0.66rem;
    }

    button {
      font-size: 0.72rem;
      padding: 5px 10px;
    }
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

  @media (max-width: 1200px) {
    white-space: normal;
    font-size: clamp(2.4rem, 7.5vw, 4.6rem);
  }

  @media (max-height: 940px) {
    margin: 8px 0 12px;
    font-size: clamp(2.1rem, 5vw, 3.5rem);
  }
`;

export const Lede = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin: 0;
  max-width: 56ch;
  color: #96a7c7;
  font-size: 1rem;
  line-height: 1.7;

  @media (max-height: 940px) {
    font-size: 0.94rem;
    line-height: 1.55;
  }
`;
