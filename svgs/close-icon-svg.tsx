import * as React from 'react';

export default function CloseIconSVG(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={25.997}
      viewBox="0 0 26 25.997"
      {...props}
    >
      <line x1="0" y1="0" x2="25" y2="25" stroke="#7131b7" strokeLinecap="round" strokeWidth="3" />
      <line x1="25" y1="0" x2="0" y2="25" stroke="#7131b7" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
