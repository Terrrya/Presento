import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Gift } from './types/Gift';

type ContextType = {
  gifts: Gift[];
  setGifts: React.Dispatch<React.SetStateAction<Gift[]>>;
};

export const App: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);

  return (
    <div className="app">
      <Header />

      <main className="app__content">
        <Outlet context={{ gifts, setGifts }} />
      </main>
      <Footer />
    </div>
  );
};

export const useGifts = () => {
  return useOutletContext<ContextType>();
};
