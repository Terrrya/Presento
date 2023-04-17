import React, { useState, createContext } from 'react';
import { Token } from '../types/Token';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext<any>({
  user: '',
  login: ''
});

export const AuthContextProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('tokens')) {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
      return jwt_decode(tokens.access);
    }
    return null;
  });

  const login = (userTokens: Token) => {
    localStorage.setItem('tokens', JSON.stringify(userTokens));
    setUser(jwt_decode(userTokens.access));
  };

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>;
};
