import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getGiftsFromServer } from '../../api/gifts';
import { useGifts, useMessage } from '../../App';
import { Loader } from '../../components/Loader';
import { Notification } from '../../components/Notification';
import { ErrorType } from '../../types/ErrorType';

export const ResultPage: React.FC = () => {
  const { gifts, setGifts } = useGifts();
  const { message, setMessage } = useMessage();
  const { count, next, previous, results } = gifts;
  const emptyGifts = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };

  const getGifts = async (str: string) => {
    try {
      const { data } = await getGiftsFromServer(str.split('?')[1]);
      setGifts(data);
    } catch (error) {
      setMessage(ErrorType.LoadGift);
    }
  };
  return (
    <div className="container catalog">
      <h2 className="catalog__title">Here You Go!</h2>
      <div className="catalog__flex">
        {count > 4 && (
          <Button
            variant="outline-secondary"
            onClick={() => getGifts(previous)}
            className="catalog__arrow"
            disabled={!previous}
          >
            <i className="fa-solid fa-angle-left"></i>
          </Button>
        )}
        <div className="catalog__container">
          {results.length ? (
            results.map(({ id, title, price, description, image }) => (
              <Card key={id} className="catalog__card">
                <Card.Img className="catalog__card-image" variant="top" src={image} alt={title} />
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
            ))
          ) : (
            <Loader />
          )}
        </div>
        {count > 4 && (
          <Button
            variant="outline-secondary"
            onClick={() => getGifts(next)}
            className="catalog__arrow"
            disabled={!next}
          >
            <i className="fa-solid fa-angle-right"></i>
          </Button>
        )}
      </div>

      <div className="catalog__button-container">
        <Link to="/filter" className="button catalog__button" onClick={() => setGifts(emptyGifts)}>
          Try again
        </Link>
      </div>

      {!!message && <Notification />}
    </div>
  );
};
