// import classNames from 'classnames';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import logo from '../..//images/logo.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useToken from '../../utils/useToken';
import { getUserDataFromServer } from '../../api/user';

export const Header: React.FC = () => {
  const { token } = useToken();
  const [userName, setUserName] = useState('');

  const getUserData = async () => {
    try {
      const { first_name } = await getUserDataFromServer();
      setUserName(first_name)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className="app__header header">
      <Stack direction="horizontal" gap={3} className="header">
        <Link to="/" className="header__logo-container">
          <img src={logo} alt="Presento" height="80px" />
        </Link>

        {token ? (
          <>
            <h4 className="ms-auto" style={{'color': 'white', 'marginRight': '20px'}}>
              {`Hello, ${userName}`}
            </h4>
            <Link to="profile">
              <Button variant="primary">Profile</Button>
            </Link>
            <Link to="/">
              <Button variant="primary" onClick={() => {
                sessionStorage.removeItem('token');
                window.location.reload();
              }}>
                Log Out
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="sign-up" className="ms-auto">
              <Button variant="primary">Sign Up</Button>
            </Link>
            <Link to="login">
              <Button variant="primary">Sign In</Button>
            </Link>
          </>
        )}

      </Stack>
    </header>
  );
};
