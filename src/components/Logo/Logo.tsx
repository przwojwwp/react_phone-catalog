import { NavLink } from 'react-router-dom';
import LogoIcon from '../../assets/logo/logo-pink.svg?react';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <NavLink to="/home" className={styles.wrapper}>
      <LogoIcon className={styles.image} />
    </NavLink>
  );
};
