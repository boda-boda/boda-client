import * as React from 'react';

export default function SlideLeftButton(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" {...props}>
      <path fill="#fff" d="M21 25l6-6 1.41 1.41L23.83 25l4.58 4.59L27 31z" />
      <path fill="none" d="M13 13v24h24V13z" />
    </svg>
  );
}
