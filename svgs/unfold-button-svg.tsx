import * as React from 'react';

export default function UnfoldButton(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" {...props}>
      <path fill="#7131b7" d="M0 0h30v30H0z" />
      <path fill="#fff" d="M15 18.41l-6-6L10.41 11 15 15.58 19.59 11 21 12.41z" />
      <path fill="none" d="M3 3h24v24H3z" />
    </svg>
  );
}
