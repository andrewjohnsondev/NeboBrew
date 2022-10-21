import Modal from '../atoms/Modal';
import ModalLink from '../atoms/ModalLink';
import { useAuth } from '../context/Auth';
import SecondaryButton from '../atoms/buttons/SecondaryButton';

export default function AccountModule({ isOpen }) {
  const { user, logout } = useAuth();
  const handleLogOut = () => {
    logout();
  };

  if (!user) {
    return (
      <Modal isOpen={isOpen}>
        <ModalLink href='/account/login' text='Sign In' />
        <ModalLink href='/account/register' text='Sign Up' />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen}>
      <div>
        <p className='name'>{user.displayName}</p>
        <p className='email'>{user.email}</p>
      </div>
      <ModalLink href={`/account/orders`} text='Orders' />
      <ModalLink href={`/account/subscriptions`} text='Subscriptions' />
      <SecondaryButton onClick={handleLogOut} className='logout btn-sm mt-4'>
        Logout
      </SecondaryButton>
    </Modal>
  );
}
