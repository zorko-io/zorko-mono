import { UserModel } from '../user.model';
import { RolesEnum } from '../../roles';
import { User } from '../user';
import { ObjectSchema } from 'yup';
import { userValidationSchema } from '../user.validation.schema';
import { DefaultUserPasswordEncrypter } from '../default.user.password.encrypter';
import { UserPasswordEncrypter } from '../user.password.encrypter';
import defaultUserModelFactory from '../user.model.factory';

describe('User', () => {
  let userModel: UserModel;
  let userStorage: User;
  let schema: ObjectSchema;
  let encrypter: UserPasswordEncrypter;

  beforeEach(() => {
    userStorage = { email: 'test@email.com', password: '32322332dffsd'};
    schema = userValidationSchema();
    encrypter = new DefaultUserPasswordEncrypter();

    userModel = new UserModel(
      userStorage,
      schema,
      encrypter
    );
  });

  it('creates user with defaults', () => {
      expect(userModel.setId('fdsfsdfsdf').toDTO()).toMatchSnapshot();
  });

  it('updates id', () => {
    expect(userModel.setId('fdsfsdfsdf').toDTO()).toMatchSnapshot();
    expect(userModel.getId()).toEqual('fdsfsdfsdf');
  });

  it('updates email', () => {
    expect(userModel.setEmail('test@email.com').toDTO()).toMatchSnapshot();
    expect(userModel.getEmail()).toEqual('test@email.com');
  });

  it('updates password', () => {
    expect(userModel.setPassword('39393kfkfkf').toDTO()).toMatchSnapshot();
    expect(userModel.getPassword()).toEqual('39393kfkfkf');
  });

  it('updates login', () => {
    expect(userModel.setLogin('joe').toDTO()).toMatchSnapshot();
    expect(userModel.getLogin()).toEqual('joe');
  });

  it('updates hashPassword', () => {
   userModel.setHashPassword('bkbjf848484');

   expect(userModel.getHashPassword()).toEqual('bkbjf848484');
  });

  it('updates roles', () => {
    expect(userModel.setRoles([RolesEnum.User, RolesEnum.Admin]).toDTO()).toMatchSnapshot();
    expect(userModel.getRoles()).toEqual([RolesEnum.User, RolesEnum.Admin]);
    expect(userModel.hasRoles()).toBeTruthy();
  });

  it('encrypts password', async () => {
     const password = userStorage.password;

     await userModel.encryptPassword();

     expect(userModel.getHashPassword()).toEqual(String(password.length));
     expect(userModel.getPassword()).toBeUndefined();
  });

  it('compares passwords with hash', async () => {
    const password = userStorage.password;

    await userModel.encryptPassword();

    const samePasswords = await userModel.comparePassword(password);

    expect(samePasswords).toBeTruthy();
  });

  it('merges two users', () => {
    const prevUser: User = {
      id: '423ffsdfdsf',
      login: 'prevUserLogin',
      email: 'prev@user.com',
      password: '3484fkfjf',
      hashPassword: '$mfslkmfdfmksdfsdfdf',
      roles: [RolesEnum.Admin]
    };
    const nextUser: User = {
      id: '4848jklfl',
      login: 'nextUserLogin',
      email: 'next@user.com',
      password: '4040kjfkffl',
      hashPassword: '$mfdjnfjkdndjkfndfn949304i3408',
      roles: [RolesEnum.User]
    };

    const prevUserModel = defaultUserModelFactory.create(prevUser);
    const nextUserModel = defaultUserModelFactory.create(nextUser);

    prevUserModel.merge(nextUserModel);

    expect(prevUserModel.toDTO()).toEqual({
      id: '423ffsdfdsf',
      login: 'nextUserLogin',
      email: 'next@user.com',
      password: '4040kjfkffl',
      hashPassword: '$mfdjnfjkdndjkfndfn949304i3408',
      roles: [RolesEnum.User]
    });
  });

  it('fails on wrong email', () => {
    userModel = userModel.setEmail('fdfddf');

    try {
      userModel.toDTO()
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  })

});
