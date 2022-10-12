import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import styled, { keyframes } from 'styled-components';
import Error from '../atoms/Error';
import FormInput from '../atoms/FormInput';
import { config } from '../styles/GlobalStyles';
import Link from 'next/link';
import { useAuth } from '../context/Auth';
import wait from 'waait';
import { getAuth, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const display = keyframes`
  from {
    display: none;
    opacity: 0;
  }

  to {
    display: block !important;
	opacity: 1 !important;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 29rem;
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: var(--br);

  label {
    font-size: var(--text-base);
    cursor: pointer;
  }

  .animate {
    animation: ${display} 1s ease;
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

  div {
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
    }
  }
`;

export default function Register() {
  const { signUp } = useAuth();
  const [error, setError] = useState('');
  const auth = getAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const user = await signUp(data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      router.push('/');
      toast.success(`Welcome ${data.firstName} ${data.lastName}!`);
    } catch (err) {
      switch (err.message) {
        case 'Firebase: Error (auth/email-already-in-use).':
          setError('User with that email already exists');
          break;
        default:
          setError(err.message);
      }
      await wait(3000);
      setError('');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor='firstName'>First Name</label>
        <FormInput id='firstName' type='text' {...register('firstName', { required: true })} />
        {errors.firstName?.type === 'required' && <Error>First name is required</Error>}
      </div>
      <div>
        <label htmlFor='lastName'>Last Name</label>
        <FormInput id='lastName' type='text' {...register('lastName', { required: true })} />
        {errors.lastName?.type === 'required' && <Error>Last name is required</Error>}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <FormInput id='email' type='email' {...register('email', { required: true })} />
        {errors.email?.type === 'required' && <Error>Email is required</Error>}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <FormInput id='password' type='password' {...register('password', { required: true, minLength: 6 })} />
        {errors.password?.type === 'required' && <Error>Password is required</Error>}
        {errors.password?.type === 'minLength' && <Error>Password must be atleast 6 characters</Error>}
      </div>
      {error && <Error className='error'>{error}</Error>}
      <PrimaryButton type='submit'>Sign Up</PrimaryButton>
      <p className='link'>
        Already have an account? <Link href='/account/login'>Sign In</Link>
      </p>
    </StyledForm>
  );
}
