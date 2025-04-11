import { NavLink } from 'react-router-dom';
import style from './HeaderActions.module.scss';
import Heart from '../../assets/icons/heart.svg?react';
import Bag from '../../assets/icons/bag.svg?react';

export const HeaderActions = () => {
  return (
    <div className={style.HeaderActions}>
      <NavLink to="/favourites" className={style.icon}>
        <Heart />
      </NavLink>
      <NavLink to="/cart" className={style.icon}>
        <Bag />
      </NavLink>
    </div>
  );
};
