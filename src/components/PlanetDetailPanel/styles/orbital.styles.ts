import styled from "@emotion/styled";

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
