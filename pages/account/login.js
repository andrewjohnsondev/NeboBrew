import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Login from '../../components/account/Login';
import { useAuth } from '../../components/context/Auth';
import Head from 'next/head';
const StyledLoginPage = styled.section`
  display: grid;
  place-items: center;
  padding: 4rem 0.5rem;
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
    <>
      <Head>
        <title>Nebo Brew | Login</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledLoginPage className='bg-pattern'>
        <Login />
      </StyledLoginPage>
    </>
  );
}
