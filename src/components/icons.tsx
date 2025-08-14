import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 286 272" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path d="M211.594 271.213L143.208 228.36L74.8213 271.213L96.5029 194.88L41.3813 145.421L120.985 138.807L143.208 65.3418L165.43 138.807L245.034 145.421L189.913 194.88L211.594 271.213Z" fill="currentColor"/>
        <path d="M142.992 0C108.828 0 78.4357 11.0886 54.3414 30.687L142.992 153.284L231.643 30.687C207.548 11.0886 177.156 0 142.992 0Z" fill="currentColor"/>
    </svg>
  );
}
