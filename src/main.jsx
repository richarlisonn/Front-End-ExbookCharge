import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './app.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
import PerfilUsuario from './pages/PerfilUsuario.jsx';  
import CriarAnuncio from './pages/CriarAnuncio.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import AnnouncePage from './pages/AnnouncePage.jsx';
import UpdateAnnounce from './pages/UpdateAnnounce.jsx';
import ExchangeDonationPage from './pages/ExchangeDonationPage.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <DashBoard /> },
  { path: '/dashboard/:id', element: <AnnouncePage /> },
  { path: '/dashboard/editbook/:id', element: <UpdateAnnounce /> },
  { path: '/dashboard/exchangedonation/:id', element: <ExchangeDonationPage /> },
  { path: '/profile', element: <PerfilUsuario /> },
  { path: '/criaranuncio', element: <CriarAnuncio /> },
  { path: '/updateprofile/:id', element: <UpdateProfile /> },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
