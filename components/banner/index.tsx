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
    'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/b5c83ed7-c584-49b6-9fd9-eca99242b7e4_banner_1.png',
    'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/84e26d72-8282-4044-9b98-6e15d2ea0f67_banner_2.png',
    'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/efad3dba-99b2-4aab-8623-717635cec72e_banner_3.png',
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
      const change = setInterval(imageChange, 15000);
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
