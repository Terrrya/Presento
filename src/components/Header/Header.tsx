// import classNames from 'classnames';
import newLogo from '../../images/newLogo.png';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../utils/useToken';
import { getUserDataFromServer } from '../../api/user';

export const Header: React.FC = () => {
  const { token } = useToken();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const { first_name } = await getUserDataFromServer();
      setUserName(first_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, []);

  const logOut = () => {
    sessionStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="app__header header">
      <div className="container container--hf">
        <div className="header__content">
          <Link to="/" className="header__logo-container">
            <img src={newLogo} alt="Presento" className="header__logo" />
          </Link>

          <div className="header__btn-container">
            <p className="header__greeting" style={{ color: 'black' }}>
              {`Hello, ${token ? userName : 'Stranger'}!`}
            </p>
            {token ? (
              <>
                <Link to="/profile" className="button header__button">
                  Profile
                </Link>
                <Link to="/" className="button header__button" onClick={logOut}>
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign-up" className="button header__button">
                  Sign Up
                </Link>
                <Link to="/login" className="button header__button">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
