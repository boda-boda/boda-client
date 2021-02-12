import React, { useEffect, useState } from 'react';
import * as S from './styles';

interface BannerProps {
  bannerStyle: string;
  title?: string;
  subtitle?: string;
}

export default function Banner({ bannerStyle, title, subtitle }: BannerProps) {
  const adImage = [
    'https://user-images.githubusercontent.com/52532871/107824673-362f8180-6dc5-11eb-86bc-22fbe096e844.png',
    'https://user-images.githubusercontent.com/52532871/107824744-53fce680-6dc5-11eb-9547-ef23e38eb0c8.png',
    'https://user-images.githubusercontent.com/52532871/107824748-56f7d700-6dc5-11eb-9370-0f609f0b57ba.png',
  ];
  const [bgIndex, setBgIndex] = useState(0);
  const imageChange = () => {
    setBgIndex((bgIndex + 1) % adImage.length);
  };
  useEffect(() => {
    const change = setInterval(imageChange, 5000);
    return () => clearInterval(change);
  }, [bgIndex]);
  return (
    <>
      <S.Banner bannerStyle={bannerStyle}>
        <S.BackgroundImage url={adImage[bgIndex]} />
        <S.InnerContentContainer>
          <S.InnerContent>
            {bannerStyle === 'section' ? (
              <>
                <S.Title>{title}</S.Title>
                <S.SubTitle>{subtitle}</S.SubTitle>
              </>
            ) : (
              <>
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
          </S.InnerContent>
        </S.InnerContentContainer>
      </S.Banner>
    </>
  );
}
