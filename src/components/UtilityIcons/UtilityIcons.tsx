import { NavLink } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg?react';
import CartIcon from '../../assets/icons/cart.svg?react';
import styles from './UtilityIcons.module.scss';

export const UtilityIcons = () => {
  return (
    <>
      <NavLink to="/favourites" className={styles.icon}>
        <HeartIcon />
      </NavLink>
      <NavLink to="/cart" className={styles.icon}>
        <CartIcon />
      </NavLink>
    </>
  );
};
