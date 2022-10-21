import { useEffect, useState, useRef } from 'react';
import useZustandStore from '../../../store/zustandStore';
import PrimaryButton from '../../atoms/buttons/PrimaryButton';
import { useCart } from 'react-use-cart';
import formatMoney from '../../../lib/helpers/formatMoney';
import TextureSelect from '../TextureSelect';
import Quantity from '../../atoms/Quantity';
import { StyledModalOverlay, StyledModalBody, StyledModal } from './StyledQuickShop';

function QuickShop() {
  const isModalOpen = useZustandStore((state) => state.isModalOpen);
  const setModalOpen = useZustandStore((state) => state.setModalOpen);
  const toggleCartState = useZustandStore((state) => state.toggleCartState);
  const quickShopProduct = useZustandStore((state) => state.quickShopProduct);
  const [texture, setTexture] = useState('ground');
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef();

  const { addItem } = useCart();

  const closeModal = () => {
    setModalOpen(false);
    document.querySelector('body').classList.remove('modal-open');
  };

  const resetForm = () => {
    setTexture('ground');
    setQuantity(1);
  };

  const addToCart = () => {
    addItem({ ...quickShopProduct, texture, id: quickShopProduct._id + texture }, quantity);
    closeModal();
    toggleCartState();
    resetForm();
  };

  useEffect(() => {
    if (isModalOpen) document.querySelector('body').classList.add('modal-open');
  }, [isModalOpen]);

  useEffect(() => {
    const escListener = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }

      if (e.key === 'Enter') {
        addToCart();
      }
    };

    document.addEventListener('keydown', escListener);

    return () => {
      document.removeEventListener('keydown', escListener);
    };
  }, []);

  const handleModalClose = (e) => {
    if (!modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  if (!isModalOpen) return null;

  const { name, price, roast, _id, description } = quickShopProduct;

  return (
    <StyledModalOverlay onClick={handleModalClose}>
      <StyledModal ref={modalRef}>
        <button onClick={closeModal} className='close'>
          x
        </button>

        <StyledModalBody>
          <div>
            <h2 className='title'>{name}</h2>
            <p className='price'>
              {formatMoney(price)}
              <span> / 12oz bag</span>
            </p>
          </div>
          <div className='roast'>
            <h3>Roast:</h3>
            <p>{roast}</p>
          </div>
          <TextureSelect style={{ paddingBottom: 0 }} equal texture={texture} setTexture={setTexture} />
          <div>
            <h3>Quantity:</h3>
            <Quantity style={{ marginTop: '1.5rem' }} quantity={quantity} setQuantity={setQuantity} />
          </div>
          <PrimaryButton className='addBtn' onClick={addToCart}>
            Add To Cart
          </PrimaryButton>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  );
}
export default QuickShop;
