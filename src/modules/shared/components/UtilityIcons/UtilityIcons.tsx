import { NavLink } from 'react-router-dom';
import HeartIcon from '@/assets/icons/heart.svg?react';
import CartIcon from '@/assets/icons/cart.svg?react';

interface Props {
  className?: string;
  onItemClick?: () => void;
}

export const UtilityIcons = ({ className, onItemClick }: Props) => {
  return (
    <>
      <NavLink to="/favourites" className={className} onClick={onItemClick}>
        <HeartIcon />
      </NavLink>
      <NavLink to="/cart" className={className} onClick={onItemClick}>
        <CartIcon />
      </NavLink>
    </>
  );
};
