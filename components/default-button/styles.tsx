import styled from 'styled-components';
import { ButtonType } from '../../common/types';
import { FLEX_ROW_CENTER_CENTER, THEME } from '../../constant';

interface DefaultButtonProps {
  active?: boolean;
  type: ButtonType;
  width?: string;
  height?: string;
}

export const DefaultButton = styled.div<DefaultButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => (props.active ? THEME.MAIN : THEME.WHITE)};
  color: ${(props) =>
    props.type == 'SELECTION'
      ? props.active
        ? THEME.WHITE
        : THEME.GRAY_FONT
      : props.type == 'COMPLETE'
      ? THEME.WHITE
      : THEME.MAIN};
  border: ${(props) =>
    props.type == 'SELECTION'
      ? props.active
        ? `solid 1px ${THEME.MAIN}`
        : `solid 1px ${THEME.GRAY_BORDER}`
      : `solid 1px ${THEME.MAIN}`};
  border-radius: 3px;
  font-size: ${(props) => (props.type == 'COMPLETE' ? '16px' : '14px')};
  ${FLEX_ROW_CENTER_CENTER}
  cursor: pointer;
`;
