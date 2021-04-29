import styled, { css } from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_END_CENTER,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
  THEME,
} from '../../constant';

export const CareGiverEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  padding-bottom: 60px;
  color: ${THEME.GRAY_LINE};
  ${FLEX_COLUMN_START_START};
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  ${FLEX_COLUMN_START_START};
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const SectionTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 24px;
  border-top: 2px solid ${THEME.MAIN};
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 12px;
    color: ${THEME.GRAY_FONT};
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
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
  .available {
    padding: 0;
    border-right: 1px solid ${THEME.GRAY_LINE};
    width: 10%;
    position: relative;
    font-size: 16px;
    cursor: pointer;
  }
  .career {
    width: 25%;
    text-align: center;
    border-right: 1px solid ${THEME.GRAY_LINE};
  }
  .long {
    width: 40%;
  }
  .short {
    width: 10%;
  }
  th.career {
    padding: 13px 0;
  }
  .right {
    border-right: none;
  }
  .memo {
    padding: 12px;
  }
  .infovalue {
    width: 330px;
  }
  .hoverDiv {
    width: 100%;
    height: 100%;
    padding: 12px;
    :hover {
      background-color: ${THEME.HOVER_PURPLE};
    }
  }
`;

export const CheckBox = styled.input`
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
`;

export const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  ${FLEX_ROW_CENTER_CENTER};
`;

interface ProfileImageProps {
  src?: string;
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

export const PersonalityInfoList = styled.div`
  width: 100%;
  height: 60px;
  ${FLEX_ROW_START_CENTER};
`;

export const PersonalityInfoItem = styled.div`
  padding: 0 15px;
  height: 36px;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
  ${FLEX_ROW_CENTER_CENTER};
`;

export const TimeTable = styled.table`
  position: relative;
  width: 100%;
  margin-top: 24px;
  border-top: 2px solid ${THEME.MAIN};
  border-collapse: collapse;
  th,
  td {
    width: 12.5%;
    height: 40px;
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    border-right: 1px solid ${THEME.GRAY_LINE};
    color: ${THEME.GRAY_FONT};
    text-align: center;
  }
  th {
    padding: 23px 12px;
    vertical-align: top;
    font-weight: 500;
    border-bottom: 1px solid ${THEME.MAIN};
  }
  .right {
    border-right: none;
  }
  .saturday {
    color: #68b6f8;
  }
  .sunday {
    color: #f5536c;
  }
`;

interface TimeContainerProps {
  day: number;
  startTime: number;
  endTime: number;
}

export const TimeContainer = styled.div<TimeContainerProps>`
  position: absolute;
  top: calc(40px * (${(props) => props.startTime - 9} + 1));
  width: 12.5%;
  height: calc(40px * (${(props) => props.endTime - props.startTime + 1}));
  left: calc(12.5% * (${(props) => props.day} + 1) + 2px);
  padding: 6px;
`;

export const TimeItem = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${THEME.LOCATION_LINE};
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>'),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" /></svg>')
      ${THEME.LOCATION_LINE};
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  text-align: center;
  font-weight: 500;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const MemoContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 60px;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  ${FLEX_ROW_END_CENTER};
`;

export const EditButton = styled.button`
  margin-top: -7px;
  outline: none;
  border: 1px solid ${THEME.MAIN};
  padding: 10px;
  border-radius: 3px;
  color: ${THEME.MAIN};
  background: white;
  cursor: pointer;
`;

export const StyledLink = styled.a`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
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

export const TextArea = styled.textarea`
  outline: none;
  width: 100%;
  min-height: 84px;
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
    background-color: ${THEME.MAIN};
    color: white;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const AddressDeleteButton = styled.button`
  outline: none;
  border: 1px solid red;
  width: 100px;
  height: 36px;
  border-radius: 3px;
  margin-left: 10px;
  background: white;
  color: red;
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    background-color: ${THEME.RED};
    color: white;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
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
    vertical-align: middle;
  }
  th {
    padding: 23px 12px;
    width: 84px;
    background: ${THEME.HEADER_BACKGROUND};
    vertical-align: top;
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
  width: 36px;
  padding: 0;
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
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const ToggleButtonWorkingState = styled.div<ToggleButtonProps>`
  padding: 0 10px;
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
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
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
  justify-content: flex-end;
`;

interface PlusMinusButtonProps {
  hide?: boolean;
}

export const PlusMinusButton = styled.button<PlusMinusButtonProps>`
  width: 36px;
  height: 36px;
  ${FLEX_ROW_CENTER_CENTER};
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};

  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: ${(props) => (props.hide ? 'normal' : `pointer`)};
  background-color: white;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  :hover {
    border: solid 1px ${THEME.MAIN};
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const FinishButtonContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  ${FLEX_ROW_CENTER_CENTER};
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
  :hover {
    font-weight: bold;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const XGap = styled.div`
  width: 10px;
`;
