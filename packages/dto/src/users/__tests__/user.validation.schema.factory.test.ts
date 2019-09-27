import { User } from '../user';
import { userValidationSchema } from '../user.validation.schema';

describe('userValidationSchema', () => {
  let schema;
  let data: User;
  let actual;

  beforeEach(() => {
    schema = userValidationSchema();
  });

  it('passes minimum validation', () => {
    data = { email: 'test@ffkfkf.com', password: '34324' };
    actual = schema.isValidSync(data);

    expect(actual).toBeTruthy();
  });

  it('passes max validation', () => {
    data = {
      id: '312123',
      email: 'test@ffkfkf.com',
      roles: [],
      password: '234342423434'
    };
    actual = schema.isValidSync(data);

    expect(actual).toBeTruthy();
  });

  it('passes `hashPassword` instead of real password', () => {
    data = {
      id: '312123',
      email: 'test@ffkfkf.com',
      roles: [],
      hashPassword: 'nfcjnd93024984930840'
    };

    actual = schema.isValidSync(data);

    schema.validateSync(data);


    expect(actual).toBeTruthy();
  });

  it('fails on email', () => {
    let data = {
      id: '312123',
      email: 'test!ffkfkf_94949494',
      roles: [],
      password: '234342423434'
    };
    actual = schema.isValidSync(data);

    expect(actual).toBeFalsy();

    try {
      schema.validateSync(data);
    } catch (error) {
      expect(error.path).toMatchSnapshot();
      expect(error.message).toMatchSnapshot();
    }
  });

  it('fails on all invalid', () => {
    let data = {
      id: 'fsdfd',
      email: 'test!ffkfkf_94949494',
      roles: {},
      password: {}
    };
    actual = schema.isValidSync(data);

    expect(actual).toBeFalsy();

    try {
      schema.validateSync(data, { abortEarly: false });
    } catch (error) {
      expect(error.inner).toMatchSnapshot();
    }
  });

});
