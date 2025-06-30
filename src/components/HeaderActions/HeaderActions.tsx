import { NavLink } from 'react-router-dom';
import style from './HeaderActions.module.scss';
import HeartIcon from '../../assets/icons/heart.svg?react';
import BagIcon from '../../assets/icons/bag.svg?react';
import BurgerIcon from '../../assets/icons/burger-menu.svg?react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useMobileMenu } from '../../context/MobileMenuContext/MobileMenuContext';

export const HeaderActions = () => {
  const isMobile = useIsMobile();
  const { open } = useMobileMenu();

  return (
    <div className={style['header-actions']}>
      {isMobile ? (
        <button className={style['burger-menu-button']} onClick={open}>
          <BurgerIcon />
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
