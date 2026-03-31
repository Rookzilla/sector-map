import styled from "@emotion/styled";
import { motion } from "framer-motion";

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
