import React from 'react';
import RightArrowIconSVG from '../../svgs/right-arrow-icon-svg';
import * as S from './styles';

interface CategoryProps {
  list: string[];
}

export default function Category({ list }: CategoryProps) {
  return (
    <>
      <S.Category>
        <S.InnerContent>
          {list.map((item, index) => {
            return (
              <S.TextContainer key={`textcontainer-${index}`}>
                <S.Text isBold={index === list.length - 1}>{item}</S.Text>
                {index !== list.length - 1 && <RightArrowIconSVG style={{ marginRight: '5px' }} />}
              </S.TextContainer>
            );
          })}
        </S.InnerContent>
      </S.Category>
    </>
  );
}
