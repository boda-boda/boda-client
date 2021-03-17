import styled from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_END_CENTER,
  FLEX_ROW_START_CENTER,
  THEME,
} from '../../constant';

export const CareGiverDetail = styled.div`
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
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 24px;
  border-top: 2px solid ${THEME.MAIN};
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid ${THEME.GRAY_LINE};
    padding: 20px 12px;
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
  .personality {
    padding: 0 12px;
  }
  .career {
    width: 25%;
    text-align: center;
    border-right: 1px solid ${THEME.GRAY_LINE};
  }
  .long {
    width: 50%;
  }
  th.career {
    padding: 13px 0;
  }
  .area {
    width: 33.3333%;
    text-align: center;
    border-right: 1px solid ${THEME.GRAY_LINE};
  }
  .right {
    border-right: none;
  }
  .memo {
    padding: 24px 12px;
  }
  .infovalue {
    width: 330px;
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

export const AvailabilityInfoList = styled.div`
  width: 100%;
  height: 60px;
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
  height: calc(40px * (${(props) => props.endTime - props.startTime}));
  left: calc(12.5% * (${(props) => props.day} + 1) + 2px);
  padding: 0 6px;
`;

export const TimeItem = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="100%" x2="100%" y2="0" stroke="gray" /></svg>'),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" /></svg>')
      ${THEME.LOCATION_LINE};
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  text-align: center;
  font-weight: 500;
  border: 1px solid gray;
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
  position: absolute;
  top: 33px;
  right: 0;
  padding: 11px 10px;
  height: 36px;
  border-radius: 3px;
  border: 1px solid ${THEME.MAIN};
  background-color: white;
  color: ${THEME.MAIN};
  ${FLEX_ROW_CENTER_CENTER};
  cursor: pointer;
`;

export const StyledLink = styled.span`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
`;
