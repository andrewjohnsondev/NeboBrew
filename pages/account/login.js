import styled from 'styled-components';
import Login from '../../components/molecules/Login';
const StyledLoginPage = styled.section`
  display: grid;
  place-items: center;
  padding-block: 4rem;
  background-color: hsl(var(--color-primary));
`;

export default function login() {
  return (
    <StyledLoginPage className='bg-pattern'>
      <Login />
    </StyledLoginPage>
  );
}
