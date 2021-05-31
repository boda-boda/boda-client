import styled from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_CENTER,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_SPACE_CENTER,
  FLEX_ROW_START_CENTER,
  FLEX_ROW_START_START,
  THEME,
} from '../../constant';

interface SectionProps {
  isBackgroundColored: boolean;
}

export const Section = styled.div<SectionProps>`
  width: 100%;
  min-height: calc(100vh - 84px - 198px - 240px);
  ${FLEX_COLUMN_START_CENTER};
  background: ${(props) => (props.isBackgroundColored ? THEME.BACKGROUND : 'white')};
  position: relative;
  padding: 30px 0;
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

export const RecipientsList = styled.div`
  width: 100%;
`;

export const CardList = styled.div`
  width: 100%;
  ${FLEX_ROW_SPACE_CENTER};
  flex-wrap: wrap;
  margin-top: -6px;
`;

export const Card = styled.div`
  position: relative;
  width: 978px;
  height: 180px;
  padding: 10px 15px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: -10px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  ${FLEX_COLUMN_CENTER_CENTER};
  transition: 0.2s ease;
  flex-wrap: wrap;
  :hover {
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
  }
  cursor: pointer;
`;

export const CardInnerContent = styled.div`
  ${FLEX_ROW_SPACE_CENTER};
  width: 100%;
`;

export const CardSection = styled.div`
  ${FLEX_ROW_CENTER_CENTER}
  width: 48%;
`;

export const CardSectionRight = styled.div`
  ${FLEX_ROW_CENTER_CENTER}
  width: 48%;
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
  margin-right: 10px;
  /* margin-bottom: 30px; */
`;

export const InfoContainer = styled.div`
  width: 80%;
  height: 100%;
  cursor: pointer;
`;
export const InfoContainerRight = styled.div`
  width: 80%;
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
  margin-bottom: 7px;
`;

export const InfoType = styled.div`
  min-width: 70px;
  padding-left: 5px;
  margin-top: -1px;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  font-weight: 500;
`;

export const InfoValue = styled.div`
  margin-top: 1px;
  color: ${THEME.GRAY_FONT};
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 1.2em;
`;

export const MemoValue = styled.div`
  margin-top: 1px;
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

export const MemoValueRight = styled.div`
  margin-top: 1px;
  color: ${THEME.GRAY_FONT};
  /* max-height: 60px; */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 4.5em;
`;

export const CheckBox = styled.input`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
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

export const EditButton = styled.button`
  position: absolute;
  top: 3px;
  right: 0;
  padding: 5px 12px;
  height: 36px;
  border-radius: 3px;
  outline: none;
  border: 1px solid red;
  background-color: white;
  color: red;
  ${FLEX_ROW_CENTER_CENTER};
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    background: red;
    color: white;
    font-weight: bold;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;

interface StatusDivProps {
  isAccepted?: boolean;
}

export const StatusDiv = styled.div<StatusDivProps>`
  border-radius: 3px;
  /* box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
  font-size: 12px;
  position: absolute;
  top: 5px;
  padding: 2px 4px;
  right: 10px;
  cursor: default;
  color: ${(props) => (props.isAccepted ? THEME.MAIN : 'red')};
  /* text-decoration: underline; */
  /* border: ${(props) => (props.isAccepted ? `1px solid blue` : '1px solid red')}; */
`;

export const StatusDivWait = styled.div`
  border-radius: 3px;
  /* box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
  font-size: 12px;
  position: absolute;
  top: 5px;
  padding: 2px 4px;
  right: 10px;
  /* text-decoration: underline; */
  /* border: 1px solid; */
  cursor: default;
`;

export const TransferButton = styled.button`
  position: absolute;
  top: 3px;
  right: 90px;
  padding: 5px 12px;
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
    font-weight: bold;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.25);
  }
`;
