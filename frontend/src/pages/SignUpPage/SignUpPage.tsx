import React, { useState } from 'react';
import { createUserOnServer } from '../../api/user';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { User } from '../../types/User';
import { Link, useNavigate } from 'react-router-dom';
import { validationSchema } from '../../utils/validationSchemes';
import { useMessage } from '../../App';
import { ErrorType } from '../../types/ErrorType';
import { Notification } from '../../components/Notification';

export const SignUpPage: React.FC = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();

  const createUser = async (user: User) => {
    try {
      await createUserOnServer(user);
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const axiosObject = await error;

      if (axiosObject.response) {
        const errorObject = axiosObject.response.data;
        switch (Object.keys(errorObject)[0]) {
          case 'email':
            setErrorEmail(Object.values<string>(errorObject)[0]);
            0;
            break;
          case 'password':
            setErrorPassword(Object.values<string>(errorObject)[0]);
            break;
          default:
            break;
        }
      } else {
        setMessage(ErrorType.Registration);
      }
    }
  };
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={({ email, firstName, lastName, password }) => {
        createUser({
          email: email.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
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
        <div className="form-container">
          <Form noValidate onSubmit={handleSubmit} className="form" autoComplete="off">
            <h3 className="form__title">Create a profile</h3>

            <Form.Group className="form__field-container" controlId="formBasicFirstName">
              <Form.Label className="form__field-title">First Name</Form.Label>
              <Form.Control
                className="form__field"
                type="text"
                placeholder="First name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form__field-container" controlId="formBasicLastName">
              <Form.Label className="form__field-title">Last Name</Form.Label>
              <Form.Control
                className="form__field"
                type="text"
                placeholder="Last name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

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
                  setErrorEmail('');
                }}
                isValid={touched.email && !errors.email && !errorEmail}
                isInvalid={(touched.email && !!errors.email) || !!errorEmail}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.email || errorEmail}
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
                  setErrorPassword('');
                }}
                isValid={touched.password && !errors.password && !errorPassword}
                isInvalid={(touched.password && !!errors.password) || !!errorPassword}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.password || errorPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form__field-container" controlId="formBasicRepeatPassword">
              <Form.Label className="form__field-title">Confirm Password</Form.Label>
              <Form.Control
                className="form__field"
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                value={values.repeatPassword}
                onChange={handleChange}
                isValid={touched.repeatPassword && !errors.repeatPassword}
                isInvalid={touched.repeatPassword && !!errors.repeatPassword}
              />
              <Form.Control.Feedback type="invalid" className="form__field-feedback">
                {errors.repeatPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="form__submit button"
              type="submit"
              variant="custom"
              onClick={(e) => e.currentTarget.blur()}
            >
              Register
            </Button>

            <Link to="/login" className="link">
              Have an account?
            </Link>
          </Form>
          {!!message && <Notification />}
        </div>
      )}
    </Formik>
  );
};
