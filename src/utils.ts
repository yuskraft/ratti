export const DEFAULT_RATING_COLORS = [
  "#d32f2f",
  "#ed6c02",
  "#ff9800",
  "#4caf50",
  "#00a63d",
];

export function roundToPrecision(value: number, precision: number): number {
  const multiplier = 1 / precision;
  return Math.round(value * multiplier) / multiplier;
}

export function getColorForRating(
  value: number,
  maxRating: number,
  activeColorsEnabled: boolean,
  customActiveColors?: string[]
): string | undefined {
  if (!activeColorsEnabled || value <= 0) return undefined;

  const colors = customActiveColors || DEFAULT_RATING_COLORS;
  const numColors = colors.length;
  if (numColors === 0) return undefined;
  const bandSize = maxRating / numColors;
  const colorIndex = Math.min(
    Math.floor((value - 0.001) / bandSize),
    numColors - 1
  );
  const finalIndex = Math.max(0, colorIndex);

  return colors[finalIndex];
}
