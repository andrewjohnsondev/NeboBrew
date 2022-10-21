import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Login from '../../components/account/Login';
import { useAuth } from '../../components/context/Auth';
const StyledLoginPage = styled.section`
  display: grid;
  place-items: center;
  padding-block: 4rem;
  background-color: hsl(var(--color-primary));
`;

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  return (
    <StyledLoginPage className='bg-pattern'>
      <Login />
    </StyledLoginPage>
  );
}
