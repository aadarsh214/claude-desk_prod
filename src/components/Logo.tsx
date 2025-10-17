import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 28 }) => {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="App logo"
      role="img"
    >
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1e293b" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#shadow)">
        <path
          d="M32 6c6.2 0 12 2.4 16.4 6.6C52.6 16.8 55 22.6 55 28.8c0 6.1-2.3 11.3-6.4 15.4-2.5 2.5-5.5 4.4-8.8 5.5-.7.2-1 .9-.8 1.6l1.6 5.1c.2.7-.4 1.3-1.1 1.1l-9.1-2.4c-.3-.1-.6-.1-.9 0-6.1 1.7-12.9.1-18-4.9C6.8 44.7 5 39.1 5.3 33.7 5.7 22 17 12.2 28.8 10.9c1-.1 2-.2 3.2-.2Z"
          fill="url(#g)"
        />
        <path
          d="M22.5 33.5c0-7 5.7-12.7 12.7-12.7 3.4 0 6.5 1.3 8.8 3.5.6.6.6 1.6 0 2.2l-2.6 2.6c-.6.6-1.5.6-2.1 0-1.1-1-2.6-1.6-4.1-1.6-3.3 0-6 2.7-6 6 0 3.3 2.7 6 6 6 1.5 0 3-.6 4.1-1.6.6-.6 1.5-.6 2.1 0l2.6 2.6c.6.6.6 1.6 0 2.2-2.3 2.2-5.4 3.5-8.8 3.5-7 0-12.7-5.7-12.7-12.7Z"
          fill="#ffffff"
          fillOpacity="0.9"
        />
      </g>
    </svg>
  );
};
