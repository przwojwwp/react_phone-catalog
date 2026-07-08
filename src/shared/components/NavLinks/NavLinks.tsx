import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navLinks';

interface NavLinksProps {
  className?: string;
}

export const NavLinks = ({ className }: NavLinksProps) => {
  return (
    <>
      {NAV_LINKS.map(({ to, label }) => (
        <NavLink key={to} to={to} className={className}>
          {label}
        </NavLink>
      ))}
    </>
  );
};
