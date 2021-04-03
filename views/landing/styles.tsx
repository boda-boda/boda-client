import styled, { css, keyframes } from 'styled-components';
import {
  FLEX_COLUMN_CENTER_END,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_CENTER,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_END,
  FLEX_ROW_CENTER_START,
  FLEX_ROW_END_CENTER,
  FLEX_ROW_SPACE_CENTER,
  THEME,
} from '../../constant';

const TABLET_BREAKPOINT = `1150px`;
const MOBILE_BREAKPOINT = `750px`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0px); }
`;

const fadeDown = keyframes`
  from { opacity: 1; transform: translateY(0px); }
  to { opacity: 0; transform: translateY(50px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Layout = styled.div`
  width: 100%;
  ${FLEX_COLUMN_START_CENTER}
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  background: ${THEME.BACKGROUND};
  ${FLEX_COLUMN_START_CENTER}
`;

interface JumbotronProps {
  url?: string;
}

export const Jumbotron = styled.div`
  position: relative;
  width: 100%;
  height: 800px;
  background-color: #1e0130;
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
  opacity: 0.7;
`;

interface DirectionProps {
  isLeft: boolean;
}

export const InnerContent = styled.div<DirectionProps>`
  width: 100%;
  padding: 0 200px;
  height: 100%;
  ${(props) => (props.isLeft ? FLEX_COLUMN_CENTER_START : FLEX_COLUMN_CENTER_END)};
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    align-items: center;
    padding: 0 20px;
  }
`;

export const JumboTitle = styled.div<DirectionProps>`
  font-size: 40px;
  font-weight: 700;
  color: white;
  text-align: ${(props) => (props.isLeft ? 'left' : 'right')};
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    text-align: center;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 32px;
  }
`;

export const ContactButton = styled.div<DirectionProps>`
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
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    transform: translateY(-3px);
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
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
  width: 14px;
  height: 14px;
  margin: 35px 4px;
  cursor: pointer;
  pointer-events: all;
`;

export const Indicator = styled.div<IndicatorProps>`
  width: ${(props) => (props.mark ? '14px' : '10px')};
  height: ${(props) => (props.mark ? '14px' : '10px')};
  border-radius: 50%;
  background: white;
  opacity: ${(props) => (props.mark ? 1 : 0.5)};
  transition: 0.2s;
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
  transition: 0.2s ease;
  ${FLEX_ROW_SPACE_CENTER};
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    position: absolute;
    padding: 20px 20px;
    background: none;
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

export const Navibar = styled.div`
  ${FLEX_ROW_END_CENTER};
`;

export const NaviItem = styled.div<HeaderProps>`
  color: ${(props) => (props.isTop ? 'white' : props.isSelected ? THEME.MAIN : THEME.GRAY_FONT)};
  margin-left: 30px;
  font-size: 20px;
  font-weight: ${(props) => (props.isTop ? 500 : 700)};
  cursor: pointer;
`;

export const MenuList = styled.div`
  width: 100%;
  margin-top: 50px;
  ${FLEX_ROW_CENTER_END}
`;

interface MenuItemProps {
  isSelected: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => (props.isSelected ? THEME.MAIN : THEME.GRAY_FONT)};
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;
  ${(props) =>
    props.isSelected &&
    css`
      ::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${THEME.MAIN};
        margin-bottom: 5px;
      }
    `}
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
    margin: 0 10px;
  }
`;

export const FeatureContainer = styled.div`
  width: 100%;
  max-width: 1250px;
  height: 100%;
  padding: 50px 0px;
  ${FLEX_ROW_SPACE_CENTER};
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const FeatureTextContainer = styled.div<ScrollProps>`
  width: 550px;
  ${FLEX_COLUMN_START_START};
  animation: ${(props) =>
    props.isNowSection
      ? css`
          ${fadeIn} 1s ease
        `
      : css`
          ${fadeOut} 1s ease
        `};
  animation-fill-mode: forwards;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    align-items: center;
    text-align: center;
    height: 200px;
    margin-top: 20px;
    width: auto;
    padding: 20px;
  }
`;

interface ScrollProps {
  isNowSection: boolean;
}

export const MoniterContainer = styled.div<ScrollProps>`
  width: 700px;
  height: 562px;
  position: relative;
  animation: ${(props) =>
    props.isNowSection
      ? css`
          ${fadeUp} 1s ease
        `
      : css`
          ${fadeDown} 1s ease
        `};
  animation-fill-mode: forwards;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    transform: scale(0.5);
    margin-top: -50px;
  }
`;

export const MonitorMokup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 698px;
  height: 562px;
  background-image: url('https://user-images.githubusercontent.com/52532871/113481179-07837c80-94d3-11eb-8e3e-c0bd349d41bd.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

interface ImageProps {
  src: string;
}

export const MoniterInnerImage = styled.div<ImageProps>`
  position: absolute;
  top: 77px;
  left: 96px;
  width: 503px;
  height: 284px;
  background: ${THEME.HEADER_BACKGROUND};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const SectionTitle = styled.div`
  color: ${THEME.GRAY_FONT};
  font-size: 36px;
  font-weight: 700;
  line-height: 120%;
  span {
    font-size: 44px;
    font-weight: 800;
  }
`;

export const SectionSubtitle = styled.div`
  color: ${THEME.GRAY_FONT};
  font-size: 24px;
  font-weight: 300;
  margin-top: 20px;
`;

export const ExpansionTitle = styled.div<ScrollProps>`
  color: ${THEME.GRAY_FONT};
  font-size: 32px;
  font-weight: 700;
  margin-top: 50px;
  animation: ${(props) =>
    props.isNowSection
      ? css`
          ${fadeIn} 1s ease
        `
      : css`
          ${fadeOut} 1s ease
        `};
  animation-fill-mode: forwards;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 24px;
  }
`;

export const ExpansionSubtitle = styled.div<ScrollProps>`
  color: ${THEME.GRAY_FONT};
  font-size: 20px;
  font-weight: 300;
  padding: 0 10px;
  text-align: center;
  animation: ${(props) =>
    props.isNowSection
      ? css`
          ${fadeIn} 1s ease
        `
      : css`
          ${fadeOut} 1s ease
        `};
  animation-fill-mode: forwards;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 18px;
  }
`;

export const ExpansionList = styled.div<ScrollProps>`
  ${FLEX_ROW_CENTER_START};
  animation: ${(props) =>
    props.isNowSection
      ? css`
          ${fadeUp} 1s ease
        `
      : css`
          ${fadeDown} 1s ease
        `};
  animation-fill-mode: forwards;
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 30px 0;
    ${FLEX_COLUMN_START_CENTER};
  }
`;

export const ExpansionCard = styled.div`
  width: 300px;
  padding: 10px;
  text-align: center;
  margin: 50px 0;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    width: 250px;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    width: 350px;
    margin: 20px 0;
  }
`;

export const ExpansionCardImage = styled.div<ImageProps>`
  width: 100%;
  height: 300px;
  background: ${THEME.HEADER_BACKGROUND};
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    height: 250px;
  }
`;

export const ExpansionCardTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin: 20px 0;
  line-height: 120%;
  color: ${THEME.GRAY_FONT};

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 24px;
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 28px;
  }
`;

export const ExpansionCardSubtitle = styled.div`
  font-size: 18px;
  font-weight: 300;
  padding: 0 20px;
  color: ${THEME.GRAY_FONT};

  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 16px;
    padding: 0;
  }
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 18px;
  }
`;

export const EndSection = styled.div`
  position: relative;
  width: 100%;
  ${FLEX_COLUMN_START_START};
  padding: 100px 200px;
  padding-bottom: 50px;
  @media screen and (max-width: ${TABLET_BREAKPOINT}) {
    padding: 100px;
    padding-bottom: 50px;
    ${FLEX_COLUMN_START_CENTER};
  }
  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 50px 40px;
  }
`;

export const EndSectionBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://user-images.githubusercontent.com/52532871/113483535-eb85d800-94de-11eb-9212-b4456162e1b9.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  opacity: 0.3;
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
  margin-top: 70px;
`;

export const FooterText = styled.div`
  color: white;
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
  margin: 20px 0;
`;
