import styled from 'styled-components';
import {
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_END,
  THEME,
} from '../../constant';

interface BannerProps {
  bannerStyle?: string;
  url?: string;
}

export const Banner = styled.div<BannerProps>`
  position: relative;
  width: 100vw;
  height: ${(props) => (props.bannerStyle === 'section' ? '200px' : '404px')};
  background: ${THEME.LIGHTPURPLE};
`;

export const InnerContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContent = styled.div`
  width: 978px;
  height: 100%;
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const BackgroundImage = styled.div<BannerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s ease;
`;

export const Title = styled.div`
  font-size: 36px;
  color: white;
`;

export const SubTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: white;
  margin-top: 20px;
`;

export const IndicatorContainer = styled.div`
  ${FLEX_ROW_CENTER_END};
  width: 100%;
  height: 100%;
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
`;

export const Indicator = styled.div<IndicatorProps>`
  width: ${(props) => (props.mark ? '14px' : '10px')};
  height: ${(props) => (props.mark ? '14px' : '10px')};
  border-radius: 50%;
  background: ${THEME.MAIN};
  opacity: ${(props) => (props.mark ? 1 : 0.5)};
  transition: 0.2s;
`;
