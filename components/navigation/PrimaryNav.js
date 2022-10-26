import styled from 'styled-components';
import NavLink from './NavLink';
import { config } from '../styles/GlobalStyles';
import { routes } from '../../config';
import useMenuInit from '../../lib/hooks/useMenuInit';
const StyledPrimaryNav = styled.nav`
  align-items: center;
  position: fixed;
  background-color: hsl(var(--color-primary-900));
  color: white;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  z-index: -1;
  text-transform: uppercase;
  display: none;
  flex-direction: column;
  padding-top: 14rem;
  gap: 4rem;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 250ms ease-in-out;

  &.initMenu {
    display: flex;
  }

  a {
    font-size: var(--text-xl);
  }

  @media (min-width: ${config.med}) {
    display: flex;
    align-items: center;
    background-color: transparent;
    position: static;
    width: auto;
    color: hsl(var(--color-neutral-1000));
    flex-direction: row;
    gap: 2.5rem;
    z-index: 1;
    padding-top: 0;
    transform: translateX(0);
  }
`;

const options = [
  { name: 'Coffee', href: routes.coffee },
  { name: 'Subscriptions', href: routes.subscriptions },
  { name: 'About', href: routes.about },
];

export default function PrimaryNav({ isOpen }) {
  const [initMenu] = useMenuInit();

  return (
    <StyledPrimaryNav isOpen={isOpen} className={initMenu ? 'initMenu' : ''}>
      {options.map((option) => (
        <NavLink key={option.name} href={option.href}>
          {option.name}
        </NavLink>
      ))}
    </StyledPrimaryNav>
  );
}
