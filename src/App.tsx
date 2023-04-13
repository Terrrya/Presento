import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet, useOutletContext } from 'react-router-dom';
import { ErrorType } from './types/ErrorType';
import { SuccessType } from './types/SuccessType';
import { GiftPagination } from './types/GiftPagination';

type ContextTypeGift = {
  gifts: GiftPagination;
  setGifts: React.Dispatch<React.SetStateAction<GiftPagination>>;
};

type ContextTypeMessage = {
  message: ErrorType | SuccessType;
  setMessage: React.Dispatch<React.SetStateAction<ErrorType | SuccessType>>;
};
export const App: React.FC = () => {
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
