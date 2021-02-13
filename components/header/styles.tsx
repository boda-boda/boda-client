import styled from 'styled-components';
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
  position: fixed;
  top: 0;
  left: 0;
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
  width: 88px;
  height: 45px;
`;

export const LogoImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const MenuList = styled.div`
  ${FLEX_ROW_END_START};
`;

export const MenuItem = styled.div`
  position: relative;
  margin-left: 38px;
  color: white;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  cursor: pointer;
`;

export const MenuModal = styled.div`
  position: absolute;
  width: 100%;
  padding: 15px 0;
  top: 40px;
  right: 0;
  z-index: 20;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #00000022;
  background-color: white;
  color: ${THEME.ACHROMATIC7};
  font-size: 14px;
  ${FLEX_COLUMN_CENTER_CENTER};
`;

export const MenuBar = styled.div`
  width: calc(100% - 20px);
  height: 1px;
  border-bottom: 1px solid ${THEME.ACHROMATIC3};
  margin: 10px 0;
`;

export const LoginModalLayout = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000066;
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
  background-color: ${THEME.ACHROMATIC1};
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
  color: ${THEME.ACHROMATIC8};
  margin-bottom: 40px;
`;

export const LoginModalSubtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: ${THEME.ACHROMATIC8};
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
  color: ${THEME.ACHROMATIC8};
  outline: none;
  border: 1px solid ${THEME.ACHROMATIC3};
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
  color: ${THEME.ACHROMATIC7};
`;

export const LoginModalBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.ACHROMATIC4};
  margin: 40px 0;
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
`;

export const LoginSaveLabel = styled.label`
  position: relative;
  top: -1.5px;
  font-size: 14px;
  color: ${THEME.ACHROMATIC7};
  margin-left: 5px;
`;
