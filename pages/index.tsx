import styled from 'styled-components';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

export default function Home() {
  return (
    <div>
      <Title>My Page</Title>
    </div>
  );
}
