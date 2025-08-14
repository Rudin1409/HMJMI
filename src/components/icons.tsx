import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FF6B6B', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4ECDC4', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="8" fill="url(#logo-gradient)"/>
      <text 
        x="50%" 
        y="50%" 
        dominantBaseline="central" 
        textAnchor="middle" 
        fill="white" 
        fontSize="28" 
        fontWeight="bold"
        fontFamily="Poppins, sans-serif"
      >
        H
      </text>
    </svg>
  );
}
