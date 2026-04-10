import React from 'react';

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

const MatrixRain: React.FC = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {Array.from({ length: 30 }).map((_, col) => (
      <div
        key={col}
        className="absolute top-0 text-green-500 text-xs leading-none opacity-70 matrix-column"
        style={{
          left: `${(col / 30) * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${1.5 + Math.random() * 2}s`,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="matrix-char">
            {MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default MatrixRain;
