import * as yup from 'yup';
import { ObjectSchema } from 'yup';

const USER_NAME_REGEXP = /^\S*$/i;

export function userValidationSchema(): ObjectSchema {
  return yup.object({
    id: yup.string(),
    password: yup.string()
      .when('hashPassword', {
        is: (val) => {
          return val && val.length
        },
        then: yup.string().notRequired(),
        otherwise: yup.string().required()
      }),
    hashPassword: yup.string(),
    email: yup.string().email().required(),
    login: yup.string()
      .when('hashPassword', {
        is: (val) => {
          return val && val.length
        },
        then: yup.string().required(),
        otherwise: yup.string().notRequired()
      }).
      matches(USER_NAME_REGEXP),
    roles: yup.array()
  })
}
