import * as React from 'react';

export default function PlusButton(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="prefix__btn_plus"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      {...props}
    >
      <defs>
        <style>{'.prefix__cls-2{fill:none}'}</style>
      </defs>
      <g id="prefix__Rectangle_210" fill="none" stroke="#c4c4c4">
        <rect width={36} height={36} stroke="none" rx={3} />
        <rect width={35} height={35} x={0.5} y={0.5} className="prefix__cls-2" rx={2.5} />
      </g>
      <g id="prefix__ic_plus_24px" transform="translate(6 6)">
        <path id="prefix__Bounds" d="M0 0h24v24H0z" className="prefix__cls-2" />
        <path id="prefix__Icon" fill="#4e515c" d="M11 5v6H5v2h6v6h2v-6h6v-2h-6V5z" />
      </g>
    </svg>
  );
}
