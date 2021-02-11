import * as React from 'react';

export default function ClockIconSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" {...props}>
      <path fill="none" d="M0 0h18v18H0z" />
      <path
        fill="#4e515c"
        d="M16 4.562l-3.22-2.7-.9 1.071 3.22 2.7zM6.116 2.931L5.22 1.86 2 4.555l.9 1.071 3.213-2.7zM9.35 6.158H8.3v4.2l3.325 1.995.525-.861-2.8-1.659zM9 3.358a6.3 6.3 0 106.3 6.3 6.3 6.3 0 00-6.3-6.3zm0 11.2a4.9 4.9 0 114.9-4.9 4.9 4.9 0 01-4.9 4.9z"
      />
    </svg>
  );
}
