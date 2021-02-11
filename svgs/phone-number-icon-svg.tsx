import * as React from 'react';

export default function PhoneNumberIconSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" {...props}>
      <rect width={19} height={19} fill="#b6b5bf" rx={2} />
      <path fill="none" d="M2 2h15v15H2z" />
      <path
        fill="#fff"
        d="M6.81 8.9a7.574 7.574 0 003.3 3.3l1.1-1.1a.5.5 0 01.51-.12 5.7 5.7 0 001.785.285.5.5 0 01.5.5V13.5a.5.5 0 01-.5.5A8.5 8.5 0 015 5.5a.5.5 0 01.5-.5h1.75a.5.5 0 01.5.5 5.68 5.68 0 00.285 1.785.5.5 0 01-.125.51z"
      />
    </svg>
  );
}
