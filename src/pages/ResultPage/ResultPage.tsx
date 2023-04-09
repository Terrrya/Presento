import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGifts } from '../../App';

export const ResultPage: React.FC = () => {
  const { gifts } = useGifts();
  return (
    <div className="gifts__big-container">
      <h2 style={{ textAlign: 'center' }}>Here You Go!</h2>
      <div className="gifts__container">
        <Row xs={1} md={5} className="g-4">
          {gifts.map(({ id, title, price, description, image }) => (
            <Col key={id}>
              <Card style={{ width: '300px' }}>
                <Card.Img
                  variant="top"
                  src={
                    'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                  }
                  alt={title}
                />
                {/* <Card.Img variant="top" src={image} alt={title}/> */}
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle className="mt-2 mb-1 text-muted">{`$${price}`}</Card.Subtitle>
                  <Card.Text>
                    {/* {description + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'} */}
                    {description}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Link to="/filter">
        <Button variant="danger">Try again</Button>
      </Link>
    </div>
  );
};
