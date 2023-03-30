import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import useToken from './utils/useToken';
import { Token } from './types/Token';
import { getUserInfoFromServer } from './api/user';

export const App: React.FC = () => {
  const [isForm, setIsForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { token, setToken } = useToken();

  const getUserInfo = () => {
    const info = async () => {
      try {
        const x = await getUserInfoFromServer();
        console.log(x);
      } catch (error) {
        console.log('infoError');
        console.log(error);
      }
    };

    info();
  };

  return (
    <div className="app">
      <Header
        handleSetSignUp={(isSignUp: boolean) => setIsSignUp(isSignUp)}
        handleSetIsForm={(isForm: boolean) => setIsForm(isForm)}
      />

      <main className="app__content">
        {isForm ? (
          isSignUp ? (
            <LoginForm
              handleSetIsForm={(isForm: boolean) => setIsForm(isForm)}
              handleSetSignUp={(isSignUp: boolean) => setIsSignUp(isSignUp)}
              handleSetToken={(token: Token) => setToken(token)}
            />
          ) : (
            <SignUpForm handleSetSignUp={(isSignUp: boolean) => setIsSignUp(isSignUp)} />
          )
        ) : (
          <div className="main-page__info">
            <h1 className="main-page__title">Main header example</h1>
            <p className="main-page__description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              <br />
              Quos ea facilis illo molestiae voluptates iste eius natus soluta quas sint?
            </p>
            <Button
              className="ms-auto"
              variant="primary"
              onClick={() => {
                if (token) {
                  setIsForm(false)
                } else {
                  setIsForm(true);
                  setIsSignUp(true);
                }
              }}
            >
              Choose gifts
            </Button>

            {!!token && (
              <>
                <h3>You are logged in</h3>
                <Button variant="secondary" onClick={() => getUserInfo()}>
                  Get user info
                </Button>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
