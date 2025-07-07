import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { Logo } from '../Logo';
import CloseIcon from '../../assets/icons/close.svg?react';
import { useMobileMenu } from '../../context/MobileMenuContext/MobileMenuContext';
import { NavLinks } from '../NavLinks/NavLinks';

export const MobileMenu = () => {
  const { isOpen, close } = useMobileMenu();

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <Logo />
        <button className={styles.icon} onClick={close}>
          <CloseIcon />
        </button>
      </div>

      <div className={styles['mobile-navigation']}>
        <NavLinks className={styles['nav-item']} />
      </div>
      <div className={styles['menu-actions']}>
        <NavLink to="/favourites" className=""></NavLink>
        <NavLink to="/cart" className=""></NavLink>
      </div>
    </div>
  );
};
