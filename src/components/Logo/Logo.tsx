import { NavLink } from 'react-router-dom';
import LogoPink from '../../assets/logo/logo-pink.svg?react';
import LogoBlack from '../../assets/logo/logo-black.svg?react';
import styles from './Logo.module.scss';
import { useMobileMenu } from '../../context/MobileMenuContext';

export const Logo = () => {
  const { isOpen } = useMobileMenu();
  return (
    <NavLink to="/home" className={styles.wrapper}>
      {isOpen ? (
        <LogoBlack className={styles.logo} />
      ) : (
        <LogoPink className={styles.logo} />
      )}
    </NavLink>
  );
};
