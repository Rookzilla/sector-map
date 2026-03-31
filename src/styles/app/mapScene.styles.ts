import styled from "@emotion/styled";
import { motion } from "framer-motion";

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
