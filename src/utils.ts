export const DEFAULT_RATING_COLORS = [
	"#ef4444",
	"#f97316",
	"#eab308",
	"#84cc16",
	"#22c55e",
];

export function roundToPrecision(value: number, precision: number): number {
	const multiplier = 1 / precision;
	return Math.round(value * multiplier) / multiplier;
}

export function getColorForRating(
	value: number,
	maxRating: number,
	activeColorsEnabled: boolean,
	customActiveColors?: string[],
): string | undefined {
	if (!activeColorsEnabled || value <= 0) return undefined;

	const colors = customActiveColors || DEFAULT_RATING_COLORS;
	const numColors = colors.length;
	if (numColors === 0) return undefined;
	const bandSize = maxRating / numColors;
	const colorIndex = Math.min(
		Math.floor((value - 0.001) / bandSize),
		numColors - 1,
	);
	const finalIndex = Math.max(0, colorIndex);

	return colors[finalIndex >= 0 ? finalIndex : 0];
}
