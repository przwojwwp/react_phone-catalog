import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { MobileMenu } from './modules/shared/components/MobileMenu';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <MobileMenu />
      <Header />
      {/* <h1>Product Catalog</h1> */}

      {/* <Footer /> */}
    </div>
  );
};
