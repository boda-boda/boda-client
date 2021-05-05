import styled from 'styled-components';
import {
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_COLUMN_START_START,
  FLEX_ROW_CENTER_CENTER,
  THEME,
} from '../../constant';

export const LoginLayout = styled.div`
  width: 800px;
  height: 100%;

  ${FLEX_ROW_CENTER_CENTER}
  justify-content:space-between;
`;

export const LoginInnerContent = styled.div`
  width: 354px;
  height: 280px;
  ${FLEX_COLUMN_START_START};
`;

export const LoginTitle = styled.div`
  width: 100%;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 40px;
`;

export const LoginSubtitle = styled.div`
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

export const LoginText = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  margin-top: -5px;
  color: ${THEME.GRAY_FONT};
`;

export const ForgotPasswordText = styled.div`
  font-weight: 800;
  font-size: 12px;
  margin-top: 10px;
  color: ${THEME.MAIN};
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    span {
      text-decoration: underline;
    }
  }
  span {
    font-size: 12px;
    font-weight: 500;
    margin-left: 5px;
    color: ${THEME.GRAY_FONT};
  }
`;

export const LoginBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.GRAY_LINE};
  margin: 30px 0;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  background-color: ${THEME.MAIN};
  cursor: pointer;
  :disabled {
    background-color: ${THEME.GRAY_BORDER};
  }
`;

export const SpinnerContainer = styled.div`
  ${FLEX_COLUMN_CENTER_CENTER}
  transform:scale(0.5);
`;

export const LoginSaveLabel = styled.label`
  position: relative;
  top: -1.5px;
  font-size: 14px;
  color: ${THEME.GRAY_FONT};
  margin-left: 5px;
`;

export const StyledLink = styled.a`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
  padding: 15px;
  transition: 0.2s ease;
  :hover {
    font-weight: bold;
  }
`;

export const LogoutButton = styled.div`
  color: ${THEME.GRAY_FONT};
  text-decoration: none;
  padding: 15px;
  cursor: pointer;
  transition: 0.2s ease;
  :hover {
    font-weight: bold;
  }
`;
