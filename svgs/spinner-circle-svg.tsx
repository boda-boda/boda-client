import * as React from 'react';
import { THEME } from '../constant';

export default function SpinnerCircleSVG(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200px"
      height="200px"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="100"
        cy="100"
        r="50"
        stroke={`${THEME.HEADER_BACKGROUND}`}
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
      ></circle>
      <circle
        cx="100"
        cy="100"
        r="50"
        stroke={`${THEME.MAIN}`}
        stroke-width="3"
        stroke-linecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 100 100;180 100 100;720 100 100"
          keyTimes="0;0.5;1"
        ></animateTransform>
        <animate
          attributeName="stroke-dasharray"
          repeatCount="indefinite"
          dur="1s"
          values="68.84955592153876 219.64600329384882;144.2477796076938 144.24777960769377;68.84955592153876 219.64600329384882"
          keyTimes="0;0.5;1"
        ></animate>
      </circle>
      <image xlinkHref="https://user-images.githubusercontent.com/52532871/114271982-10ce9500-9a4f-11eb-8107-c2136732fa6c.png" />
    </svg>
  );
}
