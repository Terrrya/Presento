import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').max(75, 'Max length - 75 symbols'),
  lastName: yup.string().required('Last name is required').max(75, 'Max length - 75 symbols'),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please enter email in right format')
    .required('Email is required')
    .max(254, 'Max length - 254 symbols'),
  password: yup
    .string()
    .min(8, 'Your password must be at least 8 characters long')
    .max(128, 'Max length - 128 symbols')
    .matches(/[a-zA-Z]/g, 'Your password must contain at least one letter')
    .required('Password is required')
    .notOneOf(
      [yup.ref('firstName'), yup.ref('lastName'), yup.ref('email')],
      "Your password can't be too similar to your other personal information"
    ),
  repeatPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Please enter the same password as above.')
});

export const schemaWithoutPassword = validationSchema.omit(['password', 'repeatPassword'])
