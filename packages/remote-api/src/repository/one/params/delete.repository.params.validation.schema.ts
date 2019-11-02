import { ObjectSchema } from 'yup';
import { identityParamsValidationSchema } from '../../../utils';

export function deleteRepositoryParamsValidationSchema(): ObjectSchema {
  return identityParamsValidationSchema()
}
