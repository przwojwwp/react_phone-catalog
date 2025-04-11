import { Header } from './components/Header';
import './App.scss';
import { MobileMenu } from './components/MobileMenu';
import { useMobileMenu } from './context/MobileMenuContext/MobileMenuContext';

export const App = () => {
  const { isOpen } = useMobileMenu();

  return (
    <div className="App">
      {isOpen ? <MobileMenu /> : <Header />}
      {/* <h1>Product Catalog</h1> */}
    </div>
  );
};
