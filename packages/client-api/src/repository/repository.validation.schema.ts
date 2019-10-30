import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export function repositoryValidationSchema (): ObjectSchema {
  return  yup.object({
    id: yup.string(),
    name: yup.string().required(),
    description: yup.string().required(),
    owner: yup.string().required()
  });
}
