import { useState } from 'react';
import styled from 'styled-components';
import Select from '../atoms/Select';

const StyledTextureSelect = styled.div`
  form {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding-block: 1rem;
  }
`;

export default function TextureSelect({ texture, setTexture }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTexture(e.target.value);
  };
  return (
    <StyledTextureSelect>
      <h3>Texture:</h3>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Select checkedVal={texture} defaultChecked={true} name='texture' value='ground' text='Ground' />
        <Select checkedVal={texture} name='texture' value='whole' text='Whole Bean' />
      </form>
    </StyledTextureSelect>
  );
}
