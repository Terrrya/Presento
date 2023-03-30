import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
import { loginUserOnServer } from '../../api/user';
import { Login } from '../../types/Login';
import { Token } from '../../types/Token';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please enter email in right format')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

type Props = {
  handleSetIsForm: (isForm: boolean) => void;
  handleSetSignUp: (isSignIn: boolean) => void;
  handleSetToken: (token: Token) => void;
};

export const LoginForm: React.FC<Props> = ({ handleSetSignUp, handleSetToken, handleSetIsForm }) => {
  const createToken = (loginData: Login) => {
    const loginUser = async () => {
      try {
        const token = await loginUserOnServer(loginData);
        console.log(token);
        handleSetToken(token);
      } catch (error) {
        console.log('loginError');
        console.log(error);
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

        handleSetIsForm(false)
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
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && !!errors.email}
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
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button className="form__submit" type="submit">
            Submit form
          </Button>

          <Button variant="link" onClick={() => handleSetSignUp(false)} className="form__link">
            Don&apos;t have an account yet?
          </Button>
        </Form>
      )}
    </Formik>
  );
};
