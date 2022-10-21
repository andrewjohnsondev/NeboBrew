import styled from 'styled-components';
import usePrompt from '../../lib/hooks/usePrompt';
import { config } from '../styles/GlobalStyles';
import Prompt, { PromptBody, PromptFooter } from './Prompt';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import PrimaryButton from '../atoms/buttons/PrimaryButton';

const StyledPromptOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  display: ${({ isPromptOpen }) => (isPromptOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;

  .btn {
    text-align: center;
    font-weight: var(--fw-bold);
    font-size: var(--text-sm);
    background-color: var(--bg);
    color: var(--fg);
    border: var(--border);
    padding: 0.75em 1.75em;
    border-radius: var(--br);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 200ms ease;

    &__danger {
      --fg: hsl(var(--color-danger-dark));
      --bg: hsl(var(--color-danger-light));
    }
  }
`;

function PromptOverlay() {
  const { promptRef, isPromptOpen, setPromptOpen, closePrompt, question, setAnswer, setQuestion, answer, handleClickOutside } = usePrompt();

  return (
    <StyledPromptOverlay onClick={handleClickOutside} isPromptOpen={isPromptOpen}>
      <Prompt isOpen={true} ref={promptRef}>
        <PromptBody>
          <p>{question}</p>
        </PromptBody>
        <PromptFooter>
          <button onClick={closePrompt} className='btn btn__cancel'>
            Cancel
          </button>
          <button onClick={() => setAnswer(true)} className='btn btn__danger'>
            Yes
          </button>
        </PromptFooter>
      </Prompt>
    </StyledPromptOverlay>
  );
}
export default PromptOverlay;
