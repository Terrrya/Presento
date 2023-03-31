// import classNames from 'classnames';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import logo from '../..//images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';

// type Props = {

// };

export const Header: React.FC = () => {
  return (
    <header className="app__header header">
      <Stack direction="horizontal" gap={3} className="header">
        <Link to="/" className="header__logo-container">
          <img src={logo} alt="Presento" height="80px" />
        </Link>

        <Link to="sign-up" className="ms-auto">
          <Button variant="primary">Sign Up</Button>
        </Link>

        <Link to="login">
          <Button variant="primary">Sign In</Button>
        </Link>
      </Stack>
    </header>
  );
};
