import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';

export const App: React.FC = () => {
  const [isForm, setIsForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="app">
      <Header
        handleSetSignUp={(isSignUp: boolean) => setIsSignUp(isSignUp)}
        handleSetIsForm={(isForm: boolean) => setIsForm(isForm)}
      />

      <main className="app__content">
        {isForm ? (
          isSignUp ? (
            <LoginForm handleSetSignUp={(isSignUp: boolean) => setIsSignUp(isSignUp)} />
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
                setIsForm(true);
                setIsSignUp(true);
              }}
            >
              Choose gifts
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
