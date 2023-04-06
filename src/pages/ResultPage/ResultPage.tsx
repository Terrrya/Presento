import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

export const ResultPage: React.FC = () => {
  return (
    <Row xs={1} md={5} className="g-4">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Col key={idx}>
          <Card style={{ width: '200px' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the
                card&apos;s content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
