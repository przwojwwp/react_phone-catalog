import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navLinks';
import styles from './NavLinks.module.scss';

export const NavLinks = () => {
  return (
    <>
      {NAV_LINKS.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end} className={styles['nav-item']}>
          {label}
        </NavLink>
      ))}
    </>
  );
};
