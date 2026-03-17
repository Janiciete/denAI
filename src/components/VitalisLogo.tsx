"use client";

interface VitalisLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
}

export default function VitalisLogo({
  size = "md",
  variant = "dark",
  className = "",
}: VitalisLogoProps) {
  const sizes = {
    sm: { height: 28, textClass: "text-lg" },
    md: { height: 32, textClass: "text-xl" },
    lg: { height: 48, textClass: "text-3xl" },
  };

  const { height, textClass } = sizes[size];
  const svgWidth = Math.round(height * 2.8);

  const lineColor = variant === "dark" ? "#A78BFA" : "#C4B5FD";
  const textColor = variant === "dark" ? "text-slate-900" : "text-white";
  const accentColor = "text-brand-500";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Heartbeat + Arrow SVG */}
      <svg
        width={svgWidth}
        height={height}
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-draw"
      >
        {/* Heartbeat line */}
        <path
          d="M4 22 L24 22 L30 8 L38 34 L46 14 L52 22 L68 22"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Extending line to arrow */}
        <path
          d="M68 22 L100 22"
          stroke={lineColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow tip */}
        <polygon
          points="100,22 108,16 116,22 108,28"
          fill={lineColor}
        />
      </svg>

      {/* Text */}
      <span className={`font-extrabold tracking-tight ${textClass}`}>
        <span className={textColor}>VITAL</span>
        <span className={accentColor}>IS</span>
      </span>
    </div>
  );
}
