import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './app.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashBoard from './pages/DashBoard.jsx';
import Anuncio from './pages/Anuncio.jsx'
import PerfilUsuario from './pages/PerfilUsuario.jsx';  
import CriarAnuncio from './pages/CriarAnuncio.jsx';
import EditarPerfil from './pages/EditarPerfil.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <DashBoard /> },
  { path: '/anuncio', element: <Anuncio /> },
  { path: '/perfil', element: <PerfilUsuario /> },
  { path: '/criaranuncio', element: <CriarAnuncio /> },
  { path: '/editarperfil', element: <EditarPerfil /> },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
