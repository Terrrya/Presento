import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useGifts } from '../../App';
import { getGiftsFromServer } from '../../api/gifts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  agesInitial,
  gendersInitial,
  occasionsInitial,
  budgetsInitial,
  likesInitial
} from '../../initial_data/filterParams';

export const FilterPage: React.FC = () => {
  const group = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (group.current) {
      group.current.classList.remove('btn-group');
    }
  }, []);

  const [age, setAge] = useState(agesInitial[0].id);
  const [gender, setGender] = useState(gendersInitial[0]);
  const [occasion, setOccasion] = useState('');
  const [budgets, setBudgets] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const { setGifts } = useGifts();

  const navigate = useNavigate();

  const getGifts = async (filterParams: URLSearchParams) => {
    try {
      const gifts = await getGiftsFromServer('?' + filterParams);
      setGifts(gifts);
      navigate('/gifts');
    } catch (error) {
      console.log(error);
    }
  };

  const updateSearchParams = (params: { [key: string]: string[] | string }) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value.length) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        searchParams.append(key, value.join());
      } else {
        searchParams.set(key, value);
      }
    });

    setSearchParams(searchParams);
  };

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    options: string[],
    setOptions: (value: React.SetStateAction<string[]>) => void
  ) => {
    const { value, checked } = e.target;

    if (checked) {
      setOptions([...options, value]);
    } else {
      setOptions(options.filter((option) => option !== value));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParams({ age, gender, occasion, budgets, likes });
    getGifts(searchParams);
  };

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
                checked={age === id}
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
            {gendersInitial.map((sex) => (
              <Form.Check
                key={sex}
                type="radio"
                label={sex}
                name="gender"
                id={sex}
                value={sex}
                checked={gender === sex}
                onChange={(e) => setGender(e.target.value)}
              />
            ))}
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Occasion
          </Form.Label>
          <Col sm={5}>
            <Form.Select
              aria-label="Occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              {occasionsInitial.map((occasion) => (
                <option value={occasion} key={occasion}>
                  {occasion}
                </option>
              ))}
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
                type="checkbox"
                label={label}
                name="budget"
                id={id}
                value={id}
                onChange={(e) => handleChangeCheckbox(e, budgets, setBudgets)}
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
                  id={like}
                  name={like}
                  value={like}
                  onChange={(e) => handleChangeCheckbox(e, likes, setLikes)}
                  className="like-item"
                >
                  {like}
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
