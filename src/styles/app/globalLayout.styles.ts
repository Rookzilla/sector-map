import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const globalStyles = css`
  :root {
    color-scheme: dark;
    font-family: "Cinzel Decorative", serif;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    min-height: 100vh;
    background:
      radial-gradient(circle at top, rgba(63, 103, 183, 0.25), transparent 28%),
      radial-gradient(circle at 20% 20%, rgba(33, 110, 154, 0.14), transparent 22%),
      radial-gradient(circle at 80% 30%, rgba(132, 58, 180, 0.1), transparent 24%),
      linear-gradient(180deg, #07111f 0%, #040814 55%, #03050d 100%);
    color: #eff6ff;
    overflow: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(circle, rgba(255, 255, 255, 0.9) 1px, transparent 1.5px),
      radial-gradient(circle, rgba(145, 191, 255, 0.55) 1px, transparent 1.5px);
    background-size: 180px 180px, 260px 260px;
    background-position: 0 0, 80px 120px;
    opacity: 0.22;
  }

  @media (max-width: 980px) {
    body {
      overflow: auto;
    }
  }
`;

export const AppShell = styled.main`
  min-height: 100vh;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 980px) {
    padding: 18px;
  }
`;

export const MapLayout = styled.section`
  flex: 1;
  min-height: 0;
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.7fr);

  @media (max-width: 980px) {
    min-height: auto;
    grid-template-columns: 1fr;
  }
`;

export const MapViewport = styled.div`
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(142, 192, 255, 0.16);
  background:
    linear-gradient(rgba(120, 162, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(120, 162, 255, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(7, 14, 33, 0.88), rgba(3, 7, 18, 0.98));
  background-size: 110px 110px, 110px 110px, auto;
  box-shadow: inset 0 0 60px rgba(76, 115, 188, 0.12), 0 24px 80px rgba(0, 0, 0, 0.45);
  cursor: grab;
  touch-action: none;
  user-select: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 55%, rgba(2, 4, 12, 0.58) 100%);
  }

  @media (max-width: 980px) {
    min-height: 62vh;
  }
`;

export const MapCanvas = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(106, 145, 220, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(106, 145, 220, 0.1) 1px, transparent 1px);
`;

export const MapControls = styled.div`
  position: absolute;
  right: 14px;
  top: 14px;
  z-index: 8;
  display: grid;
  gap: 8px;
  pointer-events: auto;

  button {
    border: 1px solid rgba(132, 189, 255, 0.34);
    background: rgba(12, 24, 50, 0.9);
    color: #e5f2ff;
    border-radius: 10px;
    width: 40px;
    height: 34px;
    font-size: 1rem;
    cursor: pointer;
    line-height: 1;
  }

  button:hover {
    background: rgba(28, 49, 92, 0.95);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MapZoomLabel = styled.div`
  min-width: 72px;
  text-align: center;
  border: 1px solid rgba(132, 189, 255, 0.28);
  border-radius: 10px;
  padding: 6px 8px;
  background: rgba(9, 18, 38, 0.85);
  color: #cfe6ff;
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.78rem;
`;
