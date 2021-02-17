import styled, { css } from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_END_CENTER,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
  THEME,
} from '../../constant';

export const CgList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface SectionProps {
  isBackgroundColored: boolean;
}

export const Section = styled.div<SectionProps>`
  width: 100%;
  ${FLEX_COLUMN_CENTER_CENTER};
  padding: 60px 0;
  background: ${(props) => (props.isBackgroundColored ? THEME.BACKGROUND : 'white')};
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.GRAY_LINE};
  ${FLEX_COLUMN_CENTER_START};
`;

export const SectionTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
`;

interface TimeSeleceContainerProps {
  isLast: boolean;
}

export const TimeSelectContainer = styled.div<TimeSeleceContainerProps>`
  ${FLEX_ROW_SPACE_CENTER};
  padding: 12px;
  border-bottom: ${(props) => (props.isLast ? 'none' : css`1px solid ${THEME.GRAY_LINE}`)};
`;

export const FilterTable = styled.table`
  width: 100%;
  margin-top: 24px;
  border-top: 2px solid ${THEME.MAIN};
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 12px;
    color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    vertical-align: text-top;
  }
  th {
    width: 84px;
    background: ${THEME.HEADER_BACKGROUND};
  }
`;

export const TdFlexBox = styled.div`
  ${FLEX_ROW_START_CENTER};
`;

export const DropDown = styled.select`
  width: 192px;
  height: 36px;
  padding: 0 0 0 10px;
  margin-right: 10px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
  option {
    color: ${THEME.GRAY_FONT};
  }
`;

interface ToggleButtonProps {
  isSelected: boolean;
}

export const ToggleButton = styled.div<ToggleButtonProps>`
  padding: 0 15px;
  height: 36px;
  margin-right: 10px;
  border-radius: 3px;
  background-color: ${(props) => (props.isSelected ? THEME.MAIN : 'white')};
  border: ${(props) =>
    props.isSelected ? css`1px solid ${THEME.MAIN}` : css`1px solid ${THEME.GRAY_LINE}`};
  color: ${(props) => (props.isSelected ? 'white' : THEME.GRAY_FONT)};
  ${FLEX_ROW_CENTER_CENTER};
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const ClockSelect = styled.div`
  width: 120px;
  height: 36px;
  padding: 0 0 0 15px;
  color: ${THEME.GRAY_FONT};
  ${FLEX_ROW_SPACE_CENTER};
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  margin-right: 10px;
  margin-left: 20px;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const AddButton = styled.div`
  width: 36px;
  height: 36px;
  ${FLEX_ROW_CENTER_CENTER};
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
`;

export const ResetButtonContainer = styled.div`
  width: 100%;
  ${FLEX_ROW_END_CENTER};
`;

export const ResetButton = styled.button`
  width: 100px;
  height: 36px;
  margin-top: 20px;
  ${FLEX_ROW_CENTER_CENTER};
  border-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: ${THEME.MAIN};
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
`;

export const CardList = styled.div`
  width: 100%;
  ${FLEX_ROW_SPACE_CENTER};
  flex-wrap: wrap;
  margin-top: -6px;
`;

export const Card = styled.div`
  position: relative;
  width: 474px;
  height: 169px;
  padding: 25px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
`;

interface ProfileImageProps {
  src: string;
}

export const ProfileImage = styled.div<ProfileImageProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${THEME.BACKGROUND};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const InfoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 25px 0px 25px 145px;
  width: 100%;
  height: 100%;
`;

export const BasicInfo = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 20px;
`;

export const Time = styled.div`
  position: absolute;
  right: 25px;
  top: 25px;
  font-size: 12px;
  color: ${THEME.GRAY_FONT};
`;

export const InfoTable = styled.table`
  position: absolute;
  left: 145px;
  top: 62px;
  border-spacing: 0 5px;
  th,
  td {
    height: 19px;
  }
  th {
    text-align: left;
    padding: 0 5px;
    width: 70px;
    color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
    font-weight: 500;
    ${FLEX_ROW_START_CENTER};
  }
  td {
    text-align: left;
    color: ${THEME.GRAY_FONT};
  }
`;

export const SVGIconBox = styled.div`
  ${FLEX_ROW_START_CENTER};
`;

export const InfoItem = styled.div`
  height: 19px;
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  font-size: 11px;
  color: ${THEME.GRAY_FONT};
  margin-right: 5px;
  padding: 0 5px;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const InfoItemList = styled.div`
  width: 100%;
  ${FLEX_ROW_START_CENTER};
  flex-wrap: nowrap;
`;

export const StyledLink = styled.a`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
`;