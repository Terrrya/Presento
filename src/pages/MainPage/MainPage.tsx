import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getUserInfoFromServer } from '../../api/user';
import useToken from '../../utils/useToken';

export const MainPage: React.FC = () => {
  const { token } = useToken();

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
    <div className="main-page__info">
      <h1 className="main-page__title">Main header example</h1>
      <p className="main-page__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <br />
        Quos ea facilis illo molestiae voluptates iste eius natus soluta quas sint?
      </p>

      <Link to={token ? '/' : 'login'} className="ms-auto">
        <Button variant="primary">Choose gifts</Button>
      </Link>

      {token ? (
        <>
          <h3>You are logged in</h3>
          <Button variant="secondary" onClick={() => getUserInfo()}>
            Get user info
          </Button>
        </>
      ) : (<h3>You are not logged in</h3>)}
    </div>
  );
};
