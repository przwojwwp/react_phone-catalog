import { HeaderActions } from '../HeaderActions';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <HeaderActions />
    </header>
  );
};
