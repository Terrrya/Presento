import logo from '../../images/logo.png';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDataFromServer } from '../../api/user';
import { AuthContext } from '../../utils/AuthContext';

export const Header: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const { data } = await getUserDataFromServer();
      setUserName(data.first_name);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem('tokens');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="app__header header">
      <div className="container container--hf">
        <div className="header__content">
          <Link to="/" className="header__logo-container">
            <img src={logo} alt="Presento" className="header__logo" />
          </Link>

          <div className="header__btn-container">
            <p className="header__greeting" style={{ color: 'black' }}>
              {`Hello, ${user ? userName : 'Stranger'}!`}
            </p>
            {user ? (
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
