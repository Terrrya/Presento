import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGifts } from '../../App';

export const ResultPage: React.FC = () => {
  const { gifts } = useGifts();
  return (
    <div className="container catalog">
      <h2 className="catalog__title">Here You Go!</h2>
      <div className="catalog__container">
        {gifts.map(({ id, title, price, description, image }) => (
          <Card key={id} className="catalog__card">
            <Card.Img
              className="catalog__card-image"
              variant="top"
              src={
                'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
              }
              alt={title}
            />
            {/* <Card.Img variant="top" src={image} alt={title}/> */}
            <Card.Body>
              <Card.Title className="catalog__card-title" title={title}>
                {title}
              </Card.Title>
              <Card.Subtitle className="catalog__card-price mt-3 mb-2">{`$${price}`}</Card.Subtitle>
              <Card.Text className="catalog__card-description">{description}</Card.Text>
              <a
                href="https://rozetka.com.ua/ua/"
                className="catalog__card-link link"
                target="_blank"
                rel="noreferrer"
              >
                Go to the shop
              </a>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Link to="/filter" className="button catalog__button">
        Try again
      </Link>
    </div>
  );
};
