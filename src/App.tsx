import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorType } from './types/ErrorType';
import { SuccessType } from './types/SuccessType';
import { GiftPagination } from './types/GiftPagination';
import jwt_decode from 'jwt-decode';

type ContextTypeGift = {
  gifts: GiftPagination;
  setGifts: React.Dispatch<React.SetStateAction<GiftPagination>>;
};

type ContextTypeMessage = {
  message: ErrorType | SuccessType;
  setMessage: React.Dispatch<React.SetStateAction<ErrorType | SuccessType>>;
};
export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('tokens')) {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
      const decodedJwt: any = jwt_decode(tokens.refresh);

      if (decodedJwt.exp * 1000 <= Date.now()) {
        localStorage.removeItem('tokens');
        navigate('/login');
        window.location.reload();
      }
    }
  }, [location]);

  const [gifts, setGifts] = useState<GiftPagination>({
    count: 0,
    next: '',
    previous: '',
    results: []
  });
  const [message, setMessage] = useState<ErrorType | SuccessType>(ErrorType.None);
  return (
    <div className="app">
      <Header />

      <main className="app__content">
        <Outlet context={{ gifts, setGifts, message, setMessage }} />
      </main>
      <Footer />
    </div>
  );
};

export const useMessage = () => {
  return useOutletContext<ContextTypeMessage>();
};

export const useGifts = () => {
  return useOutletContext<ContextTypeGift>();
};
