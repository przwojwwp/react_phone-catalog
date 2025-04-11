import { NavLink } from 'react-router-dom';
import style from './HeaderActions.module.scss';
import HeartIcon from '../../assets/icons/heart.svg?react';
import BagIcon from '../../assets/icons/bag.svg?react';
import HamburgerMenu from '../../assets/icons/hamburger-menu.svg?react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useState } from 'react';

export const HeaderActions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div className={style['header-actions']}>
      {isMobile ? (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={style['menu-wrapper']}
        >
          <HamburgerMenu />
        </button>
      ) : (
        <>
          <NavLink to="/favourites" className={style.icon}>
            <HeartIcon />
          </NavLink>
          <NavLink to="/cart" className={style.icon}>
            <BagIcon />
          </NavLink>
        </>
      )}
    </div>
  );
};
