import { UserValidationRules } from './user.validation.rules';
import { User } from './user';
import * as LIVR from 'livr';

export class UserValidator {
  private rules: object;
  private validator: LIVR.Validator;

  constructor(rules?) {
    this.rules = !rules ? UserValidationRules: rules;
    this.validator =  new LIVR.Validator(this.rules).prepare();
  }

  validate(user: User) {
    return this.validator.validate(user);
  }

  getErrors() {
    return this.validator.getErrors();
  }
}
