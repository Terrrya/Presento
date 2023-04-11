import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
import { loginUserOnServer } from '../../api/user';
import { Login } from '../../types/Login';
// import { Token } from '../../types/Token';
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../utils/useToken';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please enter email in right format')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

export const LoginPage: React.FC = () => {
  const { setToken } = useToken();
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const createToken = (loginData: Login) => {
    const loginUser = async () => {
      try {
        const token = await loginUserOnServer(loginData);
        console.log(token);
        setToken(token);
        navigate('/');
        window.location.reload();
      } catch (error: any) {
        const x = await error;
        setErrorMessage(Object.values<string>(x)[0]);
        // console.log(x);
      }
    };

    loginUser();
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={({ email, password }) => {
        createToken({
          email,
          password
        });
      }}
      initialValues={{
        email: '',
        password: ''
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div className="form-container">
          <Form noValidate onSubmit={handleSubmit} className="form" autoComplete="off">
            <h3 className="form__title">Login</h3>

            <Form.Group className="form__field-container" controlId="formBasicEmail">
              <Form.Label className="form__field-title">Email</Form.Label>
              <Form.Control
                className="form__field"
                type="email"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage('');
                }}
                // isValid={touched.email && !errors.email&& !errorMessage}
                isInvalid={(touched.email && !!errors.email) || !!errorMessage}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form__field-container" controlId="formBasicPassword">
              <Form.Label className="form__field-title">Password</Form.Label>
              <Form.Control
                className="form__field"
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMessage('');
                }}
                // isValid={touched.password && !errors.password && !errorMessage}
                isInvalid={(touched.password && !!errors.password) || !!errorMessage}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.password || errorMessage}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="form__submit button"
              type="submit"
              variant="custom"
              onClick={(e) => e.currentTarget.blur()}
            >
              Login
            </Button>

            <Link to="/sign-up" className="form__link">
              Don&apos;t have an account yet?
            </Link>
          </Form>
        </div>
      )}
    </Formik>
  );
};
