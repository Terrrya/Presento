import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { capitalize } from '../../helpers/capitalize';

const agesInitial = [
  { label: 'Under 16 y.o.', id: 'ageLessThan16' },
  { label: '16-25 y.o.', id: 'age16To25' },
  { label: '26-45 y.o.', id: 'age26To45' },
  { label: '46+ y.o.', id: 'ageMoreThan46' }
];
const budgetsInitial = [
  { label: '$', id: 'budgetLow' },
  { label: '$$', id: 'budgetMedium' },
  { label: '$$$', id: 'budgetHigh' }
];

const likesInitial = ['sport', 'beauty', 'cars', 'fashion', 'it', 'music'];

export const FilterPage: React.FC = () => {
  const group = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (group.current) {
      group.current.classList.remove('btn-group');
    }
  }, []);

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [likes, setLikes] = useState<string[]>([]);

  const handleSetLikes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setLikes([...likes, value]);
    } else {
      setLikes(likes.filter((like) => like !== value));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(age, gender, occasion, budget, likes);
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Age
          </Form.Label>
          <Col sm={10}>
            {agesInitial.map(({ label, id }) => (
              <Form.Check
                key={id}
                type="radio"
                label={label}
                name="age"
                id={id}
                value={id}
                onChange={(e) => setAge(e.target.value)}
              />
            ))}
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              id="male"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              id="female"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Occasion
          </Form.Label>
          <Col sm={5}>
            <Form.Select aria-label="Occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              <option value=""></option>
              <option value="birthday">Birthday</option>
              <option value="newYear">New Year</option>
              <option value="valentine'sDay">Valentine&apos;s Day</option>
              <option value="graduation">Graduation</option>
              <option value="wedding">Wedding</option>
            </Form.Select>
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Budget
          </Form.Label>
          <Col sm={10}>
            {budgetsInitial.map(({ label, id }) => (
              <Form.Check
                key={id}
                type="radio"
                label={label}
                name="budget"
                id={id}
                value={id}
                onChange={(e) => setBudget(e.target.value)}
              />
            ))}
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Likes
          </Form.Label>
          <Col sm={10}>
            <ToggleButtonGroup type="checkbox" value={likes} className="like-wrapper" ref={group}>
              {likesInitial.map((like) => (
                <ToggleButton
                  key={like}
                  type="checkbox"
                  id={`like-${like}`}
                  name={like}
                  value={like}
                  onChange={handleSetLikes}
                  className="like-item"
                >
                  {like.toUpperCase()}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Col>
        </Form.Group>
      </fieldset>

      <Button type="submit" variant="danger">
          Go To Result
        </Button>
    </Form>
  );
};
