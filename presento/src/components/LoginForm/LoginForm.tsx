import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
});

type Props = {
  handleSetSignUp: (isSignIn: boolean) => void;
};

export const LoginForm: React.FC<Props> = ({ handleSetSignUp }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
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
