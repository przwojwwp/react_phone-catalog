import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import './styles/main.scss';
import { MobileMenuProvider } from './modules/shared/context/MobileMenuContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <MobileMenuProvider>
    <Router>
      <App />
    </Router>
  </MobileMenuProvider>,
);
