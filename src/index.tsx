import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter as Router } from 'react-router-dom';
import { MobileMenuProvider } from './shared/context/MobileMenuContext';

import './styles/main.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <MobileMenuProvider>
    <Router>
      <App />
    </Router>
  </MobileMenuProvider>,
);
