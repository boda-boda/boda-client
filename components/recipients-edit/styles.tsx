import styled, { css } from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_START,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
  THEME,
} from '../../constant';

export const RecipientEdit = styled.div`
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
  padding-top: 40px;
  padding-bottom: 20px;
`;

export const SectionTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  /* ${FLEX_ROW_SPACE_CENTER}
  width : 100%; */

  span {
    color: ${THEME.PLACEHOLDER_UNACTIVE};
    font-size: 14px;
    margin-left: 0.5rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 10px;
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
    vertical-align: top;
    padding: 0;
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
  .personality {
    padding: 0;
  }
`;

export const InnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 12px;
    color: ${THEME.GRAY_FONT};
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
  }
  .available {
    padding: 0;
    border-right: 1px solid ${THEME.GRAY_LINE};
    width: 10%;
    position: relative;
    font-size: 16px;
    cursor: pointer;
  }
  .right {
    border-right: none;
  }
  .bottom {
    border-bottom: none;
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

export const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 32px;
  ${FLEX_ROW_CENTER_START};
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

export const AvailabilityInfoList = styled.div`
  width: 100%;
  ${FLEX_ROW_START_CENTER};
`;

export const AvailabilityInfoItem = styled.div`
  padding: 0 15px;
  height: 36px;
  margin-right: 10px;
  border-radius: 3px;
  border: 1px solid ${THEME.GRAY_LINE};
  color: ${THEME.GRAY_FONT};
  ${FLEX_ROW_CENTER_CENTER};
`;

export const EditButton = styled.button`
  position: absolute;
  top: 33px;
  right: 0;
  padding: 11px 10px;
  height: 36px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.MAIN};
  background-color: white;
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
  position: absolute;
  top: 33px;
  right: 110px;
  padding: 11px 10px;
  height: 36px;
  border-radius: 3px;
  outline: none;
  border: 1px solid ${THEME.RED};
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

export const StyledLink = styled.span`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
`;

/**/

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

export const CheckBox = styled.input`
  position: absolute;
  right: 10px;
  width: 16px;
  height: 16px;
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
    background-color: ${THEME.RED};
    color: white;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const TdFlexBox = styled.div`
  ${FLEX_ROW_START_CENTER};
`;

export const DropDown = styled.select`
  width: 200px;
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
  isLast?: boolean;
}
export const ToggleButton = styled.div<ToggleButtonProps>`
  padding: 0 12px;
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
  cursor: pointer;
  transition: 0.2s ease;
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
interface TimeSeleceContainerProps {
  isLast: boolean;
}

export const TimeSelectContainer = styled.div<TimeSeleceContainerProps>`
  ${FLEX_ROW_START_CENTER};
  padding: 12px;
  border-bottom: ${(props) => (props.isLast ? 'none' : css`1px solid ${THEME.GRAY_LINE}`)};
  flex-wrap: wrap;
`;
