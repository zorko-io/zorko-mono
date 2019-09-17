import { UserValidator } from '../user.validator';
import { User } from '../user';

describe('UserValidator', () => {
  let validator;
  let data: User;
  let actual;

  beforeEach(() => {
    validator = new UserValidator();
  });

  it('passes minimum validation', () => {
    data = { email: 'test@ffkfkf.com'};
    actual = validator.validate({
      email: 'test@ffkfkf.com'
    });

    expect(actual).toEqual(data);
  });

  it('passes max validation', () => {
    data = {
      id: '312123',
      email: 'test@ffkfkf.com',
      roles: [],
      password: '234342423434'
    };
    actual = validator.validate(data);
    expect(actual).toEqual(data);
  });

  it('fails on email', () => {
    actual = validator.validate({
      id: '312123',
      email: 'test!ffkfkf_94949494',
      roles: [],
      password: '234342423434'
    });

    expect(actual).toBeFalsy();
    expect(validator.getErrors()).toMatchSnapshot();
  });

});
