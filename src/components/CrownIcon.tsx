import React from 'react';

interface IconProps {
  color: 'gold' | 'silver';
  className?: string;
  iconType?: 'crown' | 'paddle';
}

const WinnerIcon: React.FC<IconProps> = ({ color, className = "w-6 h-6", iconType = 'crown' }) => {
  const goldGradientId = "goldWinnerGradientUnique";
  const silverGradientId = "silverWinnerGradientUnique";

  const detailedCrownPath = "M4 20 L4 8 C4 5, 8 5, 8 8 L8 9 L12 6 L16 9 L16 8 C16 5, 20 5, 20 8 L20 20 L4 20 M6 20 Q12 16, 18 20 M2 14 L22 14";
  
  // Nuevo PATH para la paleta de pádel con orificios y mango más largo
  const paddlePathWithHoles = `
    M12,24 L10,24 L10,18.5 C5,18.5 2,15.5 2,11.5 C2,6.5 6.5,3 12,3 C17.5,3 22,6.5 22,11.5 C22,15.5 19,18.5 14,18.5 L14,24 L12,24Z
    M12,7.5 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3Z
    M8,11.5 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3Z
    M16,11.5 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3Z
    M12,15.5 a1.5,1.5 0 1,0 0,3 a1.5,1.5 0 1,0 0,-3Z
    M7.5,8.5 a1,1 0 1,0 0,2 a1,1 0 1,0 0,-2Z
    M16.5,8.5 a1,1 0 1,0 0,2 a1,1 0 1,0 0,-2Z
    M7.5,14.5 a1,1 0 1,0 0,2 a1,1 0 1,0 0,-2Z
    M16.5,14.5 a1,1 0 1,0 0,2 a1,1 0 1,0 0,-2Z
  `;

  const originalCrownPath = "M2 6 L2 8 L5 8 L5 6 L2 6 M9 6 L9 8 L12 8 L12 6 L9 6 M16 6 L16 8 L19 8 L19 6 L16 6 M2 9 L5 18 L12 14 L19 18 L22 9 L2 9 Z";

  let selectedPath: string;
  let viewBoxConfig = "0 0 24 24"; // Mantener el viewBox para asegurar que el ícono siga encajando

  if (iconType === 'crown') {
    selectedPath = detailedCrownPath;
  } else if (iconType === 'paddle') {
    selectedPath = paddlePathWithHoles; 
  } else {
    selectedPath = originalCrownPath;
  }

  const svgStyle: React.CSSProperties = {
    filter: color === 'gold'
      ? 'drop-shadow(0px 1px 1.5px rgba(218,165,32,0.75))'
      : 'drop-shadow(0px 1px 1.5px rgba(169,169,169,0.75))',
  };

  return (
    <svg
      className={`inline-block ${className}`}
      viewBox={viewBoxConfig}
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
    >
      <defs>
        <linearGradient id={goldGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFDF00' }} />
          <stop offset="50%" style={{ stopColor: '#FFD700' }} />
          <stop offset="100%" style={{ stopColor: '#B8860B' }} />
        </linearGradient>
        <linearGradient id={silverGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#F0F0F0' }} />
          <stop offset="50%" style={{ stopColor: '#D1D5DB' }} />
          <stop offset="100%" style={{ stopColor: '#A9A9A9' }} />
        </linearGradient>
      </defs>
      <path
        d={selectedPath}
        fill={color === 'gold' ? `url(#${goldGradientId})` : `url(#${silverGradientId})`}
        stroke={color === 'gold' ? '#DAA520' : '#8C8C8C'}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default WinnerIcon;