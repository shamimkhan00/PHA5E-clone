import React from "react";

const CrossBox = ({ width, height, stroke = "gray", strokeWidth = 1, x, y }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: "transparent", fill: "transparent", position: "absolute", left: `${x}px`, top: `${y}px` }}
    >
      {/* Box Outline */}
      <rect width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} fill="transparent" />
      
      {/* Cross Lines */}
      <line x1="0" y1="0" x2={width} y2={height} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={width} y1="0" x2="0" y2={height} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};

export default CrossBox;
