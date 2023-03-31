import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage';
import { SignUpForm } from './components/SignUpForm';
import { LoginForm } from './components/LoginForm';
import { MainPage } from './components/MainPage';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },

      {
        path: 'sign-up',
        element: <SignUpForm />,
      },

      {
        path: 'login',
        element: <LoginForm handleSetToken={() => null} />
      }
    ]
  }
]);

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
