import React from 'react';
import footerLogo from '../../images/footerLogo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="app__footer footer">
      <div className="container container--hf">
        <div className="footer__content">
          <div className="footer__left-container"></div>

          <div className="footer__img-continer">
            <img src={footerLogo} className="footer__img" alt="Presento" />
            Copyright © 2023.
          </div>

          <div className="footer__link-continer">
            Our Team:
            <a href="https://github.com/Terrrya" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github footer__link footer__link--1"></i>
            </a>
            <a href="https://github.com/OksanaBaloh" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github footer__link footer__link--2"></i>
            </a>
            <a href="https://github.com/DariaRykhliuk" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github footer__link footer__link--3"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
