import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Gift } from './types/Gift';
import { ErrorType } from './types/ErrorType';
import { SuccessType } from './types/SuccessType';

type ContextTypeGift = {
  gifts: Gift[];
  setGifts: React.Dispatch<React.SetStateAction<Gift[]>>;
};

type ContextTypeMessage = {
  message: ErrorType | SuccessType;
  setMessage: React.Dispatch<React.SetStateAction<ErrorType | SuccessType>>;
};
export const App: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
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
