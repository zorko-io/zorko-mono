import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export class UserValidationSchemaFactory {

  create(): ObjectSchema {
    return  yup.object({
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
      roles: yup.array()
    })
  }
}

const defaultUserValidationSchemaFactory = new UserValidationSchemaFactory();

export default defaultUserValidationSchemaFactory;
