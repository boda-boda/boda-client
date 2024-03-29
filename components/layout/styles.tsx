import styled from 'styled-components';
import { CONTENT_WIDTH, FLEX_COLUMN_CENTER_CENTER, THEME } from '../../constant';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-width: ${CONTENT_WIDTH + 100}px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-width: ${CONTENT_WIDTH}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopButton = styled.button`
  position: fixed;
  right: 70px;
  bottom: 50px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  outline: none;
  border: none;
  background: ${THEME.MAIN};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding-top: 5px;
  cursor: pointer;
`;

export const AttemptingLogin = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  ${FLEX_COLUMN_CENTER_CENTER};
`;
