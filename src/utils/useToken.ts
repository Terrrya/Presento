import { useState } from 'react';
import { Token } from '../types/Token';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token') || '0';
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    sessionStorage.setItem('token', JSON.stringify(userToken.access));
    setToken(userToken.access);
  };

  return {
    setToken: saveToken,
    token
  };
}
