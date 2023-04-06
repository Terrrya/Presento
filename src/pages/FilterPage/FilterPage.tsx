import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useGifts } from '../../App';
import { getGiftsFromServer } from '../../api/gifts';
import { useSearchParams } from 'react-router-dom';

const agesInitial = [
  { label: 'Under 16 y.o.', id: '0-16' },
  { label: '17-25 y.o.', id: '17-25' },
  { label: '26-45 y.o.', id: '26-45' },
  { label: '46+ y.o.', id: '46-100' }
];
const budgetsInitial = [
  { label: '$', id: '0-99' },
  { label: '$$', id: '100-500' },
  { label: '$$$', id: '500-5000' }
];

const gendersInitial = ['Male', 'Female', 'Both'];

const likesInitial = ['Sport', 'Beauty', 'Cars', 'Fashion', 'IT', 'Music'];

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


  const getGifts = async (filterParams: URLSearchParams) => {
    try {
      const gifts = await getGiftsFromServer('?' + filterParams);
      console.log('gifts');
      console.log(gifts);
      setGifts(gifts);
    } catch (error) {
      console.log(error);
    }
  }

  const updateSearchParams = (params: {[key: string]: string[] | string }) => {
    Object.entries(params).forEach(([key, value]) => {
      if (!value.length ) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);
        
        searchParams.append(key, value.join());
      } else {
        searchParams.set(key, value);
      }
    })

    setSearchParams(searchParams);
  }

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
              <option value=""></option>
              <option value="Birthday">Birthday</option>
              <option value="New Year">New Year</option>
              <option value="Valentines Day">Valentine&apos;s Day</option>
              <option value="Graduation">Graduation</option>
              <option value="Wedding">Wedding</option>
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
