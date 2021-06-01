import styled from 'styled-components';
import {
  CONTENT_WIDTH,
  FLEX_COLUMN_CENTER_START,
  FLEX_ROW_CENTER_CENTER,
  FLEX_ROW_SPACE_CENTER,
  THEME,
} from '../../constant';

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
  color: ${THEME.GRAY_LINE};
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

export const BottomContainer = styled.div`
  width: 100%;
  ${FLEX_ROW_SPACE_CENTER};
`;

export const PolicyContiner = styled.div`
  ${FLEX_ROW_CENTER_CENTER}
`;

export const PolicyText = styled.div`
  font-size: 14px;
  line-height: 1.71;
  margin-left: 20px;
  cursor: pointer;
  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const FooterBar = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${THEME.GRAY_LINE};
  margin: 20px 0;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${THEME.GRAY_LINE};
`;
