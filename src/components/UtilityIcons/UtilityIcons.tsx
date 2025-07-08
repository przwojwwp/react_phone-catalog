import { NavLink } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg?react';
import CartIcon from '../../assets/icons/cart.svg?react';

interface Props {
  className?: string;
}

export const UtilityIcons = ({ className }: Props) => {
  return (
    <>
      <NavLink to="/favourites" className={className}>
        <HeartIcon />
      </NavLink>
      <NavLink to="/cart" className={className}>
        <CartIcon />
      </NavLink>
    </>
  );
};
