import { useState } from 'react';
import { Token } from '../types/Token';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token') || '0';
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    sessionStorage.setItem('token', JSON.stringify(userToken.token));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  };
}
