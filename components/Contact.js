import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryButton from './atoms/buttons/PrimaryButton';
import styled from 'styled-components';
import Error from './atoms/Error';
import FormInput from './atoms/FormInput';
import { config } from './styles/GlobalStyles';
import { useRouter } from 'next/router';
import neboAxios from '../config/axios';
import FormTextArea from './atoms/FormTextArea';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import FormSuccess from './atoms/FormSuccess';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 29rem;
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: var(--br);
  position: relative;
  margin-inline: 0.625rem;

  .center {
    display: grid;
    place-items: center;
  }

  label {
    font-size: var(--text-base);
    cursor: pointer;
  }

  a {
    color: inherit;
    margin-left: 5px;
  }

  h1 {
    font-size: var(--text-3xl);
    font-weight: var(--fw-black);
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
  }

  .flex {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  button {
    margin-top: 1rem;
  }

  .link {
    font-size: var(--text-sm);
  }

  @media (min-width: ${config.sm}) {
    padding: 2rem;

    h1 {
      font-size: var(--text-4xl);
    }

    label {
      font-size: var(--text-lg);
    }

    .link {
      font-size: var(--text-base);
      margin-top: 1rem;
    }
  }
`;

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ email, message }) => {
    try {
      setLoading(true);
      await neboAxios.post('/', {
        mutations: [
          {
            create: {
              _type: 'messages',
              email: `${email}`,
              message: `${message}`,
            },
          },
        ],
      });
      setLoading(false);
      router.push('/');
      toast.success(`Message Sent!`);
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Contact Us</h1>
      <div className='flex'>
        <label htmlFor='email'>Email</label>
        <FormInput id='email' type='email' {...register('email', { required: true })} />
        {errors.email?.type === 'required' && <Error>Email is required</Error>}
      </div>
      <div className='flex'>
        <label htmlFor='message'>Message</label>
        <FormTextArea rows={7} id='message' type='message' {...register('message', { required: true, minLength: 1 })} />
        {errors.message?.type === 'required' && <Error>Message is required</Error>}
      </div>
      {error && <Error className='error'>{error}</Error>}
      <div className='flex'>
        <PrimaryButton className='center' type='submit'>
          {loading ? <TailSpin height={18} width={18} color='#fff' /> : 'Send'}
        </PrimaryButton>
      </div>
    </StyledForm>
  );
}
