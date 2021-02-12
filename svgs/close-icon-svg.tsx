import * as React from 'react';

export default function CloseIconSVG(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={25.997}
      viewBox="0 0 25 25"
      {...props}
    >
      <line x1="3" y1="3" x2="22" y2="22" stroke="#7131b7" strokeLinecap="round" strokeWidth="2" />
      <line x1="22" y1="3" x2="3" y2="22" stroke="#7131b7" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}
