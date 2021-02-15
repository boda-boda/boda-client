import React from 'react';
import { ButtonSize } from '../../common/types';

import * as S from './styles';

interface DefaultButtonProps {
  content: string;
  active?: boolean;
  size: ButtonSize;
}

export default function DefaultButtonContainter(props: DefaultButtonProps) {
  return (
    <>
      <S.DefaultButton active={props.active} size={props.size}>
        {props.content}
      </S.DefaultButton>
    </>
  );
}
