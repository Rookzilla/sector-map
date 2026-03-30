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

export const BlackHole = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  z-index: 2;
  pointer-events: none;

  .event-horizon {
    position: absolute;
    inset: 50%;
    width: 52px;
    height: 52px;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background: radial-gradient(circle, #000 0%, #05070f 78%, #101836 100%);
    box-shadow:
      0 0 18px rgba(8, 10, 18, 0.7),
      0 0 44px rgba(2, 3, 8, 0.82);
  }

  .accretion-ring-a,
  .accretion-ring-b,
  .accretion-ring-c {
    position: absolute;
    inset: 50%;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    border: 1px solid rgba(16, 20, 28, 0.92);
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.45));
  }

  .accretion-ring-a {
    width: 98px;
    height: 98px;
  }

  .accretion-ring-b {
    width: 132px;
    height: 132px;
    border-color: rgba(10, 12, 18, 0.88);
  }

  .accretion-ring-c {
    width: 164px;
    height: 164px;
    border-color: rgba(6, 8, 12, 0.84);
  }

  .singularity-glow {
    position: absolute;
    inset: 50%;
    width: 176px;
    height: 176px;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background: radial-gradient(circle, rgba(14, 16, 24, 0.34), rgba(6, 8, 18, 0) 70%);
    mix-blend-mode: screen;
  }

  .label {
    position: absolute;
    left: calc(100% - 16px);
    top: 50%;
    transform: translateY(-50%);
    white-space: nowrap;
    font-family: "Cinzel Decorative", serif;
    letter-spacing: 0.06em;
    color: #c8dcff;
    text-shadow: 0 0 10px rgba(123, 178, 255, 0.4);
  }

  @media (max-width: 900px) {
    transform: translate(-50%, -50%) scale(0.8);
  }
`;

export const WarpRouteLayer = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

export const WarpRouteLine = styled(motion.line)`
  stroke-linecap: round;
  filter: drop-shadow(0 0 6px rgba(123, 227, 255, 0.2));
`;

const nebulaStyles = {
  a: `
    width: 420px;
    height: 420px;
    left: 220px;
    top: 120px;
    background: radial-gradient(circle, rgba(71, 192, 255, 0.28), transparent 70%);
  `,
  b: `
    width: 520px;
    height: 520px;
    right: 200px;
    top: 360px;
    background: radial-gradient(circle, rgba(255, 122, 155, 0.2), transparent 70%);
  `,
  c: `
    width: 360px;
    height: 360px;
    left: 980px;
    bottom: 130px;
    background: radial-gradient(circle, rgba(255, 210, 107, 0.16), transparent 72%);
  `,
} as const;

export const Nebula = styled.div<{ variant: keyof typeof nebulaStyles }>`
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
  opacity: 0.72;
  ${({ variant }) => nebulaStyles[variant]}
`;

const systemNodeStyleProps = new Set(["active", "locked", "connected"]);

export const SystemNode = styled(motion.button, {
  shouldForwardProp: (propName) => !systemNodeStyleProps.has(propName as string),
})<{ active: boolean; locked: boolean; connected: boolean }>`
  position: absolute;
  z-index: 3;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }

  .node-core,
  .node-halo,
  .node-pulse,
  .node-orbit-1,
  .node-orbit-2 {
    position: absolute;
    border-radius: 999px;
    inset: 50%;
    transform: translate(-50%, -50%);
  }

  .node-core {
    width: 16px;
    height: 16px;
    background: ${({ active }) =>
      active
        ? "radial-gradient(circle at 35% 35%, #fff5d7, #ffcb6b 42%, #7b4319 100%)"
        : "radial-gradient(circle at 35% 35%, #ffffff, #7be3ff 40%, #103d74 100%)"};
    box-shadow: ${({ active, connected }) =>
      active
        ? "0 0 34px rgba(255, 203, 107, 0.82)"
        : connected
          ? "0 0 30px rgba(132, 215, 255, 0.75)"
          : "0 0 28px rgba(86, 196, 255, 0.7)"};
  }

  .node-halo {
    width: ${({ active }) => (active ? "58px" : "42px")};
    height: ${({ active }) => (active ? "58px" : "42px")};
    border: 1px solid
      ${({ active, connected }) =>
        active
          ? "rgba(255, 203, 107, 0.55)"
          : connected
            ? "rgba(140, 216, 255, 0.46)"
            : "rgba(123, 227, 255, 0.28)"};
    background: ${({ connected }) => (connected ? "rgba(118, 206, 255, 0.12)" : "rgba(91, 185, 255, 0.08)")};
    box-shadow: ${({ active, connected }) =>
      active
        ? "0 0 34px rgba(255, 203, 107, 0.18)"
        : connected
          ? "0 0 24px rgba(120, 210, 255, 0.2)"
          : "none"};
  }

  .node-pulse {
    width: 78px;
    height: 78px;
    border: 1px solid rgba(123, 227, 255, 0.18);
    animation: pulse 2.8s ease-out infinite;
  }

  .node-orbit-1 {
    width: 92px;
    height: 92px;
    border: 1px solid rgba(136, 206, 255, 0.26);
    border-left-color: transparent;
    border-right-color: transparent;
    animation: drift 14s linear infinite;
  }

  .node-orbit-2 {
    width: 122px;
    height: 122px;
    border: 1px solid rgba(107, 174, 255, 0.16);
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: drift-reverse 18s linear infinite;
  }

  .node-label {
    position: absolute;
    left: 30px;
    top: -8px;
    display: grid;
    gap: 4px;
    min-width: 180px;
    text-align: left;
  }

  .node-label strong {
    font-family: "Cinzel Decorative", serif;
    letter-spacing: 0.04em;
    font-size: ${({ locked }) => (locked ? "1.06rem" : "0.98rem")};
    text-shadow: ${({ locked }) =>
      locked ? "0 0 10px rgba(129, 206, 255, 0.6), 0 0 24px rgba(129, 206, 255, 0.34)" : "none"};
    transition:
      font-size 0.18s ease,
      text-shadow 0.18s ease;
  }

  .node-label small {
    font-family: "Space Grotesk", sans-serif;
    color: #96a7c7;
    font-size: 0.8rem;
    text-shadow: ${({ locked }) => (locked ? "0 0 8px rgba(128, 198, 255, 0.28)" : "none")};
    transition: text-shadow 0.18s ease;
  }

  .node-world-links {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 3px;
  }

  .node-world-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 19px;
    height: 19px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .node-world-greek {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    border: 1px solid rgba(180, 218, 255, 0.52);
    background: rgba(25, 41, 83, 0.9);
    color: #d9ecff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.66rem;
  }

  .node-world-link:hover .node-world-greek {
    border-color: rgba(255, 215, 124, 0.72);
    box-shadow: 0 0 8px rgba(255, 205, 114, 0.28);
    color: #ffe1a3;
  }

  .node-world-link.active .node-world-greek {
    border-color: rgba(120, 206, 255, 0.82);
    box-shadow: 0 0 10px rgba(120, 206, 255, 0.4);
    color: #dff4ff;
  }

  .node-world-link.under-siege .node-world-greek {
    border-color: rgba(255, 112, 112, 0.86);
    box-shadow: 0 0 10px rgba(255, 92, 92, 0.34);
  }

  .node-world-link.under-siege:hover .node-world-greek,
  .node-world-link.under-siege.active .node-world-greek {
    border-color: rgba(255, 133, 133, 0.95);
    box-shadow: 0 0 12px rgba(255, 96, 96, 0.5);
    color: #ffe7e7;
  }

  @keyframes pulse {
    0% {
      opacity: 0.2;
      transform: translate(-50%, -50%) scale(0.82);
    }
    70% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.18);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.18);
    }
  }

  @keyframes drift {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  @keyframes drift-reverse {
    from {
      transform: translate(-50%, -50%) rotate(360deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }

  @media (max-width: 900px) {
    .node-label {
      left: 22px;
      top: -10px;
      min-width: 136px;
    }

    .node-label strong {
      font-size: 0.82rem;
    }

    .node-label small {
      display: none;
    }

    .node-world-links {
      display: none;
    }

    .node-orbit-1 {
      width: 72px;
      height: 72px;
    }

    .node-orbit-2 {
      width: 96px;
      height: 96px;
    }
  }
`;
