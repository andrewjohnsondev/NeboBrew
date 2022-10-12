import styled from 'styled-components';
import Image from 'next/image';
import empty from '../../public/assets/emtpy.svg';
import SecondaryButton from '../atoms/buttons/SecondaryButton';
import useZustandStore from '../../store/zustandStore';

const StyledCartEmpty = styled.div`
  text-align: center;
  margin-top: 5rem;
  .addItem {
    margin-inline: auto;
    background-color: hsl(var(--color-primary-200));
    color: hsl(var(--color-primary));
    padding: 1rem;
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    display: grid;
    place-items: center;
    font-size: 2rem;
    margin-top: 2rem;
    opacity: 0.45;
  }

  .title {
    font-weight: var(--fw-bold);
    font-size: var(--text-base);
    margin-top: 2rem;
  }

  .sub {
    font-size: var(--text-sm);
    max-width: 30ch;
    margin-inline: auto;
    margin-top: 0.5rem;
    color: hsl(var(--color-neutral-400));
  }

  .button {
    font-size: var(--text-xs);
    margin-top: 2rem;
    display: inline-block;
  }
`;

function CartEmpty() {
  const toggleCartState = useZustandStore((state) => state.toggleCartState);
  return (
    <StyledCartEmpty>
      <div className='addItem'>
        <Image src={empty} width={70} height={70} />
      </div>
      <div>
        <p className='title'>Your cart is empty</p>
        <p className='sub'>Looks like you haven&apos;t added anything to your cart yet</p>
        <SecondaryButton onClick={toggleCartState} isLink href='/coffee' className='button'>
          Explore Coffee
        </SecondaryButton>
      </div>
    </StyledCartEmpty>
  );
}
export default CartEmpty;
