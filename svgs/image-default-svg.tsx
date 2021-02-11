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
        d="M41 42v-6h4v6h6v4h-6v6h-4v-6h-6v-4zm6 12v-6h6v-6h14l3.66 4H77a4.012 4.012 0 014 4v24a4.012 4.012 0 01-4 4H45a4.012 4.012 0 01-4-4V54zm14 18a10 10 0 10-10-10 10 10 0 0010 10zm-6.4-10a6.4 6.4 0 106.4-6.4 6.393 6.393 0 00-6.4 6.4z"
      />
      <path fill="none" d="M83 83H35V35h48z" />
    </svg>
  );
}
