import styled, { css } from 'styled-components';
import { ButtonSize } from '../../common/types';
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

export const CompleteSection = styled.div`
  position: relative;
  width: 100%;
  ${FLEX_ROW_CENTER_CENTER};
  padding-top: 40px;
  padding-bottom: 60px;
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
  table-layout: fixed;
  th,
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 12px;
    color: ${THEME.GRAY_FONT};
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
    table-layout: fixed;
  }
  th {
    width: 84px;
    background: ${THEME.HEADER_BACKGROUND};
    color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
    font-weight: 500;
  }
  .profile {
    padding: 32px 25px;
    width: 168px;
    vertical-align: middle;
  }
  .recipientProfile {
    width: 168px;
    vertical-align: top;
    padding: 32px 25px 0 25px;
  }
  .left {
    width: 336px;
  }
  .right {
    width: 306px;
  }
  .wide {
    width: 726px;
  }

  .select {
    padding: 12px;
  }
  .overtd {
    padding: 2px 0 12px 12px;
  }
  .overitems {
    margin-top: 10px;
  }
  .money {
    margin-right: 5px;
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
  Size?: ButtonSize;
}

export const InfoInput = styled.input<InfoInputProps>`
  width: ${(props) => (props.Size === 'LONG' ? '300px' : '200px')};
  height: 36px;
  padding: 0 0 0 10px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
`;

interface InfoInputDetailProps {
  Size?: ButtonSize;
}

export const InfoInputDetail = styled.textarea<InfoInputDetailProps>`
  width: ${(props) => (props.Size === 'LONG' ? '870px' : '702px')};
  min-height: ${(props) => (props.Size === 'LONG' ? '84px' : '72px')};
  padding: 10px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
  overflow-y: auto;
`;

interface DropDownProps {
  Size: ButtonSize;
}

export const DropDown = styled.select<DropDownProps>`
  width: ${(props) => (props.Size === 'LONG' ? '200px' : '120px')};
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
  flex-wrap: wrap;
  .square {
    width: 36px;
    padding: 0;
  }
  .clock-right {
    margin-left: 20px;
  }
`;
interface ToggleButtonProps {
  isSelected: boolean;
  isLast?: boolean;
}
export const ToggleButton = styled.div<ToggleButtonProps>`
  padding: 0 15px;
  height: 36px;
  margin-right: ${(props) => (props.isLast ? '0' : '10px')};
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
  ${FLEX_ROW_START_CENTER};
  padding: 12px;
  border-bottom: ${(props) => (props.isLast ? 'none' : css`1px solid ${THEME.GRAY_LINE}`)};
  flex-wrap: wrap;
`;
export const AddButton = styled.div`
  width: 36px;
  height: 36px;
  ${FLEX_ROW_CENTER_CENTER};
  border-radius: 3px;
  margin-left: 12px;
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
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;
