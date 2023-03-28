// import classNames from 'classnames';
import React from 'react';
// import icon from '../..//images/icon.png';
import icon1 from '../..//images/icon1.png';

export const Footer: React.FC = () => {
  return (
    <footer className="app__footer footer">
      <div className="footer__left-container"></div>

      <div className="footer__img-continer">
        <img className="footer__img" src={icon1} alt="Presento" width="100px" />
        Copyright © 2023.
      </div>

      <div className="footer__right-container">
        <div className="footer__link-continer">
          Our Team:
          <a href="https://github.com/Terrrya" target='_blank' rel="noreferrer">
            <i className="fa-brands fa-github footer__link footer__link--1"></i>
          </a>
          <a href="https://github.com/OksanaBaloh" target='_blank' rel="noreferrer">
            <i className="fa-brands fa-github footer__link footer__link--2"></i>
          </a>
          <a href="https://github.com/DariaRykhliuk" target='_blank' rel="noreferrer">
            <i className="fa-brands fa-github footer__link footer__link--3"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};
