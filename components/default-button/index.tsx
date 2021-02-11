import React from 'react';
import * as S from './styles';
type ButtonSize = 'Large' | 'Small';

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
