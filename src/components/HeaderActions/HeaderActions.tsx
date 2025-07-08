import { NavLink } from 'react-router-dom';
import styles from './HeaderActions.module.scss';
import HeartIcon from '../../assets/icons/heart.svg?react';
import CartIcon from '../../assets/icons/cart.svg?react';
import BurgerIcon from '../../assets/icons/burger-menu.svg?react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useMobileMenu } from '../../context/MobileMenuContext/MobileMenuContext';

export const HeaderActions = () => {
  const isMobile = useIsMobile();
  const { open } = useMobileMenu();

  return (
    <div className={styles['header-actions']}>
      {isMobile ? (
        <button className={styles['burger-menu-button']} onClick={open}>
          <BurgerIcon />
        </button>
      ) : (
        <>
          <NavLink to="/favourites" className={styles.icon}>
            <HeartIcon />
          </NavLink>
          <NavLink to="/cart" className={styles.icon}>
            <CartIcon />
          </NavLink>
        </>
      )}
    </div>
  );
};
