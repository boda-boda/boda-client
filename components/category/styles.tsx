import styled from 'styled-components';
import { CONTENT_WIDTH, FLEX_ROW_START_CENTER, THEME } from '../../constant';

export const Category = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${THEME.ACHROMATIC3};
`;

export const InnerContent = styled.div`
  width: ${CONTENT_WIDTH}px;
  height: 100%;
  color: ${THEME.ACHROMATIC4};
  ${FLEX_ROW_START_CENTER};
`;

interface TextProps {
  isBold: boolean;
}

export const Text = styled.div<TextProps>`
  font-size: 12px;
  font-weight: ${(props) => (props.isBold ? 500 : 400)};
  color: ${(props) => (props.isBold ? THEME.ACHROMATIC8 : THEME.ACHROMATIC7)};
  margin-right: 5px;
`;

export const TextContainer = styled.div`
  ${FLEX_ROW_START_CENTER};
`;
