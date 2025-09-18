import React from 'react';

const SnipSwapLogo = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Hexagonal Border */}
      <path 
        d="M50 5 L85 25 L85 65 L50 85 L15 65 L15 25 Z" 
        stroke="url(#logoGradient)" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Inner Hexagon Background */}
      <path 
        d="M50 12 L78 28 L78 62 L50 78 L22 62 L22 28 Z" 
        fill="url(#logoGradient)" 
        opacity="0.1"
      />
      
      {/* Lock Body */}
      <rect 
        x="35" 
        y="45" 
        width="30" 
        height="25" 
        rx="4" 
        fill="url(#logoGradient)"
      />
      
      {/* Lock Shackle */}
      <path 
        d="M42 45 L42 38 C42 33.5 45.5 30 50 30 C54.5 30 58 33.5 58 38 L58 45" 
        stroke="url(#logoGradient)" 
        strokeWidth="3" 
        fill="none"
      />
      
      {/* Keyhole */}
      <circle cx="50" cy="55" r="3" fill="white" />
      <rect x="48.5" y="55" width="3" height="8" fill="white" />
      
      {/* Connection Nodes */}
      <circle cx="12" cy="50" r="3" fill="url(#logoGradient)" />
      <circle cx="88" cy="50" r="3" fill="url(#logoGradient)" />
      <circle cx="30" cy="25" r="2" fill="url(#logoGradient)" />
      <circle cx="70" cy="25" r="2" fill="url(#logoGradient)" />
      <circle cx="30" cy="75" r="2" fill="url(#logoGradient)" />
      <circle cx="70" cy="75" r="2" fill="url(#logoGradient)" />
      
      {/* Connection Lines */}
      <line x1="15" y1="50" x2="22" y2="50" stroke="url(#logoGradient)" strokeWidth="2" />
      <line x1="78" y1="50" x2="85" y2="50" stroke="url(#logoGradient)" strokeWidth="2" />
      <line x1="28" y1="28" x2="22" y2="35" stroke="url(#logoGradient)" strokeWidth="1.5" />
      <line x1="72" y1="28" x2="78" y2="35" stroke="url(#logoGradient)" strokeWidth="1.5" />
      <line x1="28" y1="72" x2="22" y2="65" stroke="url(#logoGradient)" strokeWidth="1.5" />
      <line x1="72" y1="72" x2="78" y2="65" stroke="url(#logoGradient)" strokeWidth="1.5" />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0b90b" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#f0b90b" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SnipSwapLogo;

