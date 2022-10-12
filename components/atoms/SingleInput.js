import PrimaryButton from './buttons/PrimaryButton';
import Input from './Input';
import styled from 'styled-components';
import { config } from '../styles/GlobalStyles';
import { TailSpin } from 'react-loader-spinner';

const StyledSingleInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${config.med}) {
    flex-direction: row;
    justify-content: center;

    input {
      max-width: 26rem;
      flex-grow: 1;
    }
  }
`;

export default function SingleInput({ loading, placeholder, name, buttonText, value, onChange, type, error }) {
  return (
    <StyledSingleInput>
      <Input error={error} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} />
      <PrimaryButton type='submit' className='btn-md'>
        {loading ? <TailSpin height={16} width={16} color='#fff' /> : buttonText}
      </PrimaryButton>
    </StyledSingleInput>
  );
}
