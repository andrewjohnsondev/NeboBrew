import { gql } from '@apollo/client';
import client from '../apollo-client';
import RichText from '../components/atoms/RichText';
import { Wrapper } from '../components/styles/utilities';
import styled from 'styled-components';
import { config } from '../components/styles/GlobalStyles';
import Head from 'next/head';
const StyledTermsPage = styled.main`
  padding-block: 4rem;
  max-width: 80ch;
  margin-inline: auto;

  & > * {
    h2 {
      font-size: var(--text-2xl);
    }
    h3 {
      font-size: var(--text-xl);
    }
  }
  & > * > * + * {
    margin-top: 1.5rem;
  }

  @media (min-width: ${config.med}) {
    padding-bottom: 6rem;
    & > * {
      h2 {
        font-size: var(--text-3xl);
      }
      h3 {
        font-size: var(--text-2xl);
      }
    }
  }
`;

export default function TermsPage({ content }) {
  return (
    <>
      <Head>
        <title>Coffee | Terms</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <StyledTermsPage>
        <Wrapper>
          <RichText value={content[0].contentRaw} />
        </Wrapper>
      </StyledTermsPage>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        allTerms {
          contentRaw
        }
      }
    `,
  });

  return {
    props: {
      content: data.allTerms,
    },
  };
}
