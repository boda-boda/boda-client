import styled, { css } from 'styled-components';
import { DropDownType } from '../../common/types';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
  FLEX_ROW_START_START,
  THEME,
} from '../../constant';

export const MatchingProposalContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  ${FLEX_COLUMN_START_START};
  padding-top: 40px;
  padding-bottom: 20px;
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.GRAY_LINE};
  ${FLEX_COLUMN_CENTER_START};
`;

export const SectionTitleContainer = styled.div`
  width: 100%;
  ${FLEX_ROW_SPACE_CENTER}
`;

export const SectionTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
`;

export const InfoTable = styled.table`
  width: 100%;
  margin-top: 17px;
  border-top: 2px solid ${THEME.MAIN};
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 21px 12px;
    color: ${THEME.GRAY_FONT};
    font-size: 14px;
    text-align: left;
    vertical-align: text-top;
  }
  th {
    width: 84px;
    background: ${THEME.HEADER_BACKGROUND};
    color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
    font-weight: 500;
  }
  .profile {
    width: 168px;
    vertical-align: middle;
    padding: 0;
  }
  .input {
    padding: 0 12px;
  }
  .select {
    padding: 12px;
  }
`;

export const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  ${FLEX_ROW_CENTER_CENTER};
`;

interface ProfileImageProps {
  src: string;
}

export const ProfileImage = styled.div<ProfileImageProps>`
  width: 118px;
  height: 118px;
  border-radius: 10px;
  background: ${THEME.BACKGROUND};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;
interface InfoInputProps {
  size?: Size;
}

export const InfoInput = styled.input<InfoInputProps>`
  width: ${(props) => (props.size === 'LONG' ? '300px' : '200px')};
  height: 36px;
  padding: 0 0 0 10px;
  margin-right: 10px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
`;

interface DropDownProps {
  size: Size;
}

export const DropDown = styled.select<DropDownProps>`
  width: ${(props) => (props.size === 'LONG' ? '200px' : '120px')};
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

export const TdFlexBox = styled.div`
  ${FLEX_ROW_START_CENTER};
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

interface TimeSeleceContainerProps {
  isLast: boolean;
}

export const TimeSelectContainer = styled.div<TimeSeleceContainerProps>`
  ${FLEX_ROW_SPACE_CENTER};
  padding: 12px;
  border-bottom: ${(props) => (props.isLast ? 'none' : css`1px solid ${THEME.GRAY_LINE}`)};
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
