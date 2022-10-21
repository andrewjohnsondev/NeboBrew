import PrimaryButton from '../atoms/buttons/PrimaryButton';
import styled from 'styled-components';
import Image from 'next/image';
const StyledEmptyState = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  h3 {
    font-size: var(--text-2xl);
    color: hsl(var(--color-neutral-600));
    font-weight: normal;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ghost {
    margin-inline: auto;
    background-color: hsl(var(--color-primary-200), 60%);
    color: hsl(var(--color-primary));
    padding: 1rem;
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    display: grid;
    place-items: center;
    font-size: 2rem;
    margin-top: 2rem;
  }
`;

function EmptyState({ linkUrl, action, message }) {
  return (
    <StyledEmptyState>
      <div className='header'>
        <div className='ghost'>
          <Image src='/assets/ghost.svg' width={70} height={70} />
        </div>
        <h3>{message}</h3>
      </div>
      <PrimaryButton isLink href={linkUrl}>
        {action}
      </PrimaryButton>
    </StyledEmptyState>
  );
}
export default EmptyState;
