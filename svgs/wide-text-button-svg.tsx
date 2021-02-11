import * as React from 'react';

export default function WideTextButtonSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={324} height={66} viewBox="0 0 324 66" {...props}>
      <defs>
        <filter id="prefix__a" width={324} height={66} x={0} y={0} filterUnits="userSpaceOnUse">
          <feOffset dy={3} />
          <feGaussianBlur result="blur" stdDeviation={3} />
          <feFlood floodOpacity={0.161} />
          <feComposite in2="blur" operator="in" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g filter="url(#prefix__a)">
        <rect width={306} height={48} fill="#7131b7" rx={3} transform="translate(9 6)" />
      </g>
      <text
        fill="#fff"
        fontFamily="SourceHanSansKR-Medium, Source Han Sans KR"
        fontSize={16}
        fontWeight={500}
        transform="translate(162 36)"
      >
        <tspan x={-93.72} y={0}>
          {'\uB0B4 \uC694\uC591\uBCF4\uD638\uC0AC \uCD94\uAC00\uD558\uB7EC \uAC00\uAE30'}
        </tspan>
      </text>
    </svg>
  );
}
