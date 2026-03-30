import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { panelSurfaceStyles } from "../../common/styles/panelStyles";

export const Backdrop = styled(motion.button)`
  position: fixed;
  inset: 0;
  border: 0;
  padding: 0;
  background: rgba(4, 8, 18, 0.58);
  backdrop-filter: blur(2px);
  z-index: 30;
`;

export const Panel = styled(motion.aside)`
  ${panelSurfaceStyles}
  position: fixed;
  top: 10px;
  right: 10px;
  bottom: 10px;
  width: min(1120px, calc(100vw - 20px));
  border-radius: 24px;
  z-index: 31;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.header`
  padding: 16px;
  border-bottom: 1px solid rgba(130, 186, 255, 0.18);
  background:
    radial-gradient(circle at 12% 0%, rgba(119, 178, 255, 0.16), transparent 40%),
    linear-gradient(180deg, rgba(13, 24, 50, 0.92), rgba(8, 15, 31, 0.72));
`;

export const HeaderTopline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const Kicker = styled.p`
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #7fd7ff;
  font-size: 0.72rem;
`;

export const CloseButton = styled.button`
  border: 1px solid rgba(138, 190, 255, 0.35);
  background: rgba(18, 35, 72, 0.75);
  color: #def2ff;
  border-radius: 999px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.78rem;
  padding: 6px 12px;
  cursor: pointer;
`;

export const PlanetTitle = styled.h2`
  margin: 8px 0 4px;
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(1.3rem, 2vw, 1.72rem);
  font-weight: 600;
  letter-spacing: 0.01em;
  color: #e8f2ff;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  color: #afc5ea;
  line-height: 1.55;
  max-width: 100ch;
`;

export const ChipRow = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.span<{ tone?: "neutral" | "good" | "warn" | "danger" }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 9px;
  border-radius: 999px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.74rem;
  border: 1px solid
    ${({ tone }) =>
      tone === "good"
        ? "rgba(126, 231, 163, 0.45)"
        : tone === "warn"
          ? "rgba(255, 209, 139, 0.48)"
          : tone === "danger"
            ? "rgba(255, 128, 128, 0.5)"
            : "rgba(150, 193, 255, 0.45)"};
  background: ${({ tone }) =>
    tone === "good"
      ? "rgba(64, 125, 76, 0.26)"
      : tone === "warn"
        ? "rgba(126, 92, 41, 0.24)"
        : tone === "danger"
          ? "rgba(128, 31, 31, 0.28)"
          : "rgba(43, 67, 114, 0.26)"};
  color: ${({ tone }) =>
    tone === "good" ? "#cfffe0" : tone === "warn" ? "#ffe7c3" : tone === "danger" ? "#ffd2d2" : "#dcecff"};
`;

export const Content = styled.div`
  padding: 16px;
  overflow: auto;
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(340px, 1fr) minmax(0, 1.75fr);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ColumnStack = styled.div<{ sticky?: boolean }>`
  display: grid;
  gap: 16px;

  ${({ sticky }) =>
    sticky
      ? `
    position: sticky;
    top: 0;
    align-self: start;

    @media (max-width: 980px) {
      position: static;
    }
  `
      : ""}
`;

export const InfoCard = styled.section`
  border-radius: 16px;
  border: 1px solid rgba(133, 186, 255, 0.2);
  background: linear-gradient(180deg, rgba(10, 20, 40, 0.76), rgba(8, 15, 31, 0.6));
  padding: 16px;

  h3 {
    margin: 0 0 10px;
    font-family: "Space Grotesk", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
    color: #8fc8ff;
    font-weight: 600;
  }
`;

export const InfoList = styled.dl`
  margin: 0;
  display: grid;
  gap: 8px;

  dt {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #8fc8ff;
  }

  dd {
    margin: 2px 0 0;
    font-family: "Space Grotesk", sans-serif;
    color: #dce8ff;
    line-height: 1.45;
  }
`;

export const MetricsGrid = styled.section`
  display: grid;
  gap: 8px;
`;

export const MetricCard = styled.div<{ tone?: "neutral" | "good" | "warn" | "danger" }>`
  border-radius: 12px;
  border: 1px solid rgba(128, 177, 245, 0.2);
  background: rgba(8, 16, 33, 0.62);
  padding: 10px 12px;
  box-shadow: ${({ tone }) =>
    tone === "danger"
      ? "0 0 0 1px rgba(255, 128, 128, 0.25) inset"
      : tone === "good"
        ? "0 0 0 1px rgba(123, 236, 157, 0.22) inset"
        : "none"};

  strong {
    display: block;
    font-family: "Space Grotesk", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.7rem;
    color: #90c6ff;
    margin-bottom: 4px;
  }

  span {
    font-family: "Space Grotesk", sans-serif;
    color: #e4eeff;
    font-size: 0.9rem;
  }
`;

export const LoreSection = styled.article`
  border-radius: 16px;
  border: 1px solid rgba(132, 184, 255, 0.2);
  background: linear-gradient(180deg, rgba(10, 20, 40, 0.76), rgba(8, 15, 31, 0.6));
  padding: 16px;
  transition:
    border-color 0.22s ease,
    transform 0.22s ease;

  &:hover {
    border-color: rgba(165, 210, 255, 0.36);
    transform: translateY(-1px);
  }

  h3 {
    margin: 0 0 8px;
    font-family: "Space Grotesk", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8rem;
    color: #8fc8ff;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-family: "Space Grotesk", sans-serif;
    line-height: 1.65;
    color: #c9d9f2;
  }
`;

export const NotesList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;

  li {
    font-family: "Space Grotesk", sans-serif;
    line-height: 1.6;
    color: #ccddf5;
  }
`;

export const ChartCard = styled(InfoCard)`
  padding: 16px;
`;

export const ChartViewport = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.15 / 1;
  border-radius: 14px;
  border: 1px solid rgba(125, 183, 255, 0.2);
  background:
    radial-gradient(circle at 40% 25%, rgba(122, 186, 255, 0.2), transparent 50%),
    radial-gradient(circle at 75% 70%, rgba(199, 108, 255, 0.14), transparent 45%),
    linear-gradient(180deg, rgba(8, 14, 30, 0.95), rgba(5, 10, 22, 0.98));
  overflow: hidden;
`;

export const ChartFootnote = styled.p`
  margin: 8px 0 0;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.76rem;
  color: #9cb6da;
  line-height: 1.45;
`;

export const ChartLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 4;
  padding: 5px 8px;
  border-radius: 999px;
  border: 1px solid rgba(143, 201, 255, 0.5);
  background: rgba(14, 29, 58, 0.82);
  color: #e1f3ff;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.74rem;
  letter-spacing: 0.02em;
`;

export const PlanetBody = styled.button<{ primary: string; secondary: string; accent: string }>`
  position: absolute;
  inset: 50%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 28% 28%, rgba(255, 255, 255, 0.42), transparent 34%),
    linear-gradient(120deg, ${({ primary }) => primary} 0%, ${({ secondary }) => secondary} 45%, ${({ accent }) => accent} 100%);
  box-shadow:
    0 0 0 6px rgba(114, 172, 255, 0.08),
    0 0 32px rgba(102, 168, 255, 0.42);
  transition: transform 0.2s ease;
  z-index: 2;

  &:hover,
  &:focus-visible {
    transform: translate(-50%, -50%) scale(1.03);
  }

  &::before {
    content: "";
    position: absolute;
    inset: -18%;
    border-radius: 999px;
    background:
      conic-gradient(
        from 0deg,
        rgba(84, 130, 173, 0.15) 0deg,
        rgba(172, 117, 84, 0.35) 72deg,
        rgba(83, 127, 168, 0.12) 146deg,
        rgba(170, 128, 92, 0.33) 238deg,
        rgba(80, 122, 160, 0.1) 360deg
      );
    animation: planetary-swirl 16s linear infinite;
    mix-blend-mode: soft-light;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: radial-gradient(circle at 72% 78%, rgba(19, 32, 54, 0.36), transparent 56%);
    pointer-events: none;
  }

  @keyframes planetary-swirl {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const OrbitRing = styled.div<{ diameter: number; duration: number; delay: number }>`
  position: absolute;
  inset: 50%;
  width: ${({ diameter }) => `${diameter}px`};
  height: ${({ diameter }) => `${diameter}px`};
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 1px dashed rgba(137, 183, 244, 0.28);
  animation: orbit linear infinite;
  animation-duration: ${({ duration }) => `${duration}s`};
  animation-delay: ${({ delay }) => `${delay}s`};
  pointer-events: none;
  z-index: 3;

  @keyframes orbit {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export const MoonBody = styled.button<{ size: number; tint: string }>`
  position: absolute;
  top: -6px;
  left: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  transform: translateX(-50%);
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  pointer-events: auto;
  background: radial-gradient(circle at 28% 28%, rgba(255, 255, 255, 0.55), ${({ tint }) => tint} 72%);
  box-shadow: 0 0 12px rgba(145, 191, 255, 0.42);
`;
