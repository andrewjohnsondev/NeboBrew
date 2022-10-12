import styled from 'styled-components';

const StyledInput = styled.input`
  border-radius: var(--br);
  padding: 0.75rem;
  border: ${({ error }) => (error ? 'solid 1px red' : 'none')};
`;

export default function Input({ error, placeholder, name, id, value, onChange, type }) {
  return <StyledInput error={error} type={type} onChange={onChange} placeholder={placeholder} name={name} id={id} value={value} />;
}
