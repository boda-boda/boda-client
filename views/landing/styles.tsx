import styled, { css, keyframes } from 'styled-components';
import {
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_END,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_CENTER,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_END,
  FLEX_ROW_SPACE_CENTER,
  THEME,
} from '../../constant';

const TABLET_BREAKPOINT = `1150px`;
const MOBILE_BREAKPOINT = `750px`;

export const Layout = styled.div`
  width: 100%;
  ${FLEX_COLUMN_START_CENTER}
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  background: white;
  ${FLEX_COLUMN_START_CENTER};
  padding: 80px 0;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 40px 0;
  }
`;

interface JumbotronProps {
  url?: string;
}

export const Jumbotron = styled.div<JumbotronProps>`
  position: relative;
  width: 100vw;
  height: 800px;
  background-color: #1e0130;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

export const CarouselContainer = styled.div`
  display: none;
  position: relative;
  width: 100vw;
  height: 600px;
  background-color: #1e0130;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: block;
  }
`;

export const InnerContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  ${FLEX_COLUMN_START_CENTER}
`;

export const BackgroundImage = styled.div<JumbotronProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: 0.2s ease;
  opacity: 0.6;
`;

export const InnerContent = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  ${FLEX_COLUMN_CENTER_CENTER};
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    padding: 0 40px;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 20px;
    padding-top: 180px;
  }
`;

export const JumboQuestion = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: white;
  border-bottom: 1px solid white;
  padding-bottom: 5px;
  ::before {
    content: '“';
    margin-right: 10px;
  }
  ::after {
    content: '”';
    margin-left: 10px;
  }
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 36px;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 22px;
    ::before {
      content: '';
      margin: 0;
    }
    ::after {
      content: '';
      margin: 0;
    }
  }
`;

export const JumboAnswer = styled.div`
  font-size: 30px;
  font-weight: 500;
  color: white;
  text-align: center;
  margin-top: 20px;
  img {
    height: 40px;
    padding-top: 5px;
    margin-bottom: -5px;
  }
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 28px;
    line-height: 1.8;
    img {
      height: 35px;
      margin-bottom: -3px;
    }
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 20px;
    text-align: left;
    margin-top: 10px;
    img {
      height: 35px;
      margin-bottom: -5px;
    }
  }
`;

export const ContactButtonContainer = styled.div`
  margin-top: 100px;
  z-index: 10;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 0;
    padding-bottom: 100px;
  }
`;

export const ContactButton = styled.a`
  display: block;
  padding: 10px 20px;
  margin-top: 20px;
  outline: none;
  border: 1px solid white;
  color: white;
  font-weight: 500;
  font-size: 20px;
  border-radius: 3px;
  background: none;
  z-index: 1;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    transform: translateY(-3px);
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    background: white;
    color: ${THEME.MAIN};
    border-radius: 100px;
    svg > path:first-child {
      fill: ${THEME.MAIN};
    }
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${FLEX_ROW_CENTER_CENTER};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const ButtonDiv = styled.div`
  width: 50px;
  height: 50px;
  opacity: 0.25;
  background-color: ${THEME.PLACEHOLDER_UNACTIVE};
  cursor: pointer;
  transition: 0.3s;
  :hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  }
`;

export const IndicatorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${FLEX_ROW_CENTER_END};
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

interface IndicatorProps {
  mark: boolean;
}

export const IndicatorWrapper = styled.div`
  ${FLEX_ROW_CENTER_CENTER};
  margin: 35px 4px;
  cursor: pointer;
  pointer-events: all;
`;

export const Indicator = styled.div<IndicatorProps>`
  width: ${(props) => (props.mark ? '20px' : '10px')};
  height: 10px;
  border-radius: 5px;
  background: white;
  opacity: ${(props) => (props.mark ? 1 : 0.5)};
  transition: width linear 0.2s;
`;

interface HeaderProps {
  isTop: boolean;
  isSelected?: boolean;
}

export const Header = styled.div<HeaderProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 20px 60px;
  background: ${(props) => (props.isTop ? 'none' : 'white')};
  ${FLEX_ROW_SPACE_CENTER};
  color: ${(props) => (props.isTop ? 'white' : THEME.MAIN)};
  transition: 0.2s ease;
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    position: absolute;
    background: none;
    color: white;
    padding: 20px 20px;
  }
`;

export const Logo = styled.div`
  width: 100px;
  height: 45px;
`;

export const LogoImg = styled.img`
  width: auto;
  height: 100%;
`;

export const SectionSubtitle = styled.div`
  color: ${THEME.GRAY_FONT};
  font-size: 24px;
  font-weight: 300;
  margin-top: 20px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 20px;
  }
`;

export const SectionTitle = styled.div`
  color: ${THEME.GRAY_FONT};
  font-size: 32px;
  font-weight: 700;
  margin-top: 50px;
  line-height: 1.8;
  text-align: center;
  img {
    height: 40px;
    padding-top: 5px;
    margin-bottom: -5px;
    margin-right: 3px;
  }
  span {
    font-size: inherit;
    font-weight: 700;
    background-color: ${THEME.HEADER_BACKGROUND};
    padding: 0 5px;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 24px;
    img {
      height: 32px;
      padding-top: 5px;
      margin-bottom: -5px;
      margin-right: 3px;
    }
  }
`;

export const ServiceSubtitle = styled.div`
  color: ${THEME.GRAY_FONT};
  font-size: 20px;
  font-weight: 400;
  padding: 0 10px;
  margin-top: 20px;
  text-align: center;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
  }
  a {
    font-size: 20px;
    font-weight: 300;
    border-bottom: 1px dotted ${THEME.GRAY_FONT};
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
      font-size: 18px;
    }
    ::after {
      width: 18px;
      height: 18px;
      display: inline-block;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' enable-background='new 0 0 50 50'%3E%3Cpath fill='%234e515c' d='M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15z'/%3E%3Cpath fill='%234e515c' d='M19.8 19.6c.3-.8.6-1.4 1.2-1.9.5-.5 1.1-.9 1.9-1.2s1.6-.4 2.5-.4c.7 0 1.4.1 2 .3.6.2 1.2.5 1.7.9s.9.9 1.1 1.5c.3.6.4 1.3.4 2 0 1-.2 1.8-.6 2.5s-1 1.3-1.6 2l-1.3 1.3c-.3.3-.6.6-.7.9-.2.3-.3.7-.3 1.1-.1.4-.1.7-.1 1.5h-1.6c0-.8 0-1.1.1-1.7.1-.5.3-1 .5-1.5.2-.4.5-.8.9-1.2.4-.4.9-.8 1.4-1.4.5-.5.9-1 1.2-1.5s.5-1.2.5-1.8c0-.5-.1-1-.3-1.4-.2-.4-.5-.8-.8-1.1-.3-.3-.7-.5-1.2-.7-.5-.2-.9-.3-1.4-.3-.7 0-1.3.1-1.8.4-.5.2-1 .6-1.3 1-.3.4-.6.9-.8 1.5s-.4.9-.4 1.6h-1.6c0-.9.1-1.6.4-2.4zM26 32v2h-2v-2h2z'/%3E%3C/svg%3E");
      background-size: contain;
      content: '';
    }
  }
`;

export const ServiceList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 50px;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 30px 0;
    ${FLEX_COLUMN_START_CENTER};
  }
`;

export const ServiceCard = styled.div`
  width: 300px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    margin: 10px 0;
  }
`;

interface ImageProps {
  src: string;
}

export const ServiceCardImage = styled.div<ImageProps>`
  width: 100%;
  height: 200px;
  background: ${THEME.HEADER_BACKGROUND};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    height: 150px;
  }
`;

export const ServiceCardTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0;
  line-height: 1.5;
  color: ${THEME.GRAY_FONT};
  ::before {
    content: '✔ ';
    color: ${THEME.MAIN};
  }
  span {
    font-size: inherit;
    color: inherit;
    font-weight: 700;
  }

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 16px;
    margin: 10px 0;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

export const VerificationList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1000px;
  padding: 0 40px;
  margin-top: 80px;
  gap: 80px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    ${FLEX_COLUMN_START_START};
    padding: 0 20px;
  }
`;

export const VerificationItem = styled.div`
  ${FLEX_COLUMN_START_START};
`;

export const VerificationIconBackground = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 10px;
`;

export const VerificationIcon = styled.div<ImageProps>`
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const VerificationTitle = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${THEME.GRAY_FONT};
  margin-top: 10px;
`;

export const VerificationSubtitle = styled.div`
  font-size: 18px;
  color: ${THEME.GRAY_FONT};
  margin-top: 5px;
`;

export const PeopleIndicatorContainer = styled.div`
  display: none;
  width: 100%;
  margin-top: 40px;
  gap: 10px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    ${FLEX_ROW_CENTER_CENTER};
  }
`;

interface PeopleIndicatorProps {
  src: string;
  isSelected: boolean;
}

export const PeopleIndicator = styled.div<PeopleIndicatorProps>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  transition: 0.2s ease;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    ${(props) =>
      !props.isSelected &&
      css`
        filter: grayscale(100%);
      `}
  }
`;

interface PeopleCardProps {
  src?: string;
  isRight: boolean;
}

export const PeopleCarousel = styled.div<PeopleCardProps>`
  width: 100%;
  max-width: 700px;
  position: relative;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 20px;
  ${(props) => (props.isRight ? FLEX_COLUMN_CENTER_END : FLEX_COLUMN_CENTER_START)};
  display: none;
  padding: 30px;
  transition: 0.2s ease;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
  }
`;

export const PeopleList = styled.div`
  width: 100%;
  max-width: 1000px;
  ${FLEX_COLUMN_START_CENTER};
  margin-top: 40px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

export const PeopleCard = styled.div<PeopleCardProps>`
  width: 100%;
  max-width: 800px;
  position: relative;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  ${(props) => (props.isRight ? FLEX_COLUMN_CENTER_END : FLEX_COLUMN_CENTER_START)};
  padding: 50px;
`;

export const PeopleTitle = styled.div`
  color: ${THEME.MAIN};
  font-weight: 700;
  font-size: 18px;
  margin-bottom: -5px;
`;

export const PeopleName = styled.div`
  color: ${THEME.GRAY_FONT};
  font-weight: 700;
  font-size: 24px;
  span {
    font-weight: 600;
    font-size: 20px;
    margin-left: 3px;
  }
`;

export const PeopleCareer = styled.div<PeopleCardProps>`
  text-align: ${(props) => (props.isRight ? 'right' : 'left')};
  color: ${THEME.GRAY_FONT};
  font-weight: 500;
  ${(props) =>
    props.isRight
      ? css`
          border-right: 2px solid ${THEME.MAIN};
        `
      : css`
          border-left: 2px solid ${THEME.MAIN};
        `};
  padding: 0 10px;
  margin: 0 5px;
`;

export const PeopleMent = styled.div`
  color: ${THEME.GRAY_FONT};
  margin-top: 20px;
  font-size: 20px;
  font-weight: 800;
  ::before {
    content: '“';
  }
  ::after {
    content: '”';
  }
`;

export const EndSection = styled.div`
  position: relative;
  width: 100%;
  ${FLEX_COLUMN_START_START};
  padding: 20px 30px;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    padding: 100px;
    padding-bottom: 50px;
    ${FLEX_COLUMN_START_CENTER};
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 50px 20px;
  }
`;

export const EndSectionTitle = styled.div`
  color: white;
  font-size: 36px;
  font-weight: 700;
  z-index: 1;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    text-align: center;
    font-size: 18px;
  }
`;

export const EndSectionSubtitle = styled.div`
  color: white;
  font-size: 20px;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
  }
`;

export const StringInput = styled.input`
  width: 500px;
  height: 46px;
  margin: 20px 0;
  padding: 10px;
  border-radius: 3px;
  font-size: 14px;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  outline: none;
  border: 1px solid ${THEME.LOCATION_LINE};
  transition: 0.2s ease;
  margin-bottom: 16px 0;
  :focus {
    border: 1px solid ${THEME.MAIN};
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 320px;
  }
`;

export const CunsultButton = styled.button`
  width: 200px;
  height: 48px;
  border-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  background-color: ${THEME.MAIN};
  cursor: pointer;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
`;

export const FooterText = styled.div`
  color: ${THEME.GRAY_FONT};
  font-size: 14px;
  line-height: 1.71;
  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const FooterBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.GRAY_LINE};
`;

export const EventContactButton = styled.a`
  font-size: 18px;
  background: ${THEME.MAIN};
  border-radius: 100px;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 40px;
  outline: none;
  border: 1px solid white;
  color: white;
  font-weight: 500;
  font-size: 20px;
  border-radius: 100px;
  z-index: 1;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    transform: translateY(-3px);
  }
`;
