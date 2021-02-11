import * as React from 'react';

export default function ProfileDefaultSVG(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={118}
      height={118}
      viewBox="0 0 118 118"
      {...props}
    >
      <rect width={118} height={118} fill="#efeaf5" rx={10} />
      <path
        fill="#7131b7"
        fillRule="evenodd"
        d="M48.333 51A10.667 10.667 0 1159 61.667 10.667 10.667 0 0148.333 51zM69.2 63.328a16 16 0 10-20.4 0C40.3 66.323 35 72.992 35 80.334a2.667 2.667 0 005.333 0C40.333 74.28 46.613 67 59 67s18.667 7.28 18.667 13.333a2.667 2.667 0 005.333 0c0-7.341-5.291-14.01-13.8-17.005z"
      />
    </svg>
  );
}
