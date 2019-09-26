import * as yup from 'yup';
import { ObjectSchema } from 'yup';

export class RepositoryValidationSchemaFactory {

  constructor() {
    this.create = this.create.bind(this);
  }

  create(): ObjectSchema {
    return  yup.object({
      id: yup.string(),
      name: yup.string().required(),
      description: yup.string().required(),
      owner: yup.string().required()
    })
  }
}

export const defaultRepositoryValidationSchemaFactory = new RepositoryValidationSchemaFactory();

export default defaultRepositoryValidationSchemaFactory;
