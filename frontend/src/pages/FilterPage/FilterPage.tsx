import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useGifts, useMessage } from '../../App';
import { getGiftsFromServer } from '../../api/gifts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  agesInitial,
  gendersInitial,
  occasionsInitial,
  budgetsInitial,
  likesInitial
} from '../../initial_data/filterParams';
import { ErrorType } from '../../types/ErrorType';
import { Notification } from '../../components/Notification';

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
  const { message, setMessage } = useMessage();
  const { setGifts } = useGifts();
  const navigate = useNavigate();

  const getGifts = async (filterParams: URLSearchParams) => {
    try {
      const { data } = await getGiftsFromServer(`${filterParams}`);
      setGifts(data);
      navigate('/gifts');
    } catch (error) {
      setMessage(ErrorType.LoadGift);
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
    <div className="form-container">
      <Form className="form form--filter" onSubmit={handleSubmit}>
        <h3 className="form__title">Choose your options</h3>

        <Form.Group as={Row} className="form__field-container">
          <Form.Label
            as="legend"
            column
            sm={3}
            className="form__field-title form__field-title--large"
          >
            Age
          </Form.Label>
          <Col sm={6} className="filter">
            {agesInitial.map(({ label, id }) => (
              <label className="filter__label" key={id}>
                <input
                  type="radio"
                  className="filter__input"
                  name="age"
                  id={id}
                  value={id}
                  checked={age === id}
                  onChange={(e) => setAge(e.target.value)}
                />
                <div className="filter__design"></div>
                <div className="filter__text">{label}</div>
              </label>
            ))}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="form__field-container">
          <Form.Label
            as="legend"
            column
            sm={3}
            className="form__field-title form__field-title--large"
          >
            Gender
          </Form.Label>
          <Col sm={6} className="filter">
            {gendersInitial.map((sex) => (
              <label className="filter__label" key={sex}>
                <input
                  type="radio"
                  className="filter__input"
                  name="gender"
                  id={sex}
                  value={sex}
                  checked={gender === sex}
                  onChange={(e) => setGender(e.target.value)}
                />
                <div className="filter__design"></div>
                <div className="filter__text">{sex}</div>
              </label>
            ))}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="form__field-container">
          <Form.Label
            as="legend"
            column
            sm={3}
            className="form__field-title form__field-title--large"
          >
            Occasion
          </Form.Label>
          <Col sm={6} className="filter">
            <Form.Select
              aria-label="Occasion"
              className="filter__select"
              value={occasion}
              onChange={(e) => {
                setOccasion(e.target.value);
                e.currentTarget.blur();
              }}
            >
              {occasionsInitial.map((occasion) => (
                <option value={occasion} key={occasion} className="filter__option">
                  {occasion}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="form__field-container">
          <Form.Label
            as="legend"
            column
            sm={3}
            className="form__field-title form__field-title--large"
          >
            Budget
          </Form.Label>
          <Col sm={6} className="filter">
            {budgetsInitial.map(({ label, id }) => (
              <label className="filter__label" key={id}>
                <input
                  type="checkbox"
                  className="filter__input"
                  name="budget"
                  id={id}
                  value={id}
                  onChange={(e) => handleChangeCheckbox(e, budgets, setBudgets)}
                />
                <div className="filter__design filter__design--checkbox"></div>
                <div className="filter__text">{label}</div>
              </label>
            ))}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="form__field-container">
          <Form.Label
            as="legend"
            column
            sm={3}
            className="form__field-title form__field-title--large"
          >
            Likes
          </Form.Label>
          <Col sm={8} className="filter">
            <ToggleButtonGroup
              type="checkbox"
              value={likes}
              className="filter__likes-wrapper"
              ref={group}
            >
              {likesInitial.map((like) => (
                <ToggleButton
                  key={like}
                  type="checkbox"
                  id={like}
                  name={like}
                  value={like}
                  onChange={(e) => handleChangeCheckbox(e, likes, setLikes)}
                  className="filter__like"
                >
                  {like}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Col>
        </Form.Group>

        <Button className="form__submit button" type="submit" variant="custom">
          Go To Result
        </Button>
      </Form>
      {!!message && <Notification />}
    </div>
  );
};
