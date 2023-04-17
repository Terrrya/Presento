import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const Loader: React.FC = () => (
  <div className="loader">
    <Spinner animation="border" variant="secondary" className="loader__content" />
  </div>
);
