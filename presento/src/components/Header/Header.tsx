// import classNames from 'classnames';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import logo from '../..//images/logo.png';
import React from 'react';

type Props = {
  handleSetSignUp: (isSignUp: boolean) => void;
  handleSetIsForm: (isForm: boolean) => void;
};

export const Header: React.FC<Props> = ({ handleSetSignUp, handleSetIsForm }) => {
  return (
    <header className="app__header header">
      <Stack direction="horizontal" gap={3} className="header">
        <a href="/" className="header__logo-container">
          <img src={logo} alt="Presento" height="80px" />
        </a>

        <Button
          className="ms-auto"
          variant="primary"
          onClick={() => {
            handleSetIsForm(true);
            handleSetSignUp(false);
          }}
        >
          Sign Up
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            handleSetIsForm(true);
            handleSetSignUp(true);
          }}
        >
          Sign In
        </Button>
      </Stack>
    </header>
  );
};
