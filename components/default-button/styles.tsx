import styled from 'styled-components';
import { FLEX_ROW_CENTER_CENTER, THEME } from '../../constant';

type ButtonSize = 'Large' | 'Small';

interface DefaultButtonProps {
  active?: boolean;
  size: ButtonSize;
}

export const DefaultButton = styled.div<DefaultButtonProps>`
  background-color: ${(props) => (props.active ? THEME.MAIN : THEME.WHITE)};
  color: ${(props) => (props.active ? THEME.WHITE : THEME.GRAY_FONT)};
  border: ${(props) =>
    props.active ? `solid 1px ${THEME.MAIN}` : `solid 1px ${THEME.GRAY_BORDER}`};
  border-radius: 3px;
  font-size: ${(props) => (props.size == 'Large' ? '16px' : '14px')};
  padding: ${(props) => (props.size == 'Large' ? '16px 59px' : '11px 15px')};
  ${FLEX_ROW_CENTER_CENTER}
  cursor: pointer;
`;
