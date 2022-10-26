import Contact from '../components/Contact';
import styled from 'styled-components';
import { Wrapper } from '../components/styles/utilities';
import Head from 'next/head';

const StyledSubmitPage = styled.main`
  padding-block: 6rem;
  display: grid;
  place-items: center;
`;

function SubmitPage() {
  return (
    <>
      <Head>
        <title>Coffee | Contact</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledSubmitPage className='bg-pattern'>
        <Contact />
      </StyledSubmitPage>
    </>
  );
}
export default SubmitPage;
