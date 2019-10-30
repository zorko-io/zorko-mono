import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export function readRepositoryParamsValidationSchema(): ObjectSchema {
  return yup.object({
    id: yup.string().required()
  });
}
