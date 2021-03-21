import styled from 'styled-components';
import { CONTENT_WIDTH } from '../../constant';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-width: ${CONTENT_WIDTH}px;
  margin-top: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
