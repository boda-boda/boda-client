import React from 'react';
import * as S from './styles';

interface DefaultButtonProps {
  content: string;
}

export default function DefaultButtonContainter(props: DefaultButtonProps) {
  return <S.MetaInfoContainer>{props.content}</S.MetaInfoContainer>;
}
