import styled from 'styled-components';
import SectionTitle from '../atoms/SectionTitle';
import SingleInput from '../atoms/SingleInput';
import { Wrapper } from '../styles/utilities';
import { config } from '../styles/GlobalStyles';
import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Error from '../atoms/Error';
import wait from 'waait';
import axios from 'axios';

const CheckEmailList = gql`
  query ($email: String!) {
    allEmailList(where: { email: { eq: $email } }) {
      email
    }
  }
`;

const StyledCta = styled.article`
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-white));
  text-align: center;
  padding-block: 4rem;

  .error {
    margin-top: 1rem;
    margin-right: auto;
    display: block;
    color: white;
  }

  @media (min-width: ${config.lg}) {
    padding-block: 5rem;
  }

  .cta__content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  form {
    margin-top: 2.5rem;
  }

  p {
    font-size: var(--text-lg);
  }
`;

export default function Cta() {
  const [email, setEmail] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [error, setError] = useState('');
  const [getEmailList, { data }] = useLazyQuery(CheckEmailList);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data: emails } = await getEmailList({ variables: { email } });
    if (emails.allEmailList.length === 0) {
      setLoading(true);
      try {
        await axios.post('/api/discount', {
          email,
        });
        await axios.post('/api/addEmail', {
          email,
        });
        setEmailSuccess(true);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
      return;
    }

    setError('Email already subscribed!');
    await wait(5000);
    setError('');
  };

  const onInputChange = (e) => {
    setEmail(e.target.value);
  };

  if (emailSuccess) {
    return (
      <StyledCta className='bg-pattern'>
        <Wrapper>
          <div className='cta__content'>
            <SectionTitle>Thank you for subscribing!</SectionTitle>
            <p>Check your email for your discount code.</p>
          </div>
        </Wrapper>
      </StyledCta>
    );
  }
  return (
    <StyledCta className='bg-pattern'>
      <Wrapper>
        <div className='cta__content'>
          <SectionTitle>Get a 10% discount</SectionTitle>
          <p>By joining our newsletter. Cancel anytime! No spam!</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <SingleInput loading={loading} error={error} value={email} onChange={onInputChange} name='email' type='email' placeholder='Enter your email' buttonText='Notify Me' />
        </form>
        {error && <Error className='error'>{error}</Error>}
      </Wrapper>
    </StyledCta>
  );
}
