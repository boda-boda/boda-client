import * as React from 'react';

export default function SmallTextButton(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={100} height={36} viewBox="0 0 100 36" {...props}>
      <g fill="none" stroke="#8d44df">
        <rect width={100} height={36} rx={3} stroke="none" />
        <rect width={99} height={35} x={0.5} y={0.5} rx={2.5} />
      </g>
      <text
        fill="#7131b7"
        fontFamily="SourceHanSansKR-Regular, Source Han Sans KR"
        fontSize={14}
        transform="translate(24 23)"
      >
        <tspan x={0} y={0}>
          {'\uBD88\uB7EC\uC624\uAE30'}
        </tspan>
      </text>
    </svg>
  );
}
