import styled, { css } from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_END,
  FLEX_COLUMN_CENTER_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_END_CENTER,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
  FLEX_ROW_START_START,
  THEME,
  FLEX_ROW_START_END,
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
  background: ${(props) => (props.isBackgroundColored ? THEME.BACKGROUND : 'white')};
  position: relative;
`;

interface BlurProps {
  isBlur?: boolean;
}

export const InnerSection = styled.div<BlurProps>`
  width: 100%;
  height: 100%;
  padding: 30px 0;
  ${FLEX_COLUMN_CENTER_CENTER};
  filter: ${(props) => props.isBlur && `blur(4px)`};
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.GRAY_LINE};
  ${FLEX_COLUMN_CENTER_START};
  position: relative;
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
  padding: 10px;
  border-bottom: ${(props) => (props.isLast ? 'none' : css`1px solid ${THEME.GRAY_LINE}`)};
`;

export const FilterTable = styled.table`
  width: 100%;
  margin-top: 12px;
  border-top: 2px solid ${THEME.MAIN};
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 12px;
    color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
    font-weight: 500;
    text-align: left;
    vertical-align: middle;
  }
  th {
    padding: 23px 12px;
    vertical-align: top;
    width: 84px;
    background: ${THEME.HEADER_BACKGROUND};
  }
  .available {
    border-right: 1px solid ${THEME.GRAY_LINE};
    width: 10%;
    position: relative;
    padding: 0;
    font-weight: 400;
    color: ${THEME.GRAY_FONT};
    cursor: pointer;
  }
  .hoverDiv {
    width: 100%;
    height: 100%;
    padding: 12px;
    :hover {
      background-color: ${THEME.HOVER_PURPLE};
    }
  }
  .right {
    border-right: none;
  }
  .innerTable {
    padding: 0;
    /* border-bottom: none; */
  }
  .last {
    border-bottom: none;
  }
  .innerTableHeader {
    padding: 12px 12px;
  }
  table {
    border: none;
    padding: none;
    border-collapse: collapse;
    width: 100%;
  }
`;

export const TdFlexBox = styled.div`
  ${FLEX_ROW_START_CENTER};
  .square {
    width: 36px;
    padding: 0;
  }
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
  cursor: pointer;
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
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    border: solid 1px ${THEME.MAIN};
    color: ${(props) => !props.isSelected && THEME.MAIN};
  }
`;

export const ClockSelectContainer = styled.div`
  position: relative;
  width: 120px;
  height: 36px;
  ${FLEX_ROW_CENTER_CENTER};
  color: ${THEME.GRAY_FONT};
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  margin-right: 10px;
  margin-left: 20px;
  outline: none;
  :focus {
    border: solid 1px ${THEME.MAIN};
  }
`;

export const ClockInput = styled.input`
  border: none;
  outline: none;
  width: 30%;
  text-align: right;
  color: ${THEME.GRAY_FONT};
`;

export const TextInput = styled.input`
  outline: none;
  width: 153.3px;
  height: 36px;
  border-radius: 3px;
  border: solid 1px ${THEME.GRAY_BORDER};
  padding: 0 10px;
  color: ${THEME.GRAY_FONT};
  transition: 0.2s ease;
  :hover {
    border: solid 1px ${THEME.MAIN};
  }
  :focus {
    border: solid 1px ${THEME.MAIN};
  }
`;

export const PlusMinusButtonContainer = styled.div`
  display: flex;
`;

interface PlusMinusButtonProps {
  hide?: boolean;
}

export const PlusMinusButton = styled.button<PlusMinusButtonProps>`
  width: 36px;
  height: 36px;
  ${FLEX_ROW_CENTER_CENTER};
  border-radius: 3px;
  margin-left: 10px;
  border: 1px solid ${THEME.GRAY_LINE};
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: ${(props) => (props.hide ? 'normal' : `pointer`)};
  background-color: white;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transition: 0.2s ease;
  :hover {
    border: solid 1px ${THEME.MAIN};
  }
`;

export const CheckBox = styled.input`
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
`;

export const ResetButtonContainer = styled.div`
  width: 100%;
  ${FLEX_ROW_END_CENTER};
`;

interface ButtonProps {
  isReset?: boolean;
}

export const FilterButton = styled.button<ButtonProps>`
  width: 100px;
  height: 36px;
  margin-top: 20px;
  margin-left: 20px;
  ${FLEX_ROW_CENTER_CENTER};
  border-radius: 3px;
  box-shadow: ${(props) => (props.isReset ? 'none' : '0 3px 6px 0 rgba(0, 0, 0, 0.16)')};

  background-color: ${(props) => (props.isReset ? 'white' : THEME.MAIN)};
  outline: none;
  border: none;
  color: ${(props) => (props.isReset ? THEME.MAIN : 'white')};
  border: ${(props) => (props.isReset ? `1px solid ${THEME.MAIN}` : 'none')};
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    background-color: ${(props) => props.isReset && THEME.MAIN};
    color: ${(props) => props.isReset && 'white'};
    border: ${(props) => props.isReset && 'none'};
    box-shadow: ${(props) =>
      props.isReset ? '0 3px 6px 0 rgba(0, 0, 0, 0.16)' : '0 3px 6px 0 rgba(0, 0, 0, 0.3)'};
  }
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
  height: 160px;
  padding: 25px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: -10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  ${FLEX_ROW_SPACE_CENTER};
  transition: 0.2s ease;
  :hover {
    /* border: solid 1px ${THEME.MAIN}; */
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
  }
`;
export const EmptyCardContainer = styled.div`
  width: 100%;
  ${FLEX_COLUMN_CENTER_CENTER};
  flex-wrap: wrap;
  margin-top: -6px;
`;
export const EmptyCard = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  padding: 25px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  font-size: 20px;
  ${FLEX_COLUMN_CENTER_CENTER};
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
  cursor: pointer;
`;

export const BasicInfo = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 15px;
`;

export const Time = styled.div`
  position: absolute;
  right: 25px;
  top: 25px;
  font-size: 12px;
  color: ${THEME.GRAY_FONT};
`;

export const InfoRow = styled.div`
  ${FLEX_ROW_START_START};
  margin-bottom: 5px;
`;

export const InfoType = styled.div`
  min-width: 70px;
  padding-left: 5px;
  margin-top: -1px;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  font-weight: 500;
`;

export const InfoValue = styled.div`
  margin-top: -1px;
  color: ${THEME.GRAY_FONT};
`;

export const SVGIconBox = styled.div`
  ${FLEX_ROW_START_CENTER};
  min-width: 19px;
  min-height: 19px;
`;

export const InfoItem = styled.div`
  height: 19px;
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  font-size: 11px;
  color: ${THEME.GRAY_FONT};
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 0 5px;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const InfoItemList = styled.div`
  ${FLEX_ROW_START_START};
  flex-wrap: wrap;
`;

export const StyledLink = styled.span`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
`;

export const ConsonantFilterList = styled.div`
  width: 100%;
  height: 40px;
  margin-top: 20px;
  border-bottom: 5px solid ${THEME.MAIN};
  ${FLEX_ROW_START_END};
`;

interface NameFilterItemProps {
  isClicked: boolean;
  isLeft?: boolean;
}

export const ConsonantFilterItem = styled.div<NameFilterItemProps>`
  border: 1px solid ${(props) => (props.isClicked ? THEME.MAIN : THEME.GRAY_LINE)};
  margin-left: ${(props) => !props.isLeft && '-1px'};
  outline-offset: -1px;
  border-bottom: none;
  height: ${(props) => (props.isClicked ? '40px' : '35px')};
  background-color: ${(props) => (props.isClicked ? THEME.MAIN : 'white')};
  color: ${(props) => (props.isClicked ? 'white' : THEME.GRAY_FONT)};
  flex-grow: 1;
  transition: 0.2s ease;
  border-radius: 10px 10px 0 0;
  ${FLEX_ROW_CENTER_CENTER};
  cursor: pointer;
  z-index: ${(props) => props.isClicked && 1};
  :hover {
    color: ${(props) => !props.isClicked && THEME.MAIN};
    border: solid 1px ${THEME.MAIN};
    border-bottom: none;
    z-index: 1;
  }
`;

export const NeedLogin = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const NeedLoginModal = styled.div`
  width: 978px;
  height: 329px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  color: ${THEME.GRAY_FONT};
  font-size: 36px;
  font-weight: 500;
  padding: 0 250px;
  text-align: center;
  word-break: keep-all;
  filter: blur(0px);
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const CareWorkersPerPageContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  ${FLEX_COLUMN_CENTER_END}
`;

export const CareWorkersPerPageDropDown = styled.select`
  width: 112px;
  height: 36px;
  padding: 0 0 0 10px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
  cursor: pointer;
  option {
    color: ${THEME.GRAY_FONT};
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  ${FLEX_ROW_CENTER_CENTER}
`;

interface PaginationItemProps {
  isClicked?: boolean;
  isLeft?: boolean;
}

export const PaginationItem = styled.div<PaginationItemProps>`
  height: 30px;
  width: 30px;
  ${FLEX_COLUMN_CENTER_CENTER}
  margin-left: ${(props) => !props.isLeft && '10px'};
  background-color: ${(props) => (props.isClicked ? THEME.MAIN : THEME.BACKGROUND)};
  color: ${(props) => (props.isClicked ? 'white' : 'black')};
  border-radius: 3px;
  font-size: 14px;
  padding-bottom: 1px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s ease;
  :hover {
    background-color: ${(props) => (props.isClicked ? THEME.MAIN : THEME.HEADER_BACKGROUND)};
    box-shadow: ${(props) => props.isClicked && '0 0px 6px 0 rgba(0, 0, 0, 0.25)'};
  }
`;

export const PaginationItemArrow = styled.div<PaginationItemProps>`
  height: 30px;
  width: 30px;
  ${FLEX_COLUMN_CENTER_CENTER}
  border: 1px solid ${THEME.GRAY_LINE};
  border-left: ${(props) => !props.isLeft && 'none'};
  cursor: pointer;
  user-select: none;
`;
