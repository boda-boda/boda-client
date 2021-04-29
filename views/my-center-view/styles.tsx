import styled from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_CENTER,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_START,
  THEME,
} from '../../constant';

export const MyCenterPage = styled.div`
  width: 100%;
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
  .infovalue {
    width: 336px;
  }
`;

export const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 25px;
  ${FLEX_ROW_CENTER_START};
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

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.GRAY_LINE};
  ${FLEX_COLUMN_CENTER_START};
`;

interface ImageProps {
  src: string;
}

export const CenterImageContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;
  height: 640px;
  ${FLEX_ROW_CENTER_CENTER};
  font-size: 24px;
`;

export const CenterImage = styled.div<ImageProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transition: 0.2s ease;
`;
export const ButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${FLEX_ROW_CENTER_CENTER};
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const ButtonDiv = styled.div`
  width: 50px;
  height: 50px;
  opacity: 0.25;
  background-color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  cursor: pointer;
`;

export const EditButton = styled.div`
  position: absolute;
  top: 33px;
  right: 0;
  padding: 11px 10px;
  height: 36px;
  border-radius: 3px;
  border: 1px solid ${THEME.MAIN};
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

export const PasswordEditButton = styled.div`
  position: absolute;
  top: 33px;
  right: 110px;
  padding: 11px 10px;
  height: 36px;
  border-radius: 3px;
  border: 1px solid ${THEME.MAIN};
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

export const PasswordModalLayout = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const PasswordModal = styled.div`
  position: relative;
  width: 600px;
  height: 500px;
  margin: 15px 0 0;
  padding: 60px 192px 70px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: ${THEME.WHITE};
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const ResetPassword = styled.div`
  width: 25rem;
  padding: 8rem 0;
  ${FLEX_COLUMN_START_CENTER};
`;

export const StringInput = styled.input`
  width: 100%;
  height: 46px;
  margin: 0 0 16px;
  padding: 10px;
  border-radius: 3px;
  font-size: 14px;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  outline: none;
  border: 1px solid ${THEME.LOCATION_LINE};
  transition: 0.2s ease;
  margin-bottom: 16px 0;
  :focus {
    border: 1px solid ${THEME.MAIN};
  }
`;

export const Title = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 10px;
`;

export const Text = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 40px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  background-color: ${THEME.MAIN};
  margin-top: 20px;
  cursor: pointer;
`;
