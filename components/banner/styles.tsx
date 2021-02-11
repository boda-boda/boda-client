import styled from 'styled-components';
import { THEME } from '../../constant';

export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 404px;
  background: ${THEME.LIGHTPURPLE};
`;

export const InnerContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContent = styled.div`
  width: 978px;
  height: 100%;
`;
