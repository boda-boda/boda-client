import styled from 'styled-components';
import Main from '../views/main';
import MyCenterPage from '../views/my-center-page';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Home() {
  return <MyCenterPage />;
}
