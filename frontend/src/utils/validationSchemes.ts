import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field may not be blank.').max(75, 'Ensure this field has no more than 75 characters.'),
  lastName: yup.string().required('This field may not be blank.').max(75, 'Ensure this field has no more than 75 characters.'),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter a valid email address.')
    .required('This field may not be blank.'),
  password: yup
    .string()
    .min(8, 'Ensure this field has at least 8 characters.')
    .max(128, 'Ensure this field has no more than 128 characters.')
    .matches(/[a-zA-Z]/g, 'Your password must contain at least one letter')
    .required('This field may not be blank.'),
  repeatPassword: yup
    .string()
    .required('This field may not be blank.')
    .oneOf([yup.ref('password')], 'Please enter the same password as above.')
});

export const schemaWithoutPassword = validationSchema.omit(['password', 'repeatPassword']);
