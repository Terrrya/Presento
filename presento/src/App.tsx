import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';

export const App: React.FC = () => {

  // const [isSignUp, setIsSignUp] = useState(false);


  return (
    <div className="app">
      <Header />

      <main className="app__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
