import React, { useEffect, useState } from 'react';
import { updateDataOnServer, getUserDataFromServer } from '../../api/user';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { schemaWithoutPassword } from '../../utils/validationSchemes';
import { Formik } from 'formik';
import { UserData } from '../../types/UserData';
import { checkObjectEqual } from '../../helpers/checkObjectEqual';
import { Loader } from '../../components/Loader';
import { useMessage } from '../../App';
import { SuccessType } from '../../types/SuccessType';
import { ErrorType } from '../../types/ErrorType';
import { Notification } from '../../components/Notification';

export const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>();
  const { message, setMessage } = useMessage();
  const getUserData = async () => {
    try {
      const { email, first_name, last_name } = await getUserDataFromServer();
      setUserData({
        email,
        first_name,
        last_name
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateUserData = async (data: UserData) => {
    if (checkObjectEqual(userData, data)) {
      return;
    }

    try {
      const updatedData = await updateDataOnServer(data);
      console.log(updatedData);
      setMessage(SuccessType.ChangeData);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setMessage(ErrorType.ChangeData);
    }
  };

  if (userData) {
    return (
      <Formik
        validationSchema={schemaWithoutPassword}
        onSubmit={({ email, firstName, lastName }) => {
          console.log({
            email: email,
            first_name: firstName,
            last_name: lastName
          });
          updateUserData({
            email: email,
            first_name: firstName,
            last_name: lastName
          });
        }}
        initialValues={{
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <div className="form-container">
            <Form noValidate onSubmit={handleSubmit} className="form" autoComplete="off">
              <h3 className="form__title">Your Personal Data</h3>

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
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid" className="form__field-feedback">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="form__submit button"
                type="submit"
                variant="custom"
                onClick={(e) => e.currentTarget.blur()}
              >
                Save changes
              </Button>
            </Form>
            {!!message && <Notification />}
          </div>
        )}
      </Formik>
    );
  } else {
    return (
      <div className="form-container">
        <div className="form">
          <Loader />
        </div>
      </div>
    );
  }
};
