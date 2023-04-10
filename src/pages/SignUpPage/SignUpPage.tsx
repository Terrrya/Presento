import React, { useState } from 'react';
import { createUserOnServer } from '../../api/user';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { User } from '../../types/User';
import { Link, useNavigate } from 'react-router-dom';
import { validationSchema } from '../../utils/validationSchemes';

export const SignUpPage: React.FC = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  // const [didFocusFirstName, setDidFocusFirstName] = React.useState(false);
  // const [didFocusLastName, setDidFocusLastName] = React.useState(false);
  // const [didFocusEmail, setDidFocusEmail] = React.useState(false);
  // const [didFocusPassword, setDidFocusPassword] = React.useState(false);
  // const [didFocusRepeatPassword, setDidFocusRepeatPassword] = React.useState(false);

  const navigate = useNavigate();

  const createUser = async (user: User) => {
    try {
      const createdUser = await createUserOnServer(user);
      console.log('createdUser');
      console.log(createdUser);

      navigate('/login');
    } catch (error: any) {
      const errorObject = await error;
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

      // console.log(errorObject);
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
        <div className='form-container'>
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
              // onFocus={() => setDidFocusFirstName(true)}
              // isValid={(didFocusFirstName && values.firstName.trim()) ? !errors.firstName : false}
              // isInvalid={(didFocusFirstName && !touched.firstName) ? !!errors.firstName : false}
            />
            <Form.Control.Feedback type="invalid" className="form__field-feedback">{errors.firstName}</Form.Control.Feedback>
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
              // onFocus={() => setDidFocusLastName(true)}
              // isValid={(didFocusLastName && values.lastName.trim()) ? !errors.lastName : false}
              // isInvalid={(didFocusLastName && !touched.lastName) ? !!errors.lastName : false}
            />
            <Form.Control.Feedback type="invalid"  className="form__field-feedback">{errors.lastName}</Form.Control.Feedback>
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
              // onFocus={() => setDidFocusEmail(true)}
              // isValid={(!!didFocusEmail && values.email.trim().length > 2 ) ? !errors.email : false}
              // isInvalid={(!!didFocusEmail && values.email.trim().length > 2 ) ? !!errors.email : false}
            />
            <Form.Control.Feedback type="invalid"  className="form__field-feedback">
              {errors.email || errorEmail}
            </Form.Control.Feedback>
            {/* <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group className="form__field-container"  controlId="formBasicPassword">
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
              // onFocus={() => setDidFocusPassword(true)}
              // isValid={(!!didFocusPassword && values.password.trim().length > 2 ) ? !errors.password : false}
              // isInvalid={(!!didFocusPassword && values.password.trim().length > 2 ) ? !!errors.password : false}
            />
            <Form.Control.Feedback type="invalid"  className="form__field-feedback">
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
              // onFocus={() => setDidFocusRepeatPassword(true)}
              // isValid={(!!didFocusRepeatPassword && values.repeatPassword.trim().length > 2 ) ? !errors.repeatPassword : false}
              // isInvalid={(!!didFocusRepeatPassword && values.repeatPassword.trim().length > 2 ) ? !!errors.repeatPassword : false}
            />
            <Form.Control.Feedback type="invalid"  className="form__field-feedback">{errors.repeatPassword}</Form.Control.Feedback>
          </Form.Group>

          <Button className="form__submit button" type="submit" variant="custom" onClick={e => e.currentTarget.blur()}>
            Submit form
          </Button>

          <Link to="/login" className="form__link">
            Have an account?
          </Link>
        </Form>
        </div>
      )}
    </Formik>
  );
};
