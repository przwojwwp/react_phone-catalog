import styles from './Navigation.module.scss';
import { NavLinks } from '../NavLinks';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLinks />
    </nav>
  );
};
