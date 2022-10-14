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

  .equal {
    text-align: center;
    & > * {
      width: 100%;
    }
  }
`;

export default function TextureSelect({ style, equal, texture, setTexture }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTexture(e.target.value);
  };
  return (
    <StyledTextureSelect>
      <h3>Texture:</h3>
      <form style={style} className={equal ? 'equal' : ''} onChange={handleChange} onSubmit={handleSubmit}>
        <Select checkedVal={texture} defaultChecked={true} name='texture' value='ground' text='Ground' />
        <Select checkedVal={texture} name='texture' value='whole' text='Whole Bean' />
      </form>
    </StyledTextureSelect>
  );
}
