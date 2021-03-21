import styled from 'styled-components';
import { CONTENT_WIDTH } from '../../constant';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-width: ${CONTENT_WIDTH + 100}px;
  min-height: 100vh;
  overflow: scroll;

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
