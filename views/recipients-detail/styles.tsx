import styled from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_START,
  FLEX_ROW_SPACE_CENTER,
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
    vertical-align: top;
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
  margin-top: 32px;
  ${FLEX_ROW_CENTER_START};
`;

interface ProfileImageProps {
  src: string;
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
