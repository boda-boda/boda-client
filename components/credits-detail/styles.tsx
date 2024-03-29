import styled, { css } from 'styled-components';
import { ButtonSize } from '../../common/types';
import {
  CONTENT_WIDTH_NARROW,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_START,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
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
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const CompleteSection = styled.div`
  position: relative;
  width: 100%;
  ${FLEX_ROW_CENTER_CENTER};
  padding-top: 20px;
  padding-bottom: 60px;
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH_NARROW}px;
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
    padding: 12px 12px;
    color: ${THEME.GRAY_FONT};
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
    table-layout: fixed;
  }
  tr {
    width: 100%;
  }
  th {
    width: 150px;
    background: ${THEME.HEADER_BACKGROUND};
    color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
    font-weight: 500;
  }
  .content {
    width: 40%;
  }
  .credit {
    width: 20%;
    text-align: center;
  }
  .type {
    width: 15%;
    text-align: center;
  }
  .time {
    width: 35%;
  }
`;

interface InfoInputProps {
  Size?: ButtonSize;
}

export const InfoInput = styled.input<InfoInputProps>`
  width: ${(props) => (props.Size === 'LONG' ? '300px' : '150px')};
  height: 36px;
  padding: 0 0 0 10px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
  :focus {
    border: solid 1px ${THEME.MAIN};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
  }
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

export const DropDown = styled.select`
  width: 150px;
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
    margin-left: 18px;
  }
`;
interface ToggleButtonProps {
  isSelected?: boolean;
  isLast?: boolean;
}
export const ToggleButton = styled.div<ToggleButtonProps>`
  padding: 0 13px;
  height: 36px;
  font-size: 14px;
  margin-right: ${(props) => (props.isLast ? '0' : '10px')};
  border-radius: 3px;
  background-color: ${(props) => (props.isSelected ? THEME.MAIN : 'white')};
  border: ${(props) =>
    props.isSelected ? css`1px solid ${THEME.MAIN}` : css`1px solid ${THEME.GRAY_LINE}`};
  color: ${(props) => (props.isSelected ? 'white' : THEME.GRAY_FONT)};
  ${FLEX_ROW_CENTER_CENTER};
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

export const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px 25px;
  ${FLEX_ROW_CENTER_START};
`;

interface ProfileImageProps {
  src?: string | null;
  isHover?: boolean;
}

export const ProfileImage = styled.div<ProfileImageProps>`
  width: 118px;
  height: 118px;
  border-radius: 10px;
  background: ${THEME.HEADER_BACKGROUND};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;
export const ImageIconContainer = styled.div<ProfileImageProps>`
  opacity: ${(props) => (props.isHover ? 0 : 1)};
  transition: 0.2s ease;
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`;

interface TextInputProps {
  withButton?: boolean;
  long?: boolean;
}

export const TextInput = styled.input<TextInputProps>`
  outline: none;
  width: ${(props) => (props.long ? '100%' : '200px')};
  height: 36px;
  border-radius: 3px;
  border: solid 1px ${THEME.GRAY_BORDER};
  padding: 0 10px;
  color: ${THEME.GRAY_FONT};
  cursor: ${(props) => props.withButton && 'pointer'};
  :focus {
    border: solid 1px ${THEME.MAIN};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
  }
`;

export const AddressButton = styled.button`
  outline: none;
  border: 1px solid ${THEME.MAIN};
  width: 80px;
  height: 36px;
  border-radius: 3px;
  color: ${THEME.MAIN};
  margin-left: 10px;
  background: white;
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    color: white;
    background-color: ${THEME.MAIN};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const AddressDeleteButton = styled.button`
  outline: none;
  border: 1px solid ${THEME.RED};
  width: 100px;
  height: 36px;
  border-radius: 3px;
  margin-left: 10px;
  background: white;
  color: ${THEME.RED};
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    color: white;
    background-color: ${THEME.RED};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const TextArea = styled.textarea`
  outline: none;
  width: 100%;
  font-size: 14px;
  height: 100%;
  padding: 10px;
  border-radius: 3px;
  border: solid 1px ${THEME.GRAY_BORDER};
  resize: none;
  overflow-y: hidden;
  color: ${THEME.GRAY_FONT};
  :focus {
    border: solid 1px ${THEME.MAIN};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
  }
`;

export const CenterInfoUpdateButton = styled.div`
  height: 42px;
  padding: 11px 10px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid ${THEME.MAIN};
  color: ${THEME.MAIN};
  ${FLEX_ROW_CENTER_CENTER};
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    color: white;
    background-color: ${THEME.MAIN};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const ClockSelectContainer = styled.div`
  position: relative;
  width: 90px;
  height: 36px;
  ${FLEX_ROW_CENTER_CENTER};
  color: ${THEME.GRAY_FONT};
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  margin-right: 7px;
  margin-left: 15px;
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

export const FinishButton = styled.button`
  outline: none;
  border: none;
  width: 306px;
  height: 48px;
  border-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: ${THEME.MAIN};
  color: white;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  ${FLEX_ROW_CENTER_CENTER};
  transition: 0.2s ease;
  :hover {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
  }
`;

export const CreditPurchaseButton = styled.button`
  padding: 10px 10px;
  height: 40px;
  border-radius: 3px;
  margin-bottom: -10px;
  font-size: 16px;
  outline: none;
  border: 1px solid ${THEME.MAIN};
  background-color: white;
  line-height: 1px;
  color: ${THEME.MAIN};
  ${FLEX_ROW_CENTER_CENTER};
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    background: ${THEME.MAIN};
    color: white;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const DeleteButton = styled.button`
  padding: 11px 10px;
  margin-left: 15px;
  height: 36px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.RED};
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  color: ${THEME.RED};
  ${FLEX_ROW_CENTER_CENTER};
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    background: ${THEME.RED};
    color: white;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const CreditInfoContainer = styled.div`
  margin-top: 20px;
  padding: 14px 40px;
  width: 100%;
  background-color: ${THEME.HEADER_BACKGROUND};
  border-radius: 10px;
  ${FLEX_COLUMN_CENTER_CENTER}
`;

export const CreditInfoRow = styled.div`
  width: 100%;
  margin: 5px 0;
  ${FLEX_ROW_SPACE_CENTER};
`;

export const CreditInfoDiv = styled.div`
  font-size: 18px;
  color: ${THEME.MAIN};
`;

export const CreditSVGWrapper = styled.div`
  padding-top: 1px;
  margin-right: 5px;
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
