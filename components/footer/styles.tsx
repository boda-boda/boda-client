import styled from 'styled-components';
import { FLEX_COLUMN_CENTER_START, THEME } from '../../constant';

export const Footer = styled.div`
  width: 100%;
  height: 198px;
  background: #4e515c;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContent = styled.div`
  width: 978px;
  height: 100%;
  color: ${THEME.ACHROMATIC4};
  ${FLEX_COLUMN_CENTER_START};
`;

export const Text = styled.div`
  font-size: 1.4rem;
  line-height: 1.71;
  span {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

export const FooterBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.ACHROMATIC4};
  margin: 20px 0;
`;
