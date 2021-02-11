import * as React from 'react';

export default function WorkTimeIconSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" {...props}>
      <rect width={19} height={19} fill="#b6b5bf" rx={2} />
      <path
        fill="#fff"
        d="M8 8.5H7v1h1zm2 0H9v1h1zm2 0h-1v1h1zM13 5h-.5V4h-1v1h-4V4h-1v1H6a1 1 0 00-.995 1L5 13a1 1 0 001 1h7a1 1 0 001-1V6a1 1 0 00-1-1zm0 8H6V7.5h7z"
      />
      <path fill="none" d="M2 2h15v15H2z" />
    </svg>
  );
}
