import { HomePage } from './modules/HomePage/HomePage';
import { PhonePage } from './modules/PhonePage/PhonePage';

import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './modules/Layout/MainLayout';
import { NotFoundPage } from './modules/NotFoundPage';

import './App.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<PhonePage />} />
        <Route path="phone/:slug" element={<PhonePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
