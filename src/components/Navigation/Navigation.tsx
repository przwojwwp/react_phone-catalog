import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useIsMobile } from '../../hooks/useIsMobile';

export const Navigation = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <nav className={styles.nav}>
      <NavLink to="/home" className={styles.navItem}>
        Home
      </NavLink>
      <NavLink to="/phones" className={styles.navItem}>
        Phones
      </NavLink>
      <NavLink to="/tablets" className={styles.navItem}>
        Tablets
      </NavLink>
      <NavLink to="/accessories" className={styles.navItem}>
        Accessories
      </NavLink>
    </nav>
  );
};
