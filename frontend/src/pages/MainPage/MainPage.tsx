import React, { useContext } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import slider1 from '../../images/slider1.jpg';
import slider2 from '../../images/slider2.jpg';
import slider3 from '../../images/slider3.jpg';
import classNames from 'classnames';
import { AuthContext } from '../../utils/AuthContext';
export const MainPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="main-page">
      <div className="container">
        <div className="main-page__content">
          <div>
            <h1 className="main-page__title">
              Struggling to find the gift for loved ones?
              <br />
              <span className="main-page__title--italic">You are in the right place!</span>
            </h1>
            <div className="main-page__info">
              <p className="main-page__description">
                Presento is a service that helps people to find the perfect gift for their loved
                ones. It has a variety of options for any age, gender, occasion and even budget.
              </p>

              <Link to={user ? '/filter' : '/login'} className=" main-page__button button">
                <i
                  className={classNames(
                    'button__icon',
                    'fa-solid',
                    { 'fa-right-to-bracket': !user },
                    { 'fa-gift': !!user }
                  )}
                ></i>
                Choose gifts
              </Link>
            </div>
          </div>

          <div className="main-page__slider slider">
            <Carousel className="slider__content">
              <Carousel.Item className="slider__img-container">
                <img className="d-block w-100 slider__image" src={slider1} alt="First slide" />
                <Carousel.Caption className="slider__text">
                  <h3>Many varieties of gifts</h3>
                  <p>You can choose ocassion, budget and other parametrs</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="slider__img-container">
                <img className="d-block w-100 slider__image" src={slider2} alt="Second slide" />

                <Carousel.Caption className="slider__text">
                  <h3>Many varieties of gifts</h3>
                  <p>You can choose ocassion, budget and other parametrs</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="slider__img-container">
                <img className="d-block w-100 slider__image" src={slider3} alt="Third slide" />

                <Carousel.Caption className="slider__text">
                  <h3>Many varieties of gifts</h3>
                  <p>You can choose ocassion, budget and other parametrs</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
