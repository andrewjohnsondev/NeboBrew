import Contact from '../components/Contact';
import styled from 'styled-components';
import { Wrapper } from '../components/styles/utilities';

const StyledSubmitPage = styled.main`
  padding-block: 6rem;
  display: grid;
  place-items: center;
`;

function SubmitPage() {
  return (
    <StyledSubmitPage className='bg-pattern'>
      <Contact />
    </StyledSubmitPage>
  );
}
export default SubmitPage;
