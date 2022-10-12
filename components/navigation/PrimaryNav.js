import styled from 'styled-components';
import NavLink from './NavLink';
import { config } from '../styles/GlobalStyles';
import { routes } from '../../config';
const StyledPrimaryNav = styled.nav`
  align-items: center;
  gap: 3rem;
  display: none;
  text-transform: uppercase;

  @media (min-width: ${config.med}) {
    display: flex;
  }
`;

const options = [
  { name: 'Coffee', href: routes.coffee },
  { name: 'Subscriptions', href: routes.subscriptions },
  { name: 'About', href: routes.about },
];

export default function PrimaryNav() {
  return (
    <StyledPrimaryNav>
      {options.map((option) => (
        <NavLink key={option.name} href={option.href}>
          {option.name}
        </NavLink>
      ))}
    </StyledPrimaryNav>
  );
}
