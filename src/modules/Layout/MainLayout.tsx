import { Outlet } from 'react-router-dom';

import { Header } from '../shared/components/Header';
import { MobileMenu } from '../shared/components/MobileMenu';
import { Footer } from '../shared/components/Footer';

import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  return (
    <div className={styles.App}>
      <MobileMenu />
      <Header />
      <main className={styles['main-content']}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
