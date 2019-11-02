import { ObjectSchema } from 'yup';
import { userValidationSchema } from '@zorko/dto';

export function updateUserParamsValidationSchema(): ObjectSchema {
  return userValidationSchema();
}
