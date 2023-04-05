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
        setErrorMessage(Object.values<string>(x)[0])
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
        <Form noValidate onSubmit={handleSubmit} className="form">
          <h3 className="form__title">Login</h3>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={(e) => {handleChange(e); setErrorMessage('')}}
              autoComplete="email"
              // isValid={touched.email && !errors.email&& !errorMessage} 
              isInvalid={touched.email && !!errors.email || !!errorMessage}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={(e) => {handleChange(e); setErrorMessage('')}}
              autoComplete="current-password"
              // isValid={touched.password && !errors.password && !errorMessage}
              isInvalid={touched.password && !!errors.password || !!errorMessage}
            />
            <Form.Control.Feedback type="invalid">{errors.password || errorMessage}</Form.Control.Feedback>
          </Form.Group>

          <Button className="form__submit" type="submit">
            Submit form
          </Button>

          <Link to="/sign-up" className="form__link">
            <Button variant="link">Don&apos;t have an account yet?</Button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};
