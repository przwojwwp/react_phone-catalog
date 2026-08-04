import { Outlet } from 'react-router-dom';

import { Header } from '../shared/components/Header';
import { MobileMenu } from '../shared/components/MobileMenu';
import { Footer } from '../shared/components/Footer';

export const MainLayout = () => {
  return (
    <div className="App">
      <MobileMenu />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
