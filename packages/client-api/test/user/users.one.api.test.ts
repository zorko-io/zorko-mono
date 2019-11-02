import 'reflect-metadata';
import { Users } from '../config';
import * as faker from 'faker';
import { RolesEnum } from '@zorko/dto';
import { ApiTestHelper } from '../helper/api.test.helper';

describe('UserOneApi', () => {

  describe('Admin', () => {
    let user;
    let userId;
    let Api;

    beforeAll(async () => {
      Api = ApiTestHelper.create();
      Api = await Api.loginAs(Users.AdminUser);

      user = {
         email: faker.internet.email(),
         password: faker.internet.password()
      };
    });

    it('CRUD - create, read by id and delete', async () => {
      expect.assertions(5);
      userId = await Api.User.createOne(user);
      expect(userId && userId.length > 0).toBeTruthy();

      let actualUser = await Api.User.findOne({
        id: userId
      });

      expect(actualUser).toMatchObject({
        id: userId,
        email: user.email,
        roles: [RolesEnum.User]
      });

      expect(actualUser.login.length).toBeTruthy();

      const nextUserEmail = faker.internet.email();
      const nextRoles = [RolesEnum.Admin];
      const nextPassword = faker.internet.password();
      const nextLogin = faker.random.words(1);

      const nextUserPayload = {
        ...actualUser,
        email: nextUserEmail,
        roles: nextRoles,
        password: nextPassword,
        login: nextLogin
      };


      // TODO: issue with taking login from email if 'login' not sent...need to review
      // maybe it make sense to fix it or establish strict validation of update
      const nextUser = await Api.User.updateOne({
        id: actualUser.id,
        login: nextLogin,
        email: nextUserEmail,
        roles: nextRoles,
        password: nextPassword
      });

      delete nextUserPayload.password;

      expect(nextUser).toMatchObject(nextUserPayload);


      await Api.User.removeOne({
        id: actualUser.id
      });

      try {
        await Api.User.findOne({
          id: actualUser.id
        });
      } catch (e) {
        expect(e.response.status).toEqual(404);
      }
    });

    it('fails user creation with wrong email', async () => {
      expect.assertions(1);
      try {
        await Api.User.createOne({
          email: 'fdfdfdff',
          password: ''
        });
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });

    it('fails user creation with wrong password', async () => {
      expect.assertions(1);
      try {
        await Api.User.createOne({
          email: 'test@email.com',
          password: ''
        });
      } catch (error) {
        expect(error).toMatchSnapshot();
      }
    });
  });
});
