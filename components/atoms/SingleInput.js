import PrimaryButton from './buttons/PrimaryButton';
import Input from './Input';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
import { TailSpin } from 'react-loader-spinner';

const StyledSingleInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  .input-wrapper {
    input {
      width: 100%;
    }
  }

  .searchText {
    position: absolute;
    left: 11px;
    top: 11px;
    transition: all 200ms ease-in-out;
    font-size: var(--text-xl);
    color: hsl(var(--color-neutral-500));
  }

  .searchText.offset {
    top: -15px;
  }

  @media (min-width: ${config.med}) {
    flex-direction: row;
    justify-content: center;

    input {
      width: 100%;
    }

    .input-wrapper {
      max-width: 26rem;
      flex-grow: 1;
      position: relative;
    }
  }
`;

export default function SingleInput({ loading, placeholder, name, buttonText, value, onChange, type, error, btnClass, inputClass, isSearchText }) {
  return (
    <StyledSingleInput>
      <div className='input-wrapper'>
        <Input className={inputClass} error={error} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} />
        {isSearchText ? <p className={`searchText ${value !== '' ? 'offset' : ''}`}>Search</p> : ''}
      </div>
      <PrimaryButton type='submit' className={`btn-md ${btnClass}`}>
        {loading ? <TailSpin height={16} width={16} color='#fff' /> : buttonText}
      </PrimaryButton>
    </StyledSingleInput>
  );
}
