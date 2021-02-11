import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {font-family: 'Noto Sans KR'; font-style: normal; font-weight: 100; src: url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2") format('woff2'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff") format('woff'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf") format('opentype'); }
  @font-face {font-family: 'Noto Sans KR'; font-style: normal; font-weight: 300; src: url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2") format('woff2'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff") format('woff'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf") format('opentype'); }
  @font-face {font-family: 'Noto Sans KR'; font-style: normal; font-weight: 400; src: url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2") format('woff2'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff") format('woff'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf") format('opentype'); }
  @font-face {font-family: 'Noto Sans KR'; font-style: normal; font-weight: 500; src: url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2") format('woff2'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff") format('woff'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf") format('opentype'); }
  @font-face {font-family: 'Noto Sans KR'; font-style: normal; font-weight: 700; src: url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2") format('woff2'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff") format('woff'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf") format('opentype'); }
  @font-face {font-family: 'Noto Sans KR'; font-style: normal;  font-weight: 900;  src: url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2") format('woff2'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff") format('woff'),url("https://fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf") format('opentype');  }
  body {
    font-family: 'Noto Sans KR', sans-serif; 
    font-size: 10px;
    font-weight: 400;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    user-select:none;
  }
`;

export default GlobalStyle;