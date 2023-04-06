import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { FilterPage } from './pages/FilterPage';
import { ResultPage } from './pages/ResultPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />
      },

      {
        path: 'sign-up',
        element: <SignUpPage />
      },

      {
        path: 'login',
        element: <LoginPage />
      },

      {
        path: 'profile',
        element: <ProfilePage />
      },

      {
        path: 'filter',
        element: <FilterPage />
      },

      {
        path: 'gifts',
        element: <ResultPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
