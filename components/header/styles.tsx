import styled from 'styled-components';
import { fadeIn, fadeOut } from '../../common/animation/index';

import {
  THEME,
  FLEX_COLUMN_CENTER_CENTER,
  FLEX_ROW_END_START,
  FLEX_COLUMN_CENTER_START,
  CONTENT_WIDTH,
} from '../../constant';

export const Header = styled.div`
  width: 100%;
  height: 84px;
  background: #7131b7;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  width: 100px;
  height: 45px;
`;

export const LogoImg = styled.img`
  width: auto;
  height: 100%;
`;

export const MenuList = styled.div`
  ${FLEX_ROW_END_START};
`;

interface MenuItemProps {
  isNarrow?: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  width: ${(props) => (props.isNarrow ? '130px' : 'auto')};
  position: relative;
  margin-left: 38px;
  height: 50px;
  color: white;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  cursor: pointer;
  transition: 0.2s ease;
  font-weight: 400;
  :hover {
    font-weight: 500;
    /* font-size: 17px;
    margin-left: 32px; */
  }
`;

interface MenuModalProps {
  isMenuModalOn?: boolean;
}

export const MenuModal = styled.div<MenuModalProps>`
  position: absolute;
  width: 100%;
  top: 50px;
  right: 0;
  z-index: 20;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  color: ${THEME.GRAY_FONT};
  font-size: 14px;
  cursor: default;
  ${FLEX_COLUMN_CENTER_CENTER};
  visibility: ${(props) => (props.isMenuModalOn ? 'visible' : 'hidden')};
  animation: ${(props) => (props.isMenuModalOn ? fadeIn : fadeOut)} 0.2s linear;
  transition: visibility 0.2s linear;
`;

export const MenuBar = styled.div`
  width: calc(100% - 20px);
  height: 1px;
  border-bottom: 1px solid ${THEME.LOCATION_LINE};
  margin: -5px 0;
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
  width: 738px;
  height: 705px;
  margin: 15px 0 0;
  padding: 60px 192px 70px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: ${THEME.WHITE};
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const LoginModalInnerContent = styled.div`
  width: 354px;
  ${FLEX_COLUMN_CENTER_START};
`;

export const LoginModalTitle = styled.div`
  width: 100%;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  color: ${THEME.PLACEHOLDER_ACTIVE_LOCATION_END};
  margin-bottom: 40px;
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

export const LoginModalText = styled.div`
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

export const LoginModalBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.GRAY_LINE};
  margin: 30px 0;
`;

export const LoginModalButton = styled.button`
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
