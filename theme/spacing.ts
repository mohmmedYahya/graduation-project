type SpacingType = (space: number) => number;

const spaceSize = 4;
export const spacing: SpacingType = (space) => space * spaceSize;

export const DEFAULT_SPACING = spacing(4);
