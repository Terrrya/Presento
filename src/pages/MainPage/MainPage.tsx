import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserDataFromServer } from '../../api/user';
import useToken from '../../utils/useToken';
import gift11 from '../../images/gift11.jpg';
import gift12 from '../../images/gift12.jpg';
import gift13 from '../../images/gift13.jpg';
import classNames from 'classnames';
export const MainPage: React.FC = () => {
  const { token } = useToken();

  const getUserData = async () => {
    try {
      const x = await getUserDataFromServer();
      console.log(x);
    } catch (error) {
      console.log('infoError');
      console.log(error);
    }
  };
  return (
    <div className="main-page">
      <div className="container">
        <div className="main-page__content">
          <h1 className="main-page__title">
            Struggling to find the gift for loved ones?
            <br />
            <span className="main-page__title--italic">You are in the right place!</span>
          </h1>
          <div className="main-page__info">
            <p className="main-page__description">
              Presento is a service that helps people to find the perfect gift for their loved ones.
              It has a variety of options for any age, gender, occasion and even budget.
            </p>

            <Link to={token ? 'filter' : 'login'} className=" main-page__button button">
              <i
                className={classNames(
                  'button__icon',
                  'fa-solid',
                  { 'fa-right-to-bracket': !token },
                  { 'fa-gift': !!token }
                )}
              ></i>
              Choose gifts
            </Link>
          </div>

          <div className="main-page__slider slider">
            <Carousel className="slider__content">
              <Carousel.Item className="slider__img-container">
                <img className="d-block w-100 slider__image" src={gift11} alt="First slide" />
                <Carousel.Caption className="slider__text">
                  <h3>Many varieties of gifts</h3>
                  <p>You can choose ocassion, budget and other parametrs</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="slider__img-container">
                <img className="d-block w-100 slider__image" src={gift12} alt="Second slide" />

                <Carousel.Caption className="slider__text">
                  <h3>Many varieties of gifts</h3>
                  <p>You can choose ocassion, budget and other parametrs</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className="slider__img-container">
                <img className="d-block w-100 slider__image" src={gift13} alt="Third slide" />

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
