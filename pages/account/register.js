import Register from '../../components/account/Register';
import styled from 'styled-components';
const StyledRegisterPage = styled.section`
  display: grid;
  place-items: center;
  padding-block: 4rem;
  background-color: hsl(var(--color-primary));
`;

export default function register() {
  return (
    <StyledRegisterPage className='bg-pattern'>
      <Register />
    </StyledRegisterPage>
  );
}
