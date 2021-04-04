import { DayType } from './common/types/date';
import BusinessArea from './model/business-area';
import CareWorker from './model/care-worker';
import CareWorkerCareer from './model/care-worker-career';
import CareWorkerMeta from './model/care-worker-meta';
import CareWorkerSingleSchedule from './model/care-worker-single-schedule';

export const CONTENT_WIDTH = 978;

export const THEME = {
  MAIN: '#7131b7',
  RED: '#dc3545',
  YELLOW: '#f9d77f',
  TIME_BLOCK_BACKGROUND: '#f8ece4',
  HEADER_BACKGROUND: '#efeaf5',
  WHITE: '#ffffff',
  BACKGROUND: '#f8f8f8',
  LOCATION_LINE: '#e3e3e3',
  GRAY_LINE: '#cbcbcb',
  ICON_BACKGROUND: '#b6b5bf',
  PLACEHOLDER_UNACTIVE: '#868593',
  PLACEHOLDER_ACTIVE_LOCATION_END: '#001d36',
  GRAY_BORDER: '#c4c4c4',
  GRAY_FONT: '#4e515c',
  HOVER_PURPLE: '#f8f5fa',
};

export const FLEX_ROW_CENTER_START = `
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:flex-start;
`;

export const FLEX_ROW_CENTER_CENTER = `
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
`;

export const FLEX_ROW_CENTER_END = `
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:flex-end;
`;

export const FLEX_COLUMN_CENTER_START = `
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;
`;

export const FLEX_COLUMN_CENTER_CENTER = `
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

export const FLEX_COLUMN_CENTER_END = `
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-end;
`;

export const FLEX_ROW_START_CENTER = `
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
`;

export const FLEX_ROW_START_START = `
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:flex-start;
`;

export const FLEX_ROW_START_END = `
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:flex-end;
`;

export const FLEX_ROW_END_START = `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const FLEX_ROW_END_CENTER = `
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items:center;
`;

export const FLEX_ROW_END_END = `
  display:flex;
  flex-direction:row;
  justify-content:flex-end;
  align-items:flex-end;
`;

export const FLEX_ROW_SPACE_CENTER = `
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`;

export const FLEX_COLUMN_START_CENTER = `
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
`;

export const FLEX_COLUMN_START_START = `
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:flex-start;
`;

export const FLEX_COLUMN_SPACE_CENTER = `
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
`;

export const DAY_LIST = ['월', '화', '수', '목', '금', '토', '일'] as DayType[];

export const KOREAN_CONSONANT_LIST = [
  'ㄱ',
  'ㄴ',
  'ㄷ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅅ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

export const KOREAN_ASCII_LIST = [
  ['가', '깋'],
  ['나', '닣'],
  ['다', '딯'],
  ['라', '맇'],
  ['마', '밓'],
  ['바', '빟'],
  ['사', '싷'],
  ['아', '잏'],
  ['자', '짛'],
  ['차', '칳'],
  ['카', '킿'],
  ['타', '팋'],
  ['파', '핗'],
  ['하', '힣'],
];

export const CARE_INFO_LIST = [
  '석션',
  '피딩',
  '휠체어',
  '기저귀',
  '재활',
  '가사',
  '남성',
  '치매',
  '입주',
  '간호조무사',
];

export const RELIGION_LIST = ['기독교', '불교', '천주교', '기타', '무교'];

export const PERSONALITY_INFO_LIST = ['조용함', '활발함', '긍정적임', '섬세함', '성실함'];

export const SEOUL_GU_DONG = [{"gu":"강남구","dongs":["개포동","논현동","대치동","도곡동","삼성동","세곡동","수서동","신사동","압구정동","역삼동","율현동","일원동","자곡동","청담동"]},{"gu":"강동구","dongs":["강일동","고덕동","길동","둔촌동","명일동","상일동","성내동","암사동","천호동"]},{"gu":"강북구","dongs":["미아동","번동","수유동","우이동"]},{"gu":"강서구","dongs":["가양동","개화동","공항동","과해동","내발산동","등촌동","마곡동","방화동","염창동","오곡동","오쇠동","외발산동","화곡동"]},{"gu":"관악구","dongs":["남현동","봉천동","신림동"]},{"gu":"광진구","dongs":["광장동","구의동","군자동","능동","자양동","중곡동","화양동"]},{"gu":"구로구","dongs":["가리봉동","개봉동","고척동","구로동","궁동","신도림동","오류동","온수동","천왕동","항동"]},{"gu":"금천구","dongs":["가산동","독산동","시흥동"]},{"gu":"노원구","dongs":["공릉동","상계동","월계동","중계동","하계동"]},{"gu":"도봉구","dongs":["도봉동","방학동","쌍문동","창동"]},{"gu":"동대문구","dongs":["답십리동","신설동","용두동","이문동","장안동","전농동","제기동","청량리동","회기동","휘경동"]},{"gu":"동작구","dongs":["노량진동","대방동","동작동","본동","사당동","상도1동","상도동","신대방동","흑석동"]},{"gu":"마포구","dongs":["공덕동","구수동","노고산동","당인동","대흥동","도화동","동교동","마포동","망원동","상수동","상암동","서교동","성산동","신공덕동","신수동","신정동","아현동","연남동","염리동","용강동","중동","창전동","토정동","하중동","합정동","현석동"]},{"gu":"서대문구","dongs":["남가좌동","냉천동","대신동","대현동","미근동","봉원동","북가좌동","북아현동","신촌동","연희동","영천동","옥천동","창천동","천연동","충정로2가","충정로3가","합동","현저동","홍은동","홍제동"]},{"gu":"서초구","dongs":["내곡동","반포동","방배동","서초동","신원동","양재동","염곡동","우면동","원지동","잠원동"]},{"gu":"성동구","dongs":["금호동1가","금호동2가","금호동3가","금호동4가","도선동","마장동","사근동","상왕십리동","성수동1가","성수동2가","송정동","옥수동","용답동","응봉동","하왕십리동","행당동","홍익동"]},{"gu":"성북구","dongs":["길음동","돈암동","동선동1가","동선동2가","동선동3가","동선동4가","동선동5가","동소문동1가","동소문동2가","동소문동3가","동소문동4가","동소문동5가","동소문동6가","동소문동7가","보문동1가","보문동2가","보문동3가","보문동4가","보문동5가","보문동6가","보문동7가","삼선동1가","삼선동2가","삼선동3가","삼선동4가","삼선동5가","상월곡동","석관동","성북동","성북동1가","안암동1가","안암동2가","안암동3가","안암동4가","안암동5가","장위동","정릉동","종암동","하월곡동"]},{"gu":"송파구","dongs":["가락동","거여동","마천동","문정동","방이동","삼전동","석촌동","송파동","신천동","오금동","잠실동","장지동","풍납동"]},{"gu":"양천구","dongs":["목동","신월동","신정동"]},{"gu":"영등포구","dongs":["당산동","당산동1가","당산동2가","당산동3가","당산동4가","당산동5가","당산동6가","대림동","도림동","문래동1가","문래동2가","문래동3가","문래동4가","문래동5가","문래동6가","신길동","양평동","양평동1가","양평동2가","양평동3가","양평동4가","양평동5가","양평동6가","양화동","여의도동","영등포동","영등포동1가","영등포동2가","영등포동3가","영등포동4가","영등포동5가","영등포동6가","영등포동7가","영등포동8가"]},{"gu":"용산구","dongs":["갈월동","남영동","도원동","동빙고동","동자동","문배동","보광동","산천동","서계동","서빙고동","신계동","신창동","용문동","용산동1가","용산동2가","용산동3가","용산동4가","용산동5가","용산동6가","원효로1가","원효로2가","원효로3가","원효로4가","이촌동","이태원동","주성동","청암동","청파동1가","청파동2가","청파동3가","한강로1가","한강로2가","한강로3가","한남동","효창동","후암동"]},{"gu":"은평구","dongs":["갈현동","구산동","녹번동","대조동","불광동","수색동","신사동","역촌동","응암동","증산동","진관동"]},{"gu":"종로구","dongs":["가회동","견지동","경운동","계동","공평동","관수동","관철동","관훈동","교남동","교북동","구기동","궁정동","권농동","낙원동","내수동","내자동","누상동","누하동","당주동","도렴동","돈의동","동숭동","명륜1가","명륜2가","명륜3가","명륜4가","묘동","무악동","봉익동","부암동","사간동","사직동","삼청동","서린동","세종로","소격동","송월동","송현동","수송동","숭인동","신교동","신문로1가","신문로2가","신영동","안국동","연건동","연지동","예지동","옥인동","와룡동","운니동","원남동","원서동","이화동","익선동","인사동","인의동","장사동","재동","적선동","종로1가","종로2가","종로3가","종로4가","종로5가","종로6가","중학동","창성동","창신동","청운동","청진동","체부동","충신동","통의동","통인동","팔판동","평동","평창동","필운동","행촌동","혜화동","홍지동","홍파동","화동","효자동","효제동","훈정동"]},{"gu":"중구","dongs":["광희동1가","광희동2가","남대문로1가","남대문로2가","남대문로3가","남대문로4가","남대문로5가","남산동1가","남산동2가","남산동3가","남창동","남학동","다동","만리동1가","만리동2가","명동1가","명동2가","무교동","무학동","묵정동","방산동","봉래동1가","봉래동2가","북창동","산림동","삼각동","서소문동","소공동","수표동","수하동","순화동","신당동","쌍림동","예관동","예장동","오장동","을지로1가","을지로2가","을지로3가","을지로4가","을지로5가","을지로6가","을지로7가","의주로1가","의주로2가","인현동1가","인현동2가","입정동","장교동","장충동1가","장충동2가","저동1가","저동2가","정동","주교동","주자동","중림동","초동","충무로1가","충무로2가","충무로3가","충무로4가","충무로5가","충정로1가","태평로1가","태평로2가","필동1가","필동2가","필동3가","황학동","회현동1가","회현동2가","회현동3가","흥인동"]},{"gu":"중랑구","dongs":["망우동","면목동","묵동","상봉동","신내동","중화동"]}] // prettier-ignore

export const WORKER_MAN_SMALL_IMAGE_URL =
  'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/69f6a18e-2548-4062-a383-8ba14c2dc6d8_worker-man-small.png';

export const WORKER_WOMAN_SMALL_IMAGE_URL =
  'https://dolbom.s3.ap-northeast-2.amazonaws.com/newFiles/cf10aa1f-db9a-4061-964b-0887bddcbde6_worker-woman-small.png';

export const LOCALSTORAGE_KEY = {
  MY_CARE_WORKER_SEARCH_PARAMS: 'MY_CARE_WORKER_SEARCH_PARAMS',
};

export const CAPABILITY = 'Capability';
export const RELIGION = 'Religion';

export const dummyCareWorkers = [
  {
    zipCode: '08101',
    address: '서울시 양천구 목동남로 4길 81',
    detailAddress: '105동 101호',
    age: 52,
    birthDay: '19700121',
    careWorkerAreas: [] as BusinessArea[],
    careWorkerCareers: [] as CareWorkerCareer[],
    careWorkerMetas: [
      { type: 'Capability', key: '석션', value: '' },
      { type: 'Capability', key: '피딩', value: '' },
      { type: 'Capability', key: '휠체어', value: '' },
      { type: 'Capability', key: '기저귀', value: '' },
      { type: 'Capability', key: '치매', value: '' },
      { type: 'Capability', key: '입주', value: '' },
    ] as CareWorkerMeta[],
    careWorkerSchedules: [] as CareWorkerSingleSchedule[],
    description: 'ㅁㄴㅇㄹ',
    gender: '여',
    id: 'ㅁㄴㅇㄹ',
    name: '박명순',
    phoneNumber: '010-1234-1234',
    profile:
      'https://user-images.githubusercontent.com/52532871/113158115-757f3800-9276-11eb-998b-52be47e42dda.jpeg',
  },
  {
    zipCode: '08101',
    address: '서울시 양천구 목동남로 4길 81',
    detailAddress: '105동 101호',
    age: 52,
    birthDay: '19700121',
    careWorkerAreas: [] as BusinessArea[],
    careWorkerCareers: [] as CareWorkerCareer[],
    careWorkerMetas: [
      { type: 'Capability', key: '석션', value: '' },
      { type: 'Capability', key: '피딩', value: '' },
      { type: 'Capability', key: '휠체어', value: '' },
      { type: 'Capability', key: '재활', value: '' },
      { type: 'Capability', key: '가사', value: '' },
      { type: 'Capability', key: '입주', value: '' },
    ] as CareWorkerMeta[],
    careWorkerSchedules: [] as CareWorkerSingleSchedule[],
    description: 'ㅁㄴㅇㄹ',
    gender: '여',
    id: 'ㅁㄴㅇㄹ',
    name: '정형미',
    phoneNumber: '010-1234-1234',
    profile:
      'https://user-images.githubusercontent.com/52532871/113158118-7748fb80-9276-11eb-9ae7-d204c7fea22c.jpeg',
  },
  {
    zipCode: '08101',
    address: '서울시 양천구 목동남로 4길 81',
    detailAddress: '105동 101호',
    age: 52,
    birthDay: '19700121',
    careWorkerAreas: [] as BusinessArea[],
    careWorkerCareers: [] as CareWorkerCareer[],
    careWorkerMetas: [
      { type: 'Capability', key: '석션', value: '' },
      { type: 'Capability', key: '휠체어', value: '' },
      { type: 'Capability', key: '재활', value: '' },
      { type: 'Capability', key: '가사', value: '' },
      { type: 'Capability', key: '입주', value: '' },
    ] as CareWorkerMeta[],
    careWorkerSchedules: [] as CareWorkerSingleSchedule[],
    description: 'ㅁㄴㅇㄹ',
    gender: '여',
    id: 'ㅁㄴㅇㄹ',
    name: '유재숙',
    phoneNumber: '010-1234-1234',
    profile:
      'https://user-images.githubusercontent.com/52532871/113158119-7748fb80-9276-11eb-9b1d-f7faebed9745.jpeg',
  },
  {
    zipCode: '08101',
    address: '서울시 양천구 목동남로 4길 81',
    detailAddress: '105동 101호',
    age: 52,
    birthDay: '19700121',
    careWorkerAreas: [] as BusinessArea[],
    careWorkerCareers: [] as CareWorkerCareer[],
    careWorkerMetas: [
      { type: 'Capability', key: '석션', value: '' },
      { type: 'Capability', key: '피딩', value: '' },
      { type: 'Capability', key: '휠체어', value: '' },
      { type: 'Capability', key: '재활', value: '' },
      { type: 'Capability', key: '가사', value: '' },
    ] as CareWorkerMeta[],
    careWorkerSchedules: [] as CareWorkerSingleSchedule[],
    description: 'ㅁㄴㅇㄹ',
    gender: '여',
    id: 'ㅁㄴㅇㄹ',
    name: '정준희',
    phoneNumber: '010-1234-1234',
    profile:
      'https://user-images.githubusercontent.com/52532871/113158120-77e19200-9276-11eb-9c5c-a7c6c3e5b905.jpeg',
  },
  {
    zipCode: '08101',
    address: '서울시 양천구 목동남로 4길 81',
    detailAddress: '105동 101호',
    age: 52,
    birthDay: '19700121',
    careWorkerAreas: [] as BusinessArea[],
    careWorkerCareers: [] as CareWorkerCareer[],
    careWorkerMetas: [
      { type: 'Capability', key: '석션', value: '' },
      { type: 'Capability', key: '휠체어', value: '' },
      { type: 'Capability', key: '재활', value: '' },
      { type: 'Capability', key: '가사', value: '' },
      { type: 'Capability', key: '입주', value: '' },
    ] as CareWorkerMeta[],
    careWorkerSchedules: [] as CareWorkerSingleSchedule[],
    description: 'ㅁㄴㅇㄹ',
    gender: '여',
    id: 'ㅁㄴㅇㄹ',
    name: '유재숙',
    phoneNumber: '010-1234-1234',
    profile:
      'https://user-images.githubusercontent.com/52532871/113158119-7748fb80-9276-11eb-9b1d-f7faebed9745.jpeg',
  },
  {
    zipCode: '08101',
    address: '서울시 양천구 목동남로 4길 81',
    detailAddress: '105동 101호',
    age: 52,
    birthDay: '19700121',
    careWorkerAreas: [] as BusinessArea[],
    careWorkerCareers: [] as CareWorkerCareer[],
    careWorkerMetas: [
      { type: 'Capability', key: '석션', value: '' },
      { type: 'Capability', key: '피딩', value: '' },
      { type: 'Capability', key: '휠체어', value: '' },
      { type: 'Capability', key: '재활', value: '' },
      { type: 'Capability', key: '가사', value: '' },
    ] as CareWorkerMeta[],
    careWorkerSchedules: [] as CareWorkerSingleSchedule[],
    description: 'ㅁㄴㅇㄹ',
    gender: '여',
    id: 'ㅁㄴㅇㄹ',
    name: '정준희',
    phoneNumber: '010-1234-1234',
    profile:
      'https://user-images.githubusercontent.com/52532871/113158120-77e19200-9276-11eb-9c5c-a7c6c3e5b905.jpeg',
  },
] as CareWorker[];
export const PAGINATION_LENGTH = 5;
