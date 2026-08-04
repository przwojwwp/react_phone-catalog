import { NavLink } from 'react-router-dom';
import LogoPink from '@/assets/logo/logo-pink.svg?react';
import LogoBlack from '@/assets/logo/logo-black.svg?react';
import { useMobileMenu } from '../../context/MobileMenuContext';

import styles from './Logo.module.scss';

interface LogoProps {
  isFooter?: boolean;
}

export const Logo = ({ isFooter }: LogoProps) => {
  const { isOpen } = useMobileMenu();

  const logoClass = isFooter ? styles['logo-footer'] : styles.logo;
  const wrapperClass = isFooter ? styles['wrapper-footer'] : styles.wrapper;

  return (
    <NavLink to="/home" className={wrapperClass}>
      {isOpen ? (
        <LogoBlack className={styles.logo} />
      ) : (
        <LogoPink className={logoClass} />
      )}
    </NavLink>
  );
};
