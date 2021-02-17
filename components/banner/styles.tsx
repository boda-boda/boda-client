import styled from 'styled-components';
import { BannerStyleType } from '../../common/types';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_END,
  THEME,
} from '../../constant';

interface BannerProps {
  bannerStyle?: BannerStyleType;
  url?: string;
}

export const Banner = styled.div<BannerProps>`
  position: relative;
  width: 100%;
<<<<<<< HEAD
<<<<<<< HEAD
  height: ${(props) => (props.bannerStyle === BannerStyleType.SECTION ? '200px' : '404px')};
=======
  height: ${(props) => (props.bannerStyle === 'SECTION' ? '200px' : '404px')};
>>>>>>> 4321fff (add: 매칭제안서 작성 페이지 미완성)
=======
  height: ${(props) => (props.bannerStyle === 'SECTION' ? '200px' : '404px')};
>>>>>>> 7b172f573d593191b8fe0ef24f977d1bbb14eea6
  background: ${THEME.HEADER_BACKGROUND};
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
  width: ${CONTENT_WIDTH}px;
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
  text-align: center;
  margin-top: 10px;
  span {
    font-weight: 300;
    font-size: 16px;
    color: white;
    line-height: 1.69;
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
  background-color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  cursor: pointer;
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
  background: ${THEME.MAIN};
  opacity: ${(props) => (props.mark ? 1 : 0.5)};
  transition: 0.2s;
`;
