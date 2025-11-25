import React from 'react';
import { TreeProps } from '../types';

const TennisTree: React.FC<TreeProps> = ({ progress }) => {
  // SVG ViewBox dimensions
  const width = 400;
  const height = 500;
  
  // Calculate mask height based on progress (inverted because Y grows downwards)
  // progress 0 -> y = height
  // progress 1 -> y = 0
  const fillHeight = height * progress;
  const maskY = height - fillHeight;

  return (
    <div className="relative w-full max-w-md mx-auto floating drop-shadow-2xl">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          {/* The clipping mask for the progress fill */}
          <clipPath id="progressClip">
            <rect x="0" y={maskY} width={width} height={fillHeight} />
          </clipPath>

          {/* Gradient for the 'unfilled' tree (dim/dark) */}
          <linearGradient id="treeGradientDim" x1="200" y1="0" x2="200" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1a2e1f" />
            <stop offset="1" stopColor="#0f1c12" />
          </linearGradient>

          {/* Gradient for the 'filled' tree (bright/alive) */}
          <linearGradient id="treeGradientLit" x1="200" y1="0" x2="200" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2a5a3b" />
            <stop offset="1" stopColor="#143320" />
          </linearGradient>
          
          {/* Pattern for net texture on the garland */}
          <pattern id="netPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
             <path d="M0 0L10 10M10 0L0 10" stroke="#eee" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>

        {/* --- Background Tree (Dim/Empty) --- */}
        <g opacity="0.4">
            <TreePath fill="url(#treeGradientDim)" />
            <Decorations filled={false} />
        </g>

        {/* --- Foreground Tree (Lit/Filled) --- */}
        <g clipPath="url(#progressClip)">
            <TreePath fill="url(#treeGradientLit)" />
            <Decorations filled={true} />
            <Garlands />
        </g>
        
        {/* Star / Trophy always on top, maybe glows when done */}
        <TrophyTop active={progress >= 0.99} />

      </svg>
      
      {/* Progress Label */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-tennis-yellow font-mono text-sm opacity-60">
        {(progress * 100).toFixed(2)}% MATCH COMPLETE
      </div>
    </div>
  );
};

const TreePath: React.FC<{ fill: string }> = ({ fill }) => (
  <path
    d="M200 40 
       L120 160 L160 160 
       L90 280 L140 280 
       L60 420 L340 420 
       L260 280 L310 280 
       L240 160 L280 160 
       Z"
    fill={fill}
    stroke="#0f1c12"
    strokeWidth="2"
    strokeLinejoin="round"
  />
);

const Garlands: React.FC = () => (
    <g>
        {/* Stylized 'net' garlands draped across the tree */}
        <path d="M110 200 Q200 240 290 200" fill="none" stroke="white" strokeWidth="4" strokeDasharray="4 4" opacity="0.7" />
        <path d="M80 340 Q200 390 320 340" fill="none" stroke="white" strokeWidth="5" strokeDasharray="4 4" opacity="0.7" />
    </g>
);

const Decorations: React.FC<{ filled: boolean }> = ({ filled }) => {
    // Coordinate positions for tennis balls
    const positions = [
        { x: 200, y: 120 }, { x: 170, y: 190 }, { x: 230, y: 190 },
        { x: 150, y: 240 }, { x: 250, y: 240 }, { x: 200, y: 280 },
        { x: 120, y: 350 }, { x: 280, y: 350 }, { x: 180, y: 380 },
        { x: 220, y: 380 }, { x: 100, y: 400 }, { x: 300, y: 400 },
    ];

    return (
        <g>
            {positions.map((pos, i) => (
                <TennisBall 
                    key={i} 
                    x={pos.x} 
                    y={pos.y} 
                    lit={filled} 
                    delay={i * 0.1}
                />
            ))}
        </g>
    );
};

const TennisBall: React.FC<{ x: number, y: number, lit: boolean, delay: number }> = ({ x, y, lit, delay }) => {
    const color = lit ? '#ccff00' : '#4a5d23'; // Neon yellow vs dark olive
    const stroke = lit ? '#ffffff' : '#2a3d15';
    
    return (
        <g transform={`translate(${x}, ${y})`}>
            {lit && (
                 <circle r="12" fill={color} filter="blur(4px)" opacity="0.5">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin={`${delay}s`} />
                 </circle>
            )}
            <circle r="10" fill={color} />
            {/* Tennis ball curve lines */}
            <path d="M-6 -6 Q0 0 6 -6" fill="none" stroke={stroke} strokeWidth="1.5" />
            <path d="M-6 6 Q0 0 6 6" fill="none" stroke={stroke} strokeWidth="1.5" />
        </g>
    );
};

const TrophyTop: React.FC<{ active: boolean }> = ({ active }) => (
    <g transform="translate(200, 40)">
        {/* Glow behind */}
        {active && (
             <circle r="30" fill="#ffd700" filter="blur(10px)" opacity="0.6">
                 <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
             </circle>
        )}
        
        {/* Trophy Cup Shape */}
        <path d="M-15 -25 L15 -25 L10 5 Q0 15 -10 5 Z" fill={active ? "#ffd700" : "#665c2b"} />
        <path d="M-15 -20 L-20 -20 Q-25 -15 -15 -5" fill="none" stroke={active ? "#ffd700" : "#665c2b"} strokeWidth="3" />
        <path d="M15 -20 L20 -20 Q25 -15 15 -5" fill="none" stroke={active ? "#ffd700" : "#665c2b"} strokeWidth="3" />
        <rect x="-10" y="5" width="20" height="5" fill={active ? "#ffd700" : "#665c2b"} />
        <rect x="-15" y="10" width="30" height="5" fill={active ? "#b8860b" : "#4a4115"} />
        
        {/* Tennis ball inside cup */}
        <circle cy="-30" r="8" fill={active ? "#ccff00" : "#4a5d23"} />
    </g>
);

export default TennisTree;
