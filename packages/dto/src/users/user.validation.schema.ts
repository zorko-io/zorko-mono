import * as yup from 'yup';

export const userValidationSchema = yup.object({
  id:  yup.string(),
  password: yup.string(),
  email: yup.string().email().required(),
  roles: yup.array()
});

export type UserType = yup.InferType<typeof userValidationSchema>;
