import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export function identityParamsValidationSchema(): ObjectSchema {
  return yup.object({
    id: yup.string().required()
  });
}
