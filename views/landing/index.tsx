import * as S from './styles';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import SlideLeftButton from '../../svgs/slide-left-button-svg';
import SlideRightButton from '../../svgs/slide-right-button-svg';
import { RightArrowIconWhite } from '../../svgs/right-arrow-icon-svg';
import { useHeader } from '../../components/header/hooks';
import Link from 'next/link';
import { useCareCenter } from '../../context/care-center';
import { useSoftRefresh } from '../../common/hooks/auth';

const Header = ({ nowSection, setNowSection, sectionRefs }) => {
  const [isTop, setIstop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [offset, setOffset] = useState(500);

  function logit() {
    setIstop(window.pageYOffset === 0 || isMobile);
    switch (true) {
      case sectionRefs[2].current.offsetTop - offset < window.pageYOffset:
        setNowSection(2);
        break;
      case sectionRefs[1].current.offsetTop - offset < window.pageYOffset:
        setNowSection(1);
        break;
      case sectionRefs[0].current.offsetTop - offset < window.pageYOffset:
        setNowSection(0);
        break;
      default:
        setNowSection(-1);
    }
  }
  const goSection = (index: number) => {
    window.scrollTo({ top: sectionRefs[index].current.offsetTop - 150, behavior: 'smooth' });
  };
  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });
  useEffect(() => {
    setIsMobile(window.screen.width < 750);
    if (window.screen.width < 750) setOffset(200);
  }, []);
  return (
    <S.Header isTop={isTop}>
      <S.Logo>
        <S.LogoImg src={isTop ? '/logo.png' : '/logo_purple.png'} />
      </S.Logo>
      {!isMobile && (
        <S.Navibar>
          <S.NaviItem
            isTop={isTop}
            isSelected={nowSection === 0}
            onClick={(e) => {
              goSection(0);
            }}
          >
            서비스 소개
          </S.NaviItem>
          <S.NaviItem
            isTop={isTop}
            isSelected={nowSection === 1}
            onClick={(e) => {
              goSection(1);
            }}
          >
            서비스 확장성
          </S.NaviItem>
          <S.NaviItem
            isTop={isTop}
            isSelected={nowSection === 2}
            onClick={(e) => {
              goSection(2);
            }}
          >
            상담 신청
          </S.NaviItem>
        </S.Navibar>
      )}
    </S.Header>
  );
};

export default function Landing() {
  useSoftRefresh();
  const careCenter = useCareCenter();

  const jumbotronInfo = [
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498372-4eab5500-9547-11eb-8c46-555aee277adb.jpg',
      text: `요양보호사가 필요할 때<br />
      여기저기 전화는 NO
      <br />
      여기 10번의 클릭이면 OK`,
      isLeft: false,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498373-50751880-9547-11eb-8a79-909a9a6e34f3.jpg',
      text: `매칭에 꼭 필요한 조건 검색으로<br />
      수급자 어르신과 딱 맞는<br />
      요양보호사를 찾을 수 있을 거에요.`,
      isLeft: true,
    },
  ];
  const featureInfo = [
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113480969-03a32a80-94d2-11eb-8d1b-b7bd5590cb36.png',
      title: `매칭에 꼭 필요한<br />
      <span>조건 검색</span>`,
      subtitle: `이름, 지역, 시간, 가능 조건, 종교 등 조건을 검색할 수 있어요.`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113481748-51ba2d00-94d6-11eb-9a63-7d03b93d2e1a.png',
      title: `필요할 때 바로 바로<br />
      <span>요양보호사 찾기</span>`,
      subtitle: `더 이상 요양보호사 연락 기다리지 마세요.<br/>
      원할때 바로바로 검색해서 찾아보세요.`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113480969-03a32a80-94d2-11eb-8d1b-b7bd5590cb36.png',
      title: `다른 센터에서 작성한
      <br />
      <span>칭찬글 보기</span>`,
      subtitle: `다른 센터가 경험한 요양보호사의 생생한 칭찬 후기를 확인해보세요. `,
    },
  ];
  const expansionInfo = [
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498634-9501b380-9549-11eb-9b55-2a58646a51bf.jpg',
      title: `나의 센터 요양보호사<br/>관리하기`,
      subtitle: `일을 하다가 그만 두신 분, 연락만 했던 요양보호사 정보를 한 곳에 모아 관리할 수 있어요.
      소중한 정보를 안전하고 효율적으로 관리하세요.`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498866-cbd8c900-954b-11eb-8a54-1c5efad68c9f.jpg',
      title: `요양보호사<br/>탐색하기`,
      subtitle: `요양보호사가 필요할 때 바로 검색하고 찾아보세요! 매칭에 필요한 정보와 칭찬후기로 원하는 요양보호사를 찾을 수 있을 겁니다.`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498681-1b1dfa00-954a-11eb-9c0f-25aab2033c56.jpg',
      title: `쉿!<br/>아직 준비중입니다.`,
      subtitle: `돌봄만의 획기적인 서비스를 기대주세요.`,
    },
  ];
  const sectionRefs = Array(3)
    .fill(0)
    .map((i) => useRef<HTMLDivElement>(null));
  const [nowSection, setNowSection] = useState(-1);
  const [jumbotronIndex, setJumbotronIndex] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const imageChange = () => {
    setJumbotronIndex((jumbotronIndex + 1) % jumbotronInfo.length);
  };
  useEffect(() => {
    const change = setInterval(imageChange, 20000);
    return () => clearInterval(change);
  }, [jumbotronIndex]);
  const { contact, handleContactUpdate, handleConsultRequest } = useHeader();

  return (
    <>
      <Head>
        <title>돌봄</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header nowSection={nowSection} setNowSection={setNowSection} sectionRefs={sectionRefs} />
      <S.Layout>
        <S.Jumbotron>
          <S.BackgroundImage url={jumbotronInfo[jumbotronIndex].image} />
          <S.InnerContentContainer>
            <S.InnerContent isLeft={jumbotronInfo[jumbotronIndex].isLeft}>
              <S.JumboTitle
                isLeft={jumbotronInfo[jumbotronIndex].isLeft}
                dangerouslySetInnerHTML={{ __html: jumbotronInfo[jumbotronIndex].text }}
              ></S.JumboTitle>
              <Link href={careCenter.isLoggedIn ? '/list' : '/demo'}>
                <S.ContactButton isLeft={jumbotronInfo[jumbotronIndex].isLeft}>
                  {careCenter.isLoggedIn ? '돌봄' : '데모'} 바로가기 <RightArrowIconWhite />
                </S.ContactButton>
              </Link>
            </S.InnerContent>
          </S.InnerContentContainer>
          <S.ButtonContainer>
            <S.ButtonDiv
              onClick={() => setJumbotronIndex((jumbotronIndex + 1) % jumbotronInfo.length)}
            >
              <SlideLeftButton />
            </S.ButtonDiv>
            <S.ButtonDiv
              onClick={() => setJumbotronIndex((jumbotronIndex + 1) % jumbotronInfo.length)}
            >
              <SlideRightButton />
            </S.ButtonDiv>
          </S.ButtonContainer>
          <S.IndicatorContainer>
            {jumbotronInfo.map((item, index) => {
              return (
                <div key={`indicator-${index}`}>
                  <S.IndicatorWrapper onClick={() => setJumbotronIndex(index)}>
                    <S.Indicator mark={index === jumbotronIndex} />
                  </S.IndicatorWrapper>
                </div>
              );
            })}
          </S.IndicatorContainer>
        </S.Jumbotron>
        <S.Section ref={sectionRefs[0]}>
          <S.MenuList>
            <S.MenuItem
              isSelected={featureIndex === 0}
              onClick={(e) => {
                setFeatureIndex(0);
              }}
            >
              조건 검색
            </S.MenuItem>
            <S.MenuItem
              isSelected={featureIndex === 1}
              onClick={(e) => {
                setFeatureIndex(1);
              }}
            >
              요양보호사 풀
            </S.MenuItem>
            <S.MenuItem
              isSelected={featureIndex === 2}
              onClick={(e) => {
                setFeatureIndex(2);
              }}
            >
              칭찬 후기
            </S.MenuItem>
          </S.MenuList>
          <S.FeatureContainer>
            <S.MoniterContainer isNowSection={nowSection === 0}>
              <S.MoniterInnerImage src={featureInfo[featureIndex].image} />
              <S.MonitorMokup />
            </S.MoniterContainer>
            <S.FeatureTextContainer isNowSection={nowSection === 0}>
              <S.SectionTitle
                dangerouslySetInnerHTML={{ __html: featureInfo[featureIndex].title }}
              />
              <S.SectionSubtitle
                dangerouslySetInnerHTML={{ __html: featureInfo[featureIndex].subtitle }}
              />
            </S.FeatureTextContainer>
          </S.FeatureContainer>
        </S.Section>
        <S.Section style={{ background: 'white' }} ref={sectionRefs[1]}>
          <S.ExpansionTitle isNowSection={nowSection === 1}>돌봄 서비스 확장성</S.ExpansionTitle>
          <S.ExpansionSubtitle isNowSection={nowSection === 1}>
            돌봄만의 획기적인 서비스를 기대해주세요.
          </S.ExpansionSubtitle>
          <S.ExpansionList isNowSection={nowSection === 1}>
            {expansionInfo.map((item, index) => {
              return (
                <S.ExpansionCard key={`expansion-${index}`}>
                  <S.ExpansionCardImage src={item.image} />
                  <S.ExpansionCardTitle dangerouslySetInnerHTML={{ __html: item.title }} />
                  <S.ExpansionCardSubtitle dangerouslySetInnerHTML={{ __html: item.subtitle }} />
                </S.ExpansionCard>
              );
            })}
          </S.ExpansionList>
        </S.Section>
        <S.Section style={{ background: '#332347' }} ref={sectionRefs[2]}>
          <S.EndSectionBackground />
          <S.EndSection>
            <S.EndSectionTitle>
              간편하게 원하는 요양보호사를 탐색해보세요!
              <br />
              재가센터의 요양보호사 관리 및 매칭서비스, 돌봄
            </S.EndSectionTitle>
            <S.EndSectionSubtitle>
              돌봄이 처음이신가요?
              <br />
              아래에 연락처를 남겨 주시면 상담 연락 드리겠습니다.
            </S.EndSectionSubtitle>
            <S.StringInput
              value={contact}
              onChange={handleContactUpdate}
              type="string"
              placeholder="연락처 입력"
            />
            <S.CunsultButton onClick={handleConsultRequest}>상담 신청하기</S.CunsultButton>
            <S.Footer>
              <S.FooterBar />
              <S.FooterText>
                <span>돌봄</span> | 대표이사 : 김예지 | 개인정보관리책임자 : 백종근
                <br />
                사업자번호 : 252-63-00514
                <br />
                <br />
                Copyright ⓒ dolbom. All rights reserved.
              </S.FooterText>
            </S.Footer>
          </S.EndSection>
        </S.Section>
      </S.Layout>
    </>
  );
}
