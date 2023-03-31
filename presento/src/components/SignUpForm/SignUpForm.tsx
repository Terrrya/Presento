import React from 'react';
import { createUserOnServer } from '../../api/user';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please enter email in right format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters long')
    .matches(/\d/g, 'Your password must contain at least one number')
    .required('Password is required')
    .notOneOf(
      [yup.ref('firstName'), yup.ref('lastName'), yup.ref('lastName')],
      "Your password can't be too similar to your other personal information"
    ),
  repeatPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Please enter the same password as above.')
});

// type Props = {
//   handleSetSignUp: (isSignIn: boolean) => void;
// };

export const SignUpForm: React.FC = () => {
  const createUser = (user: User) => {
    const createNewUser = async () => {
      try {
        // await createUserOnServer(user);
        const createdUser = await createUserOnServer(user);
        console.log(createdUser);
      } catch (error) {
        console.log(error);
      }
    };

    createNewUser();
  };
  return (
    <Formik
      validationSchema={schema}
      onSubmit={({ email, firstName, lastName, password }) => {
        createUser({
          email,
          first_name: firstName,
          last_name: lastName,
          password
        });
      }}
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit} className="form">
          <h3 className="form__title">Registration</h3>

          <Form.Group className="mb-2" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              isValid={touched.firstName && !errors.firstName}
              isInvalid={touched.firstName && !!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              isValid={touched.lastName && !errors.lastName}
              isInvalid={touched.lastName && !!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>

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
              autoComplete="off"
              value={values.password}
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicRepeatPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat password"
              name="repeatPassword"
              autoComplete="off"
              value={values.repeatPassword}
              onChange={handleChange}
              isValid={touched.repeatPassword && !errors.repeatPassword}
              isInvalid={touched.repeatPassword && !!errors.repeatPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.repeatPassword}</Form.Control.Feedback>
          </Form.Group>

          <Button className="form__submit" type="submit">
            Submit form
          </Button>

          <Link to="/login" className="form__link">
            <Button variant="link">Have an account?</Button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};
