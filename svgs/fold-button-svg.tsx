import * as React from 'react';

export default function FoldButtonSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" {...props}>
      <path fill="#7131b7" d="M0 0h30v30H0z" />
      <path fill="#fff" d="M15 11l-6 6 1.41 1.41L15 13.83l4.59 4.58L21 17z" />
      <path fill="none" d="M3 3h24v24H3z" />
    </svg>
  );
}
