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

export const BackgroundImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('https://user-images.githubusercontent.com/52532871/107688589-28a5c900-6ceb-11eb-815a-5b522e2d128f.png');
  background-repeat: no-repeat;
  background-position: center;
`;
