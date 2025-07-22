export const DEFAULT_SVG_PATH_D =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

export const StarIcon = ({
  fillPercentage = 1,
  starId,
  fillColor,
  forcedColor,
  svgPathD = DEFAULT_SVG_PATH_D,
  size,
}: {
  fillPercentage?: number;
  starId: string;
  fillColor?: string;
  forcedColor?: string;
  svgPathD?: string;
  size?: number | string;
}) => {
  const clipPathId = `star-clip-${starId}`;
  const useClipping = fillPercentage < 1 && !forcedColor;
  const fillWidth = useClipping
    ? `${Math.max(0, Math.min(100, fillPercentage * 100))}%`
    : "100%";
  const iconColor = forcedColor || fillColor || "currentColor";

  const iconSize = size
    ? typeof size === "number"
      ? size
      : parseFloat(size) 
    : 24; 

  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize} 
      viewBox="0 0 24 24"
      fill="none"
      stroke={forcedColor || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star-icon"
      style={{ color: iconColor }}
    >
      {useClipping && (
        <defs>
          <clipPath id={clipPathId}>
            <rect x="0" y="0" width={fillWidth} height="100%" />
          </clipPath>
        </defs>
      )}
      <path d={svgPathD} />
      <g clipPath={useClipping ? `url(#${clipPathId})` : undefined}>
        <path d={svgPathD} fill={iconColor} stroke="none" />
      </g>
    </svg>
  );
};