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
    'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/19e59735-2856-4f4f-82e5-64dce914fe34_banner_1.png',
    'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/e70bb710-9654-4ad0-b0fa-99c2b53f8fe5_banner02.png',
    'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/aefa7116-8410-4941-8432-87f8c64fd01e_banner_3.png',
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
