import styled from 'styled-components';
import { FLEX_ROW_CENTER_CENTER, THEME } from '../../constant';

export const MetaInfoContainer = styled.div`
  background-color: white;
  font-size: 11px;
  color: ${THEME.FONT_COLOR_GREY};
  border: solid 1px ${THEME.BORDER_GREY};
  padding: 4px 5px;
  border-radius: 3px;
  line-height: 6.45;
  ${FLEX_ROW_CENTER_CENTER};
`;
