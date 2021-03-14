import styled, { css } from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_START,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_CENTER_END,
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
    padding: 12px;
    color: ${THEME.GRAY_FONT};
    font-size: 14px;
    text-align: left;
    vertical-align: middle;
  }
  th {
    padding: 23px 12px;
    vertical-align: top;
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
    width: 330px;
  }
`;

export const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 25px;
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

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.GRAY_LINE};
  ${FLEX_COLUMN_CENTER_START};
  padding-bottom: 60px;
`;

interface ImageProps {
  src: string;
}

interface TextInputProps {
  withButton?: boolean;
  long?: boolean;
}

export const TextInput = styled.input<TextInputProps>`
  outline: none;
  width: ${(props) => (props.withButton ? css`calc(100% - 90px)` : props.long ? '100%' : '200px')};
  height: 36px;
  border-radius: 3px;
  border: solid 1px ${THEME.GRAY_BORDER};
  padding: 0 10px;
  color: ${THEME.GRAY_FONT};
  cursor: ${(props) => props.withButton && 'pointer'};
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
`;

export const CenterImageContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;
  height: 640px;
`;

export const CenterImage = styled.div<ImageProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center;
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
`;

export const EditButton2 = styled(EditButton)`
  color: red;
  border-color: red;
  right: 100px;
`;

export const FinishButtonContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  ${FLEX_ROW_CENTER_CENTER};
`;

export const FinishButton = styled.div`
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
