import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Navigation = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <nav className={styles.nav}>
      <NavLink to="/home" className={styles['nav-item']}>
        Home
      </NavLink>
      <NavLink to="/phones" className={styles['nav-item']}>
        Phones
      </NavLink>
      <NavLink to="/tablets" className={styles['nav-item']}>
        Tablets
      </NavLink>
      <NavLink to="/accessories" className={styles['nav-item']}>
        Accessories
      </NavLink>
    </nav>
  );
};
