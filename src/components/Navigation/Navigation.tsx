import styles from './Navigation.module.scss';
import { useIsMobile } from '../../hooks/useIsMobile';
import { NavLinks } from '../NavLinks/NavLinks';

export const Navigation = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <nav className={styles.nav}>
      <NavLinks className={styles['nav-item']} />
    </nav>
  );
};
