import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { Formik } from 'formik';
import { loginUserOnServer } from '../../api/user';
import { Login } from '../../types/Login';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { Notification } from '../../components/Notification';
import { useMessage } from '../../App';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please enter email in right format')
    .required('Email is required'),
  password: yup.string().required('Password is required')
});

export const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const { message } = useMessage();
  const navigate = useNavigate();

  const createToken = async (loginData: Login) => {
    try {
      const { data } = await loginUserOnServer(loginData);
      login(data);
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      const axiosObject = await error;
      const errorObject = axiosObject.response.data;
      setErrorMessage(Object.values<string>(errorObject)[0]);
    }
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

            <Link to="/sign-up" className="link">
              Don&apos;t have an account yet?
            </Link>
          </Form>
          {!!message && <Notification />}
        </div>
      )}
    </Formik>
  );
};
