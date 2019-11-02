import { ObjectSchema } from 'yup';
import { identityParamsValidationSchema } from '../../../utils';

export function readRepositoryParamsValidationSchema(): ObjectSchema {
  return identityParamsValidationSchema()
}
