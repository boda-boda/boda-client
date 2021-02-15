import styled from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
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
  .personality {
    padding: 0 12px;
  }
  .career {
    width: 50%;
    text-align: center;
    border-right: 1px solid ${THEME.GRAY_LINE};
  }
  th.career {
    padding: 13px 0;
  }
  .right {
    border-right: none;
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
  background-color: ${THEME.TIME_BLOCK_BACKGROUND};
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  text-align: center;
  font-weight: 500;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const MatchingButtonContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 60px;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const MatchingButton = styled.div`
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
`;
