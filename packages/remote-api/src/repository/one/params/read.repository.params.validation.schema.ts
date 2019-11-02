import { ObjectSchema } from 'yup';
import { identityParamsValidationSchema } from '../../../utils/identity.params.validation.schema';

export function readRepositoryParamsValidationSchema(): ObjectSchema {
  return identityParamsValidationSchema()
}
