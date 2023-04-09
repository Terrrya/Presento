import React, { useEffect, useState } from 'react';
import { updateDataOnServer, getUserDataFromServer } from '../../api/user';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { schemaWithoutPassword } from '../../utils/validationSchemes';
import { Formik } from 'formik';
// import { Link } from 'react-router-dom';
import { UserData } from '../../types/UserData';
import { checkObjectEqual } from '../../helpers/checkObjectEqual';

export const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>();

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
      console.log('equal');

      return;
    }

    try {
      const updatedData = await updateDataOnServer(data);
      console.log('updatedData');
      console.log(updatedData);
    } catch (error) {
      console.log(error);
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
          <Form noValidate onSubmit={handleSubmit} className="form">
            <h3 className="form__title">Your Personal Data</h3>

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

            <Button className="form__submit" type="submit">
              Save changes
            </Button>
          </Form>
        )}
      </Formik>
    );
  } else {
    return <h3>Wait...</h3>;
  }
};