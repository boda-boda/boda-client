import styled from 'styled-components';
import { CONTENT_WIDTH, FLEX_COLUMN_CENTER_START, THEME } from '../../constant';

export const Footer = styled.div`
  width: 100%;
  height: 198px;
  background: #4e515c;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.GREY_LINE};
  ${FLEX_COLUMN_CENTER_START};
`;

export const Text = styled.div`
  font-size: 14px;
  line-height: 1.71;
  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const FooterBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.GREY_LINE};
  margin: 20px 0;
`;
