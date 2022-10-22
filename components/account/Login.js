import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../atoms/buttons/PrimaryButton';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import styled from 'styled-components';
import Error from '../atoms/Error';
import FormInput from '../atoms/FormInput';
import { config } from '../styles/GlobalStyles';
import Link from 'next/link';
import { useAuth } from '../context/Auth';
import { useRouter } from 'next/router';
import wait from 'waait';
import FormSuccess from '../atoms/FormSuccess';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

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

  .reset {
    font-size: var(--text-sm);
    color: hsl(var(--color-darkPrimary));
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
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
  const { login, resetPassword, user } = useAuth();
  const [error, setError] = useState('');
  const [isResetEnabled, setIsResetEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.email, data.password);
      router.push('/');
      toast.success(`Welcome back!`);
    } catch (err) {
      setLoading(false);
      switch (err.message) {
        case 'Firebase: Error (auth/user-not-found).':
          setError('User not found');
          break;
        case 'Firebase: Error (auth/wrong-password).':
          setError('Password incorrect');
          break;
        default:
          setError(err.message);
      }

      await wait(3000);
      setError('');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setIsResetEnabled(!isResetEnabled);
  };

  const handleResetSubmit = async (data) => {
    try {
      await resetPassword(data.email);
      setEmail(data.email);
      setIsShown(true);
      await wait(5000);
      setEmail('');
      setIsShown(false);
    } catch (err) {
      if (err.message === 'Firebase: Error (auth/user-not-found).') {
        setError("User with that email doesn't exist.");
        console.log(data.email);
      } else {
        setError(err.message);
      }
      console.log(err);
      await wait(3000);
      setError('');
    }
  };

  if (isResetEnabled) {
    return (
      <StyledForm onSubmit={handleSubmit(handleResetSubmit)}>
        <h1>Reset</h1>
        <div className='flex'>
          <label htmlFor='email'>Email</label>
          <FormInput id='email' type='email' {...register('email', { required: true })} />
          {errors.email?.type === 'required' && <Error>Email is required</Error>}
        </div>

        {error && <Error className='error'>{error}</Error>}
        <div className='flex'>
          <PrimaryButton type='submit'>Reset Password</PrimaryButton>
          <SecondaryButton onClick={handlePasswordReset}>Cancel</SecondaryButton>
        </div>
        <FormSuccess isShown={isShown}>
          <img src='/assets/envelope.svg' alt='' />
          <p>Password reset link sent to:</p>
          <p className='email'>{email}</p>
        </FormSuccess>
      </StyledForm>
    );
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      <div className='flex'>
        <label htmlFor='email'>Email</label>
        <FormInput id='email' type='email' {...register('email', { required: true })} />
        {errors.email?.type === 'required' && <Error>Email is required</Error>}
      </div>
      <div className='flex'>
        <label htmlFor='password'>Password</label>
        <FormInput id='password' type='password' {...register('password', { required: true, minLength: 6 })} />
        {errors.password?.type === 'required' && <Error>Password is required</Error>}
        {errors.password?.type === 'minLength' && <Error>Password must be atleast 6 characters</Error>}
      </div>
      {error && <Error className='error'>{error}</Error>}
      <div className='flex'>
        <PrimaryButton disabled={loading ? true : false} type='submit'>
          {loading ? <TailSpin height={18} width={18} color='#fff' /> : 'Sign In'}
        </PrimaryButton>
        <button onClick={handlePasswordReset} className='reset'>
          Forgot your password?
        </button>
      </div>
      <p className='link'>
        Don&apos;t have an account? <Link href='/account/register'>Sign Up</Link>
      </p>
    </StyledForm>
  );
}
