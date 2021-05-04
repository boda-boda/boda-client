import styled, { css } from 'styled-components';
import { ButtonSize } from '../../common/types';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_SPACE_CENTER,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_START,
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
  padding-top: 14px;
  padding-bottom: 7px;
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
  margin-top: 5px;
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
    padding: 32px 0;
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

export const LoginModalLayout = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const LoginModal = styled.div`
  position: relative;
  width: 980px;
  margin: 15px 15px 0 0;
  padding: 60px 60px 50px 60px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: ${THEME.WHITE};
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const LoginModalInnerContent = styled.div`
  width: 100%;
  ${FLEX_COLUMN_CENTER_START};
`;

export const LoginModalTitle = styled.div`
  width: 100%;
  font-size: 32px;
  font-weight: 500;
  margin-top: -30px;
  text-align: center;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 10px;
`;

export const LoginModalSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 15px;
  span {
    font-weight: 500;
    font-size: 16px;
    color: ${THEME.MAIN};
  }
`;

export const LoginModalText = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  margin-top: -5px;
  color: ${THEME.GRAY_FONT};
`;

export const LoginModalBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.GRAY_LINE};
  margin: 30px 0;
`;

export const RecipientsList = styled.div`
  width: 100%;
`;

export const CardList = styled.div`
  width: 100%;
  ${FLEX_ROW_CENTER_CENTER}
  justify-content:space-around;
  flex-wrap: wrap;
  margin-top: -6px;
`;

export const Card = styled.div`
  position: relative;
  width: 400px;
  height: 180px;
  padding: 25px;
  border-radius: 10px;
  margin-top: 20px;
  /* margin-bottom: -10px; */
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  ${FLEX_ROW_SPACE_CENTER};
  transition: 0.2s ease;
  :hover {
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
  height: 480px;
  padding: 25px;
  border-radius: 10px;
  margin-top: 30px;
  font-size: 20px;
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const StyledLink = styled.span`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
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

export const InfoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 13px 0px 13px 145px;
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

interface ProfileImageProps {
  src?: string;
}

export const ProfileImageLoad = styled.div<ProfileImageProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${THEME.BACKGROUND};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export const LocationValue = styled.div`
  /* margin-top: -1px; */
  color: ${THEME.GRAY_FONT};
  /* max-height: 60px; */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.4em;
  height: 1.4em;
`;

export const MemoValue = styled.div`
  /* margin-top: -1px; */
  color: ${THEME.GRAY_FONT};
  /* max-height: 60px; */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.4em;
`;
