import styled from "@emotion/styled";
import { type PlanetOwnerFaction } from "../../../data/systems";

export const IntelLine = styled.p`
  font-family: "Space Grotesk", sans-serif;
  margin-top: 10px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #cde2ff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;

  strong {
    font-family: "Space Grotesk", sans-serif;
    color: #f1f6ff;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .intel-owner {
    margin-left: auto;
  }
`;

export const IntelSubLine = styled(IntelLine)`
  margin-top: 6px;
`;

const ownerPalette: Record<PlanetOwnerFaction, { border: string; bg: string; text: string }> = {
  Imperium: { border: "rgba(135, 197, 255, 0.55)", bg: "rgba(34, 67, 116, 0.36)", text: "#d9ecff" },
  Chaos: { border: "rgba(255, 122, 122, 0.6)", bg: "rgba(110, 34, 34, 0.34)", text: "#ffd7d7" },
  Renegade: { border: "rgba(248, 171, 102, 0.6)", bg: "rgba(122, 76, 34, 0.34)", text: "#ffe3c7" },
  Greenskin: { border: "rgba(151, 230, 149, 0.6)", bg: "rgba(45, 97, 39, 0.34)", text: "#ddffdc" },
  Xenos: { border: "rgba(195, 130, 255, 0.66)", bg: "rgba(82, 42, 128, 0.38)", text: "#f0ddff" },
};

export const OwnerPill = styled.span<{ owner: PlanetOwnerFaction }>`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  padding: 4px 9px;
  margin-right: 4px;
  border-radius: 999px;
  border: 1px solid ${({ owner }) => ownerPalette[owner].border};
  background: ${({ owner }) => ownerPalette[owner].bg};
  color: ${({ owner }) => ownerPalette[owner].text};
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.74rem;
  letter-spacing: 0.03em;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 42%;
    left: -50%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));
    transform: skewX(-18deg);
    pointer-events: none;
    opacity: 0;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 0;
    animation: none;
  }

  &:hover,
  &:focus-visible {
    box-shadow: none;
  }

  .world-card:hover &::after,
  .world-card:focus-within &::after {
    opacity: 1;
    animation: owner-sheen 4s ease-in-out infinite;
  }

  .world-card:hover &,
  .world-card:focus-within & {
    box-shadow: 0 0 0 1px ${({ owner }) => ownerPalette[owner].border}, 0 0 12px ${({ owner }) => ownerPalette[owner].border};
  }

  @keyframes owner-sheen {
    0% {
      left: -50%;
      opacity: 0;
    }
    22% {
      opacity: 0.45;
    }
    48% {
      left: 130%;
      opacity: 0;
    }
    100% {
      left: 130%;
      opacity: 0;
    }
  }
`;
