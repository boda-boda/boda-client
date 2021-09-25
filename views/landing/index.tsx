import * as S from './styles';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import SlideLeftButton from '../../svgs/slide-left-button-svg';
import SlideRightButton from '../../svgs/slide-right-button-svg';
import { RightArrowIconWhite } from '../../svgs/right-arrow-icon-svg';
import { useSoftRefresh } from '../../common/hooks/auth';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
  const [isTop, setIstop] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function logit() {
    setIstop(window.pageYOffset === 0 || isMobile);
  }
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
    function handleResize() {
      if (window.innerWidth <= 750 && !isMobile) setIsMobile(true);
      else if (window.innerWidth > 750 && isMobile) setIsMobile(false);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  return (
    <S.Header isTop={isTop}>
      <S.Logo>
        <S.LogoImg src={isTop ? '/logo.png' : '/logo_purple.png'} />
      </S.Logo>
      프리미엄 방문요양 서비스
    </S.Header>
  );
};

export default function Landing() {
  useSoftRefresh();
  const jumbotronLogo = `<img src='/logo.png' />`;
  const jumbotronInfo = [
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498372-4eab5500-9547-11eb-8c46-555aee277adb.jpg',
      question: `부모님께서 치매가 심해지시나요?`,
      answer: `치매는 진행 단계별 관리가 꼭 필요합니다. 저희 ${jumbotronLogo}은 단계별 인지 프로그램을 제공하여 어르신의 치매 진행을 늦춥니다.`,
      isRight: false,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133236347-11f1805a-10b8-4275-a75c-b598b6e8ddc2.jpg',
      question: `부모님께서 식사를 힘들어하시나요?`,
      answer: `어르신은 노화에 따른 삼킴장애가 심해지기 때문입니다. 저희 ${jumbotronLogo}은 삼킴 정도와 기저 질환을 고려한 식단을 제공합니다.`,
      isRight: false,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498373-50751880-9547-11eb-8a79-909a9a6e34f3.jpg',
      question: `혼자 계시는 부모님이 걱정되시나요?`,
      answer: `저희 ${jumbotronLogo}은 매일 돌봄일지를 작성하고 기초건강수치를 기록하며 각종 노인질환을 예방합니다.`,
      isRight: true,
    },
  ];
  const serviceInfo = [
    {
      image:
        'https://user-images.githubusercontent.com/52532871/132996425-f3b0f574-7938-49c1-af3d-0ec84beed1fc.jpg',
      content: `<span>유니폼</span> 착용 및 <span>자체 돌봄 키트</span> 사용`,
      subcontent: `*<span>자체 돌봄 키트</span>란? 혈압계, 혈당계, 체온계, 알콜솜, 인지프로그램 준비물이 포함된 케어에 필요한 키트`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133405674-22b7154c-5c23-4134-8100-7331a844c750.jpg',
      content: `요양보호사 전문 <span>CS(Customer Service)</span> 과정 수료`,
      subcontent: ``,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133238988-7ab4f380-934e-40e6-8932-65b9ae8dac59.jpg',
      content: `노인 전문 영양사가 개인 맞춤형 식단 제공(<span>삼킴 정도, 기호도, 기저 질환</span> 고려)`,
      subcontent: ``,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133408005-465ffca3-3157-4d53-aff0-7e1df7e9a76f.jpg',
      content: `오감 자극 <span>단계별 인지 프로그램</span> 진행`,
      subcontent: ``,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133239418-3c3c1d61-3229-47fc-9fcb-23320733906b.jpg',
      content: `혈압, 혈당, 체온, 식사량 등의 <span>기초건강수치와 돌봄일지</span>를 작성`,
      subcontent: ``,
    },
    ,
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133238693-64450d2a-3958-4ee1-833e-8d33baac5f2b.jpg',
      content: `<span>망상, 환각, 배회</span> 등과 같은 <span>행동심리 증상에 대한 전문 지식</span> 보유`,
      subcontent: ``,
      origin: 'bottom',
    },
  ];
  const verificationInfo = [
    {
      background: '#ffe77a',
      icon: 'https://cdn-icons-png.flaticon.com/512/3523/3523429.png',
      title: '국가공인자격증',
      subtitle:
        '240시간의 교육과정을 이수하여 <span>국가공인자격증</span>을 취득한 검증된 요양보호사와 함께합니다.',
    },
    {
      background: '#e1efff',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135682.png',
      title: '검증된 요양보호사',
      subtitle:
        '기존 방문요양보다 <span>전문적인 케어</span>에 동의한 <span>책임감있는 요양보호사</span>와 함께합니다. 어르신에 대한 이해도가 높은 요양보호사를 선발합니다.',
    },
    {
      background: '#e1e4eb',
      icon: 'https://cdn-icons-png.flaticon.com/512/1058/1058578.png',
      title: '전문성 강화 교육',
      subtitle:
        '선발된 요양보호사는 근무 전 <span>돌봄 전문성 강화 교육을 수강</span>합니다. 기본적인 <span>CS 교육, 전문 케어 교육, 치매 교육 및 노인질환 교육</span>을 각 분야의 전문가가 진행합니다.',
    },
    {
      background: '#e6f5d4',
      icon: 'https://cdn-icons-png.flaticon.com/512/1058/1058599.png',
      title: '정기 보완 교육',
      subtitle:
        '<span>한 달에 한 번</span> 정기적으로 <span>사례회의와 추가교육 등 보완교육</span>을 통해 서비스 품질을 향상시킵니다. 어르신(보호자)의 피드백이 있을 경우에는 이를 바탕으로 <span>즉각적인 보완교육</span>이 이루어집니다.',
    },
  ];
  const peopleInfo = [
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133982055-7ff4d220-4217-4619-9497-0cc316825766.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133980750-be97ece9-14c7-4d49-91bc-ecc8f3052dcb.jpg',
      title: 'CS교육',
      name: '조성희',
      role: '이사',
      career: `요양보호사 CS 교육 10년<br/>
      (주) 돌봄세상 이사`,
      ment: '전문성은 말과 행동의 변화에서 시작합니다',
      isRight: true,
    },
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133982037-436ce32c-bed3-4442-8958-204ee03a8369.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133980455-9eceb422-9f1c-4c29-9ec4-0f3d85a6c999.jpg',
      title: '어르신 케어 교육',
      name: '문명란',
      role: '사회복지사',
      career: `노인통합관리지도사, 노인두뇌훈련지도자<br/>
      어르신 단계별 오감 자극 자체 프로그램 개발`,
      ment: '다양한 놀이법으로 치매를 늦출 수 있습니다',
      isRight: false,
    },
    // {
    //   small:
    //     'https://user-images.githubusercontent.com/43158467/134341336-597f4809-01a8-40ad-995f-510c8d208760.png',
    //   background:
    //     'https://user-images.githubusercontent.com/43158467/134341343-45bd71d3-df86-4151-ad40-1edccf204cfd.png',
    //   title: '돌봄 식단 담당',
    //   name: '추수향',
    //   role: '영양사',
    //   career: `노인 전문 식단 경력 3년<br/>
    //   긴급 돌봄 SOS 및 복지관 업무 총괄`,
    //   ment: '한 분만을 위한 식단을 만듭니다',
    //   isRight: true,
    // },
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133982046-eafc0b09-ede8-4920-92f5-4b6abf2687f8.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133977425-43466335-754f-4229-bfc0-e8c997cfdd52.jpg',
      title: '정다운재가복지센터',
      name: '박근옥',
      role: '센터장',
      career: `노인장기요양기관 5년 운영<br/>
      사회복지 표창장 수상`,
      ment: '일상 속 복지를 실현하고자 항상 노력하겠습니다',
      isRight: false,
    },
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133981998-a2689e20-0a9f-4c26-a4c7-c5b4c02031d2.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133979580-2ee0524e-f502-428d-aeea-2b5b8aac3a08.jpg',
      title: 'A플러스사랑드림재가센터',
      name: '조재분',
      role: '센터장',
      career: `전국방문요양•목욕기관협회 상임이사<br/>
        장기요양기관 평가 최우수 기관`,
      ment: '부모님을 모시는 마음으로 사회적 효를 실천합니다',
      isRight: true,
    },
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133982020-6592d025-e4eb-4dba-8177-790ff50b3f36.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133977474-a0b561cc-5c27-4315-b8f0-f5bab51e5869.jpg',
      title: '주식회사 웁시데이지',
      name: '김예지',
      role: '대표',
      career: `프리미엄 방문 요양, 돌봄 창업<br/>
      중소벤처기업부 예비창업패키지 우수기업 선정`,
      ment: '어르신 케어의 새로운 지평을 엽니다',
      isRight: false,
    },
  ];
  const [jumbotronIndex, setJumbotronIndex] = useState(0);
  const [peopleIndex, setPeopleIndex] = useState(0);
  const imageChange = () => {
    setJumbotronIndex((jumbotronIndex + 1) % jumbotronInfo.length);
  };
  useEffect(() => {
    const change = setInterval(imageChange, 20000);
    return () => {
      clearInterval(change);
    };
  }, [jumbotronIndex]);
  useEffect(() => AOS.init(), []);
  /* const { contact, handleContactUpdate, handleConsultRequest } = useLogin(); */

  return (
    <>
      <Head>
        <title>돌봄</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <S.Layout>
        <S.Jumbotron>
          <S.BackgroundImage url={jumbotronInfo[jumbotronIndex].image} />
          <S.InnerContentContainer>
            <S.InnerContent>
              <S.JumboQuestion
                dangerouslySetInnerHTML={{ __html: jumbotronInfo[jumbotronIndex].question }}
              ></S.JumboQuestion>
              <S.JumboAnswer
                dangerouslySetInnerHTML={{ __html: jumbotronInfo[jumbotronIndex].answer }}
              ></S.JumboAnswer>
              <S.ContactButtonContainer>
                <S.ContactButton href="https://forms.gle/JB2wvsidpGgCzLjg8" target="_blank">
                  신청 바로가기 <RightArrowIconWhite />
                </S.ContactButton>
              </S.ContactButtonContainer>
            </S.InnerContent>
          </S.InnerContentContainer>
          <S.ButtonContainer>
            <S.ButtonDiv
              onClick={() =>
                setJumbotronIndex(
                  (jumbotronIndex + jumbotronInfo.length - 1) % jumbotronInfo.length
                )
              }
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
        <S.CarouselContainer>
          <Carousel showThumbs={false} showArrows={false} showStatus={false} infiniteLoop={true}>
            {jumbotronInfo.map((item, index) => (
              <div key={index} style={{ width: '100%', height: '600px' }}>
                <S.BackgroundImage url={item.image} isRight={item.isRight} />
                <S.InnerContentContainer>
                  <S.InnerContent>
                    <S.JumboQuestion
                      dangerouslySetInnerHTML={{ __html: item.question }}
                    ></S.JumboQuestion>
                    <S.JumboAnswer
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    ></S.JumboAnswer>
                    <S.ContactButtonContainer>
                      <S.ContactButton href="https://forms.gle/JB2wvsidpGgCzLjg8" target="_blank">
                        신청 바로가기 <RightArrowIconWhite />
                      </S.ContactButton>
                    </S.ContactButtonContainer>
                  </S.InnerContent>
                </S.InnerContentContainer>
              </div>
            ))}
          </Carousel>
        </S.CarouselContainer>
        <S.Section>
          <S.SectionTitle data-aos="fade">
            <img src="/logo_purple.png" />의
            <br />
            <a href="https://blog.naver.com/dol-bom/222499201207" target="_blank">
              프리미엄 방문요양
            </a>
            이란?
          </S.SectionTitle>
          <S.ServiceSubtitle>
            돌봄은 실무에 직접적인 요양보호사 교육을 통해 전문성 있는{' '}
            <a href="https://blog.naver.com/dol-bom/222497492924" target="_blank">
              방문요양
            </a>
            서비스를 제공합니다.
          </S.ServiceSubtitle>
          <S.ServiceList>
            {serviceInfo.map((item, index) => {
              return (
                <S.ServiceCard key={index} data-aos="fade-up">
                  <S.ServiceCardImage src={item.image} origin={item.origin} />
                  <S.ServiceCardTitle dangerouslySetInnerHTML={{ __html: item.content }} />
                  {item.subcontent && (
                    <S.ServiceCardSubContent
                      dangerouslySetInnerHTML={{ __html: item.subcontent }}
                    />
                  )}
                </S.ServiceCard>
              );
            })}
          </S.ServiceList>
        </S.Section>
        <S.Section style={{ background: '#f8f8f8' }}>
          <S.SectionTitle data-aos="fade">
            <img src="/logo_purple.png" />의 서비스는
            <br />
            이렇게 만들어집니다.
          </S.SectionTitle>
          <S.VerificationList>
            {verificationInfo.map((item, index) => (
              <S.VerificationItem data-aos="fade-up" key={index}>
                <S.VerificationTitle>
                  <S.VerificationIconBackground style={{ background: item.background }}>
                    <S.VerificationIcon src={item.icon} />
                  </S.VerificationIconBackground>
                  {item.title}
                </S.VerificationTitle>
                <S.VerificationSubtitle dangerouslySetInnerHTML={{ __html: item.subtitle }} />
              </S.VerificationItem>
            ))}
          </S.VerificationList>
        </S.Section>
        <S.Section>
          <S.SectionTitle data-aos="fade" isSmall>
            <img src="/logo_purple.png" />은 경험 많은
            <br />
            강사진과 재가센터가 함께합니다.
          </S.SectionTitle>
          <S.PeopleIndicatorContainer data-aos="fade">
            {peopleInfo.map((item, index) => (
              <S.PeopleIndicator
                key={index}
                src={item.small}
                isSelected={peopleIndex == index}
                onClick={() => setPeopleIndex(index)}
              ></S.PeopleIndicator>
            ))}
          </S.PeopleIndicatorContainer>
          <S.CarouselContainer style={{ height: '300px', marginTop: '20px' }}>
            <Carousel
              showThumbs={false}
              showArrows={false}
              showStatus={false}
              infiniteLoop={true}
              showIndicators={false}
              onChange={(i) => {
                setPeopleIndex(i);
              }}
              selectedItem={peopleIndex}
            >
              {peopleInfo.map((item, index) => (
                <S.PeopleCard
                  src={item.background}
                  isRight={item.isRight}
                  key={index}
                  data-aos="fade-right"
                >
                  <S.PeopleTitle>{item.title}</S.PeopleTitle>
                  <S.PeopleName>
                    {item.name}
                    <span>{item.role}</span>
                  </S.PeopleName>
                  <S.PeopleCareer
                    dangerouslySetInnerHTML={{ __html: item.career }}
                    isRight={item.isRight}
                  />
                  <S.PeopleMent>{item.ment}</S.PeopleMent>
                </S.PeopleCard>
              ))}
            </Carousel>
          </S.CarouselContainer>
          <S.PeopleList>
            {peopleInfo.map((item, index) => (
              <S.PeopleCard
                src={item.background}
                isRight={item.isRight}
                key={index}
                data-aos="fade-right"
              >
                <S.PeopleTitle>{item.title}</S.PeopleTitle>
                <S.PeopleName>
                  {item.name}
                  <span>{item.role}</span>
                </S.PeopleName>
                <S.PeopleCareer
                  dangerouslySetInnerHTML={{ __html: item.career }}
                  isRight={item.isRight}
                />
                <S.PeopleMent>{item.ment}</S.PeopleMent>
              </S.PeopleCard>
            ))}
          </S.PeopleList>
        </S.Section>
        <S.Section>
          <S.EventSection>
            <S.EventImage>
              <S.EventContactButton href="https://forms.gle/JB2wvsidpGgCzLjg8" target="_blank">
                신청 바로가기 <RightArrowIconWhite />
              </S.EventContactButton>
            </S.EventImage>
          </S.EventSection>
        </S.Section>
        <S.Section>
          <S.SectionTitle>협력 기관</S.SectionTitle>
          <S.LogoList>
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295373-bb85905a-1511-43be-89c5-152cc4ed1bf3.png" />
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133297324-9d00549e-8007-4ead-a1d5-a61ed54972d8.gif" />
            {/* <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295376-0a343e10-d579-42b4-8c19-b07c7f69cc38.jpg" /> */}
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295378-0eea03e3-8e44-45bf-919c-3e2d837b348a.jpg" />
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295379-dd4b9062-ed47-45b9-9a0e-c13039b5b596.jpg" />
            {/* <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133297326-eca3de23-91fd-42a9-8d54-803761ab0864.png" /> */}
          </S.LogoList>
        </S.Section>
        <S.FooterBar />
        <S.Footer>
          <S.FooterText>
            <S.FooterTitle>
              고객센터: 010-5618-9508
              <br />
              (평일 9시 ~ 18시)
            </S.FooterTitle>
            이메일(비즈니스{'&'}제휴): info@dol-bom.com
            <br />
            <br />
          </S.FooterText>
          <S.FooterText>
            <S.FooterTitle>웁시데이지(주)</S.FooterTitle>
            사업자번호 : 825-88-02119 | 대표 김예지
            <br />
            서울특별시 노원구 동일173길 27 서울창업디딤터
            <br />
            <br />
            Copyright ⓒ dolbom. All rights reserved.
            <br />
            Icon{' '}
            <a href="https://www.freepik.com" title="Freepik" style={{ color: '#4e515c' }}>
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/kr/" title="Flaticon" style={{ color: '#4e515c' }}>
              www.flaticon.com
            </a>
          </S.FooterText>
        </S.Footer>
      </S.Layout>
    </>
  );
}
