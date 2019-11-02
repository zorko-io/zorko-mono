import { User } from '../user';
import { userValidationSchema } from '../user.validation.schema';
import { userFakeGenerator } from '../user.fake.generator';

describe('userValidationSchema', () => {
  let schema;
  let data: User;

  beforeEach(() => {
    schema = userValidationSchema();
  });

  it('passes minimum validation with `email`', () => {
    data = userFakeGenerator.getMinimalRandomValidUser();
    expect(schema.isValidSync(data)).toBeTruthy();
  });

  it('passes max validation', () => {
    data = userFakeGenerator.getRandomValidUser();
    expect(schema.isValidSync(data)).toBeTruthy();
  });

  it('passes `hashPassword` instead of real password', () => {
    data = userFakeGenerator.getRandomValidUserOnlyWithHashPassword();
    expect(schema.isValidSync(data)).toBeTruthy();
  });

  it('fails with wrong email', () => {
    data = userFakeGenerator.getRandomUserWithWrongEmail();
    expect(() => {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

  it('fails without login but with `hashPassword`', () => {
    data = userFakeGenerator.getRandomUserWithoutLogin();
    expect(() => {
      schema.validateSync(data);
    }).toThrowErrorMatchingSnapshot();
  });

});
