import Register from '../../components/account/Register';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/context/Auth';
import { useEffect } from 'react';
const StyledRegisterPage = styled.section`
  display: grid;
  place-items: center;
  padding-block: 4rem;
  background-color: hsl(var(--color-primary));
`;

export default function RegisterPage() {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  return (
    <StyledRegisterPage className='bg-pattern'>
      <Register />
    </StyledRegisterPage>
  );
}
