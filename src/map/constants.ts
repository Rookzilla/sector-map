export const MAP_SIZE = { width: 1750, height: 1100 };
export const GRID_SIZE = 190;
export const MAP_PADDING = 80;
export const NODE_CENTER_OFFSET = 8;
export const AGAMEMNON_COORDS = { x: 1140, y: 980 };

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const getMapScale = (viewportWidth: number) => {
  if (viewportWidth <= 520) {
    return 0.58;
  }

  if (viewportWidth <= 720) {
    return 0.66;
  }

  if (viewportWidth <= 980) {
    return 0.74;
  }

  if (viewportWidth <= 1280) {
    return 0.86;
  }

  return 1;
};

export const getPanBounds = (viewportSize: number, scaledMapSize: number) => {
  if (scaledMapSize + MAP_PADDING * 2 <= viewportSize) {
    const centered = (viewportSize - scaledMapSize) / 2;
    const slack = Math.min(MAP_PADDING, Math.max(24, (viewportSize - scaledMapSize) / 2));
    return { min: centered - slack, max: centered + slack };
  }

  return {
    min: viewportSize - scaledMapSize - MAP_PADDING,
    max: MAP_PADDING,
  };
};
