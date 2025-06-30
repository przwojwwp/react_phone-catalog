import { NavLink } from 'react-router-dom';
import style from './MobileMenu.module.scss';
import { Logo } from '../Logo';
import CloseIcon from '../../assets/icons/close.svg?react';
import { useMobileMenu } from '../../context/MobileMenuContext/MobileMenuContext';

export const MobileMenu = () => {
  const { isOpen, close } = useMobileMenu();

  return (
    <div className={`${style.menu} ${isOpen ? style.open : ''}`}>
      <div className={style.header}>
        <NavLink to="/home" className={style.logo}>
          <Logo />
        </NavLink>
        <button className={style.icon} onClick={close}>
          <CloseIcon />
        </button>
      </div>

      <div className={style['mobile-navigation']}>
        <NavLink to="/home" className={style['nav-item']}>
          Home
        </NavLink>
        <NavLink to="/phones" className={style['nav-item']}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={style['nav-item']}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={style['nav-item']}>
          Accessories
        </NavLink>
      </div>
      <div className={style['menu-actions']}></div>
    </div>
  );
};
