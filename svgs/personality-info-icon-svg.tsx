import * as React from 'react';

export default function PersonalityInfoIconSVG(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" {...props}>
      <rect width={19} height={19} fill="#b6b5bf" rx={2} />
      <path fill="none" d="M2 2h15v15H2z" />
      <path
        fill="#fff"
        d="M9.5 10.6c-1.708 0-5.133.858-5.133 2.567V15h10.267v-1.833c0-1.709-3.425-2.567-5.134-2.567zm3.879 3.146H5.621v-.579c.073-.359 1.9-1.313 3.879-1.313s3.806.953 3.879 1.313zM9.5 9.867a2.933 2.933 0 10-2.926-2.934A2.928 2.928 0 009.5 9.867zm0-4.613a1.679 1.679 0 11-1.672 1.679A1.678 1.678 0 019.5 5.254z"
      />
    </svg>
  );
}
