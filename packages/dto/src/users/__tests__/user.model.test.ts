import { UserModel } from '../user.model';
import { RolesEnum } from '../../roles';
import { User } from '../user';
import { ObjectSchema } from 'yup';
import { userValidationSchema } from '../user.validation.schema';

describe('User', () => {
  let user: UserModel;
  let userStorage: User;
  let schema: ObjectSchema;

  beforeEach(() => {
    userStorage = {email: 'test@email.com', password: '32322332dffsd'};
    schema = userValidationSchema();
    user = new UserModel(userStorage, schema);
  });

  it('creates user with defaults', () => {
      expect(user.setId('fdsfsdfsdf').toDTO()).toMatchSnapshot();
  });

  it('updates id', () => {
    expect(user.setId('fdsfsdfsdf').toDTO()).toMatchSnapshot();
    expect(user.getId()).toEqual('fdsfsdfsdf');
  });

  it('updates email', () => {
    expect(user.setEmail('test@email.com').toDTO()).toMatchSnapshot();
    expect(user.getEmail()).toEqual('test@email.com');
  });

  it('updates password', () => {
    expect(user.setPassword('39393kfkfkf').toDTO()).toMatchSnapshot();
    expect(user.getPassword()).toEqual('39393kfkfkf');
  });

  it('updates hashPassword', () => {
   user.setHashPassword('bkbjf848484');

    expect(user.getHashPassword()).toEqual('bkbjf848484');
    expect(user.getPassword()).toBeUndefined();
  });

  it('updates roles', () => {
    expect(user.setRoles([RolesEnum.User, RolesEnum.Admin]).toDTO()).toMatchSnapshot();
    expect(user.getRoles()).toEqual([RolesEnum.User, RolesEnum.Admin]);
  });

  it('fails on wrong email', () => {
    user = user.setEmail('fdfddf');

    try {
      user.toDTO()
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  })

});
