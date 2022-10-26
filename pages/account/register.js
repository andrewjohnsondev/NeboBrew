import Register from '../../components/account/Register';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/context/Auth';
import { useEffect } from 'react';
import Head from 'next/head';
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
    <>
      <Head>
        <title>Nebo Brew | Register</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledRegisterPage className='bg-pattern'>
        <Register />
      </StyledRegisterPage>
    </>
  );
}
