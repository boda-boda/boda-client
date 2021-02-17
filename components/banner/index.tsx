import React, { useEffect, useState } from 'react';
import { BannerStyleType } from '../../common/types';
import SlideLeftButton from '../../svgs/slide-left-button-svg';
import SlideRightButton from '../../svgs/slide-right-button-svg';
import * as S from './styles';

interface BannerProps {
  bannerStyle: BannerStyleType;
  sectionIndex?: number;
  title?: string;
  subtitle?: string;
}

export default function Banner({ bannerStyle, sectionIndex, title, subtitle }: BannerProps) {
  const adImage = [
    'https://user-images.githubusercontent.com/52532871/107824673-362f8180-6dc5-11eb-86bc-22fbe096e844.png',
    'https://user-images.githubusercontent.com/52532871/107824744-53fce680-6dc5-11eb-9547-ef23e38eb0c8.png',
    'https://user-images.githubusercontent.com/52532871/107824748-56f7d700-6dc5-11eb-9370-0f609f0b57ba.png',
  ];
  const sectionImage = [
    'https://user-images.githubusercontent.com/52532871/107974985-bc80d900-6ffa-11eb-9582-e9be403b60d2.png',
    'https://user-images.githubusercontent.com/52532871/107975016-c6a2d780-6ffa-11eb-8ce1-64b6868857d2.png',
    'https://user-images.githubusercontent.com/52532871/107975035-d15d6c80-6ffa-11eb-893a-c43fb031a65e.png',
  ];
  const [bgIndex, setBgIndex] = useState(0);
  const imageChange = () => {
    setBgIndex((bgIndex + 1) % adImage.length);
  };
  useEffect(() => {
    if (bannerStyle === BannerStyleType.AD) {
      const change = setInterval(imageChange, 5000);
      return () => clearInterval(change);
    }
  }, [bgIndex]);
  return (
    <>
      <S.Banner bannerStyle={bannerStyle}>
        {bannerStyle === BannerStyleType.SECTION ? (
          <>
            <S.BackgroundImage url={sectionImage[sectionIndex || 0]} />
            <S.InnerContentContainer>
              <S.InnerContent>
                <S.Title>{title}</S.Title>
                <S.SubTitle>
                  {(subtitle || '').split('#').map((line, index) => {
                    return (
                      <span key={`subtitle-${index}`}>
                        {line}
                        <br />
                      </span>
                    );
                  })}
                </S.SubTitle>
              </S.InnerContent>
            </S.InnerContentContainer>
          </>
        ) : (
          <>
            <S.BackgroundImage url={adImage[bgIndex]} />
            <S.ButtonContainer>
              <S.ButtonDiv onClick={() => setBgIndex((bgIndex + 2) % adImage.length)}>
                <SlideLeftButton />
              </S.ButtonDiv>
              <S.ButtonDiv onClick={() => setBgIndex((bgIndex + 1) % adImage.length)}>
                <SlideRightButton />
              </S.ButtonDiv>
            </S.ButtonContainer>
            <S.IndicatorContainer>
              {adImage.map((item, index) => {
                return (
                  <div key={`indicator-${index}`}>
                    <S.IndicatorWrapper onClick={() => setBgIndex(index)}>
                      <S.Indicator mark={index === bgIndex} />
                    </S.IndicatorWrapper>
                  </div>
                );
              })}
            </S.IndicatorContainer>
          </>
        )}
      </S.Banner>
    </>
  );
}
