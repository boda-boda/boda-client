import * as React from 'react';

export default function SlideRightButtonSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" {...props}>
      <path fill="#fff" d="M29 25l-6-6-1.41 1.41L26.17 25l-4.58 4.59L23 31z" />
      <path fill="none" d="M37 13v24H13V13z" />
    </svg>
  );
}
