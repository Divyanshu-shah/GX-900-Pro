import React from "react";

// Lightning bolt SVG logo with orange/yellow gradient on dark background
const LightningLogo: React.FC<{ size?: number | string; style?: React.CSSProperties }> = ({ size = 28, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#101214",
      borderRadius: "6px",
      width: size,
      height: size,
      ...style,
    }}
  >
    <svg
      width={typeof size === "number" ? size * 0.6 : "60%"}
      height={typeof size === "number" ? size * 0.6 : "60%"}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bolt-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB347" />
          <stop offset="1" stopColor="#FF6137" />
        </linearGradient>
      </defs>
      <path
        d="M18 2L6 18H15L14 30L26 14H17L18 2Z"
        fill="url(#bolt-gradient)"
        stroke="#FFB347"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default LightningLogo;
