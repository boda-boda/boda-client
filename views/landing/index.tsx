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
      question: `어머님께서 치매가 심해지시나요?`,
      answer: `치매는 진행 단계별 관리가 꼭 필요합니다. 저희 ${jumbotronLogo}은 단계별 인지 프로그램을 제공하여 어르신의 치매 진행을 늦춥니다.`,
      isRight: false,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133236347-11f1805a-10b8-4275-a75c-b598b6e8ddc2.jpg',
      question: `어머님께서 식사를 힘들어하시나요?`,
      answer: `어르신은 노화에 따른 삼킴장애가 심해지기 때문입니다. 저희 ${jumbotronLogo}은 삼킴 정도와 기저 질환을 고려한 식단을 제공합니다.`,
      isRight: false,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/113498373-50751880-9547-11eb-8a79-909a9a6e34f3.jpg',
      question: `혼자 계시는 어머님이 걱정되시나요?`,
      answer: `저희 ${jumbotronLogo}은 매일 돌봄일지를 작성하고 기초건강수치를 기록하며 각종 노인질환을 예방합니다.`,
      isRight: true,
    },
  ];
  const serviceInfo = [
    {
      image:
        'https://user-images.githubusercontent.com/52532871/132996425-f3b0f574-7938-49c1-af3d-0ec84beed1fc.jpg',
      content: `<span>유니폼</span> 착용 및 <span>자체 돌봄 키트</span> 사용`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133405674-22b7154c-5c23-4134-8100-7331a844c750.jpg',
      content: `<span>어르신을 존중하는 대화법</span> 사용`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133238988-7ab4f380-934e-40e6-8932-65b9ae8dac59.jpg',
      content: `<span>삼킴 정도와 기저 질환</span>을 고려한 식단 제공`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133408005-465ffca3-3157-4d53-aff0-7e1df7e9a76f.jpg',
      content: `<span>단계별 인지 프로그램</span> 진행`,
    },
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133239418-3c3c1d61-3229-47fc-9fcb-23320733906b.jpg',
      content: `혈압, 혈당, 체온, 식사량 등의 <span>기초건강수치와 돌봄일지</span>를 작성`,
    },
    ,
    {
      image:
        'https://user-images.githubusercontent.com/52532871/133238693-64450d2a-3958-4ee1-833e-8d33baac5f2b.jpg',
      content: `<span>망상, 환각, 배회</span> 등과 같은 <span>행동심리 증상에 대한 전문 지식</span> 보유`,
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
        '기존 방문요양보다 <span>전문적인 케어</span>에 동의한 <span>책임감있는 요양보호사</span>와 함께합니다. 안정적인 근무가 가능하도록 근무에 대한 이해도가 높은 요양보호사를 선발합니다.',
    },
    {
      background: '#e1e4eb',
      icon: 'https://cdn-icons-png.flaticon.com/512/1058/1058578.png',
      title: '전문성 강화 교육',
      subtitle:
        '선발된 요양보호사는 근무 전 <span>돌봄 전문성 강화 교육을 수강</span>합니다. 기본적인 <span>CS 마인드, 전문 케어 교육, 행동심리 및 의료교육</span>을 각 분야의 전문가가 진행합니다.',
    },
    {
      background: '#e6f5d4',
      icon: 'https://cdn-icons-png.flaticon.com/512/1058/1058599.png',
      title: '정기 보완 교육',
      subtitle:
        '한 달에 한 번 정기적으로 <span>사례회의와 추가교육 등 보완교육</span>을 통해 서비스 품질을 향상시킵니다. 어르신(보호자)의 피드백이 있을 경우에는 이를 바탕으로 <span>즉각적인 보완교육</span>이 이루어집니다.',
    },
  ];
  const peopleInfo = [
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133298465-5866fdbf-8a9c-4e33-b9bd-dd105f3b2e80.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133289722-9c8882d5-9022-4b15-8052-6104b7612e10.jpg',
      title: 'CS교육',
      name: '조성희',
      role: '대표님',
      career: `노인장기요양기관 5년 운영<br/>
      2019년도 장기요양기관 평가 최우수 기관 선정`,
      ment: '눈을 맞추고 손을 맞잡으며 함께 합니다.',
      isRight: true,
    },
    /*     {
      small:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAxMDRfMjk5%2FMDAxNTQ2NTM0NDYzNDA2.N964Gq3q9-8pknGxXz0jlqvPXrt6WGkg7Djtrk3y6sUg.rTm-y9YBHW8F8IuaKuZfZf9Ls9JcmCtJXvEeBnhyoQUg.JPEG.wjdtjdrbs123%2FIMG_20190104_004804.jpg&type=sc960_832',
      background:
        'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      title: '어르신 케어 교육',
      name: '문명란',
      role: '선생님',
      career: `1999 출생<br/>
      2021 도쿄올림픽 배구 4강 진출`,
      ment: '다 흩어진 후에야 들리지만',
      isRight: false,
    }, */
    /*     {
      small:
        'https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5129%2F2017%2F04%2F16%2F1492322043_1231576_20170416145718050.jpg&type=sc960_832',
      background:
        'https://thumbs.dreamstime.com/b/confident-professional-young-woman-blue-blouse-pointing-finger-upper-left-corner-looking-camera-persuade-customer-make-174846578.jpg',
      title: '행동심리 의료 교육',
      name: '손유리',
      role: '의사님',
      career: `1999 출생<br/>
      2021 도쿄올림픽 배구 4강 진출`,
      ment: '특별한 기적을 기다리지 마',
      isRight: false,
    }, */
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133298468-24d6a1e9-522c-4aa5-9443-1dc3248bcc57.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133289708-34ede9b5-9188-47e3-a3e6-56a11ffa8ed0.jpg',
      title: 'A플러스사랑드림재가센터',
      name: '조재분',
      role: '센터장님',
      career: `노인장기요양기관 5년 운영<br/>
      2019년도 장기요양기관 평가 최우수 기관 선정`,
      ment: '눈을 맞추고 손을 맞잡으며 함께 합니다.',
      isRight: false,
    },
    {
      small:
        'https://user-images.githubusercontent.com/52532871/133298392-a4708c35-aec3-4a06-99a5-938025543604.jpg',
      background:
        'https://user-images.githubusercontent.com/52532871/133289719-3195e5ec-4bae-4559-9758-43348c014b7c.jpg',
      title: '정다운재가복지센터',
      name: '정은희',
      role: '사회복지사님',
      career: `노인장기요양기관 5년 운영<br/>
      2019년도 장기요양기관 평가 최우수 기관 선정`,
      ment: '눈을 맞추고 손을 맞잡으며 함께 합니다.',
      isRight: true,
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
            <span>프리미엄 방문요양</span>이란?
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
            강사진과 재가센터와 함께 합니다.
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
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295376-0a343e10-d579-42b4-8c19-b07c7f69cc38.jpg" />
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295378-0eea03e3-8e44-45bf-919c-3e2d837b348a.jpg" />
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133295379-dd4b9062-ed47-45b9-9a0e-c13039b5b596.jpg" />
            <S.LogoItem src="https://user-images.githubusercontent.com/52532871/133297326-eca3de23-91fd-42a9-8d54-803761ab0864.png" />
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
