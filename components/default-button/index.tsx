import React from 'react';
import { ButtonType } from '../../common/types';

import * as S from './styles';

interface DefaultButtonProps {
  content: string;
  active?: boolean;
  type: ButtonType;
  width?: string;
  height?: string;
}

export default function DefaultButtonContainter(props: DefaultButtonProps) {
  return (
    <>
      <S.DefaultButton
        active={props.active}
        type={props.type}
        width={props.width}
        height={props.height}
      >
        {props.content}
      </S.DefaultButton>
    </>
  );
}
