import colors from "tailwindcss/colors";
import React from "react";

export type CircularProgressProps = {
  progress: number; // a number between 0 and 100
  label?: string; // optional label to display in the center of the circle per default it will be the progress
  labelColor?: string;
  description?: string; // optional description to display in the center of the circle
  descriptionColor?: string;
  strokeWidth?: number; // optional width of the progress bar stroke
  circleRadius?: number; // optional radius of the circle
  circleBackgroundColor?: string; // optional color of the circle
  progressColor?: string; // optional color of the progress bar
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  progressColor = colors.green[500],
  label,
  labelColor = colors.white,
  description,
  descriptionColor = colors.slate[400],
  strokeWidth = 10,
  circleRadius = 115,
  circleBackgroundColor = colors.slate[600],
}: CircularProgressProps) => {
  const circumference = 2 * Math.PI * circleRadius;
  const progressOffset = circumference - (progress / 100) * circumference;
  if (progress < 0 || progress > 100) {
    throw new Error("Progress must be a number between 0 and 100");
  }
  if (strokeWidth > circleRadius) {
    throw new Error("Stroke width must be less than circle radius");
  }
  if (!label) {
    label = `${progress}%`;
  }
  return (
    <svg width={circleRadius * 2} height={circleRadius * 2}>
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius - strokeWidth / 2}
        stroke={circleBackgroundColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius - strokeWidth / 2}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={progressOffset}
        strokeLinecap="round"
        fill="none"
      />
      <text
        x={circleRadius}
        y={circleRadius}
        className="text-2xl font-bold"
        textAnchor="middle"
        fill={labelColor}
        dominantBaseline="middle"
      >
        {`${label}`}
      </text>
      {description && (
        <text
          x={circleRadius}
          y={circleRadius + 25}
          className="text-lg font-light"
          textAnchor="middle"
          fill={descriptionColor}
          dominantBaseline="middle"
        >
          {description}
        </text>
      )}
    </svg>
  );
};
