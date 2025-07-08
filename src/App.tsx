import { Header } from './modules/shared/components/Header';
import { MobileMenu } from './modules/shared/components/MobileMenu';
import { useMobileMenu } from './modules/shared/context/MobileMenuContext';

import './App.scss';

export const App = () => {
  const { isOpen } = useMobileMenu();

  return (
    <div className="App">
      {isOpen ? <MobileMenu /> : <Header />}
      {/* <h1>Product Catalog</h1> */}
    </div>
  );
};
