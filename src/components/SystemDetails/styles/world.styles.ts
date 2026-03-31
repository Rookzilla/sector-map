import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { type Climate } from "../../../data/systems";

const climatePalette: Record<Climate, { bg: string; border: string; text: string }> = {
  Temperate: { bg: "rgba(91, 184, 120, 0.2)", border: "rgba(126, 231, 163, 0.35)", text: "#b7ffcf" },
  Arcapelago: { bg: "rgba(69, 161, 222, 0.2)", border: "rgba(109, 200, 255, 0.35)", text: "#bfeaff" },
  Ocean: { bg: "rgba(47, 126, 207, 0.24)", border: "rgba(98, 176, 255, 0.35)", text: "#b0daff" },
  Forest: { bg: "rgba(55, 145, 88, 0.25)", border: "rgba(91, 198, 130, 0.4)", text: "#baf0ca" },
  Tundra: { bg: "rgba(107, 143, 171, 0.24)", border: "rgba(167, 205, 230, 0.35)", text: "#d4e8f8" },
  Ice: { bg: "rgba(148, 191, 226, 0.2)", border: "rgba(189, 227, 255, 0.4)", text: "#e5f6ff" },
  Desert: { bg: "rgba(181, 129, 72, 0.25)", border: "rgba(233, 177, 112, 0.42)", text: "#ffdcb3" },
  Savannah: { bg: "rgba(165, 145, 73, 0.24)", border: "rgba(223, 204, 113, 0.4)", text: "#f8e9ac" },
  Barren: { bg: "rgba(118, 118, 132, 0.24)", border: "rgba(178, 180, 196, 0.35)", text: "#e0e3f0" },
  "No Atmosphere": { bg: "rgba(73, 81, 104, 0.24)", border: "rgba(130, 148, 185, 0.36)", text: "#c6d2ed" },
};

export const WorldList = styled.div`
  display: grid;
  gap: 14px;
`;

const worldCardStyleProps = new Set(["highlighted", "selected"]);

export const WorldCard = styled(motion.div, {
  shouldForwardProp: (propName) => !worldCardStyleProps.has(propName as string),
})<{ highlighted: boolean; selected: boolean }>`
  padding: 16px 18px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(14, 25, 53, 0.88), rgba(8, 14, 31, 0.72));
  border: 1px solid rgba(126, 176, 255, 0.12);
  cursor: pointer;
  box-shadow: ${({ highlighted }) =>
    highlighted ? "0 0 0 1px rgba(120, 206, 255, 0.42), 0 0 26px rgba(120, 206, 255, 0.24)" : "none"};
  outline: ${({ selected }) => (selected ? "1px solid rgba(255, 210, 122, 0.75)" : "none")};
  transition: box-shadow 0.22s ease;

  p {
    font-family: "Space Grotesk", sans-serif;
    margin-bottom: 0;
    color: #96a7c7;
    line-height: 1.6;
  }
`;

export const WorldTopline = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 1fr) auto minmax(160px, 1fr);
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  strong {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.94rem;
    letter-spacing: 0.02em;
  }
`;

export const WorldDesignation = styled.strong`
  justify-self: start;
`;

export const KnownWorldName = styled.span`
  justify-self: center;
  color: #e5c67f;
  font-family: "Cinzel Decorative", serif;
  font-size: 1.08rem;
  letter-spacing: 0.04em;
`;

export const WorldClassBlock = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 8px;

  .class-title {
    font-family: "Space Grotesk", sans-serif;
    color: #bad3ff;
    font-size: 0.84rem;
    text-align: right;
    line-height: 1.3;
  }
`;

export const ClassBubble = styled.button<{ active: boolean }>`
  position: relative;
  overflow: hidden;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(180, 218, 255, 0.52);
  border-radius: 999px;
  background: rgba(25, 41, 83, 0.9);
  color: #d9ecff;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.72rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  box-shadow: ${({ active }) => (active ? "0 0 10px rgba(120, 206, 255, 0.45)" : "none")};
  border-color: ${({ active }) => (active ? "rgba(120, 206, 255, 0.82)" : "rgba(180, 218, 255, 0.52)")};
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    inset: -35%;
    background: radial-gradient(circle, rgba(146, 220, 255, 0.32), rgba(146, 220, 255, 0));
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scale(1);
    animation: bubble-pulse 1.4s ease-in-out infinite;
  }

  &:hover,
  &:focus-visible {
    background: rgba(44, 72, 128, 0.95);
  }

  @keyframes bubble-pulse {
    0% {
      opacity: 0.45;
    }
    50% {
      opacity: 0.92;
    }
    100% {
      opacity: 0.45;
    }
  }
`;

export const ClimateBadge = styled.span<{ climate: Climate }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  background: ${({ climate }) => climatePalette[climate].bg};
  border: 1px solid ${({ climate }) => climatePalette[climate].border};
  color: ${({ climate }) => climatePalette[climate].text};
`;

export const WorldBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const SeditionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  background: rgba(166, 25, 25, 0.26);
  border: 1px solid rgba(255, 110, 110, 0.5);
  color: #ffd2d2;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 46%;
    left: -52%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 176, 176, 0.28), rgba(255, 255, 255, 0));
    transform: skewX(-18deg);
    pointer-events: none;
  }

  &:hover::after,
  &:focus-visible::after {
    animation: none;
  }

  .world-card:hover &::after,
  .world-card:focus-within &::after {
    animation: conflict-sheen 4.4s ease-in-out infinite;
  }

  @keyframes conflict-sheen {
    0% {
      left: -52%;
      opacity: 0;
    }
    24% {
      opacity: 0.42;
    }
    52% {
      left: 130%;
      opacity: 0;
    }
    100% {
      left: 130%;
      opacity: 0;
    }
  }
`;

export const SiegeBadge = styled(SeditionBadge)`
  background: rgba(144, 22, 22, 0.26);
  border-color: rgba(255, 87, 87, 0.58);
  color: #ffd4d4;
`;
