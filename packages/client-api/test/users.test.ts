import 'reflect-metadata';
import { Users } from './config';
import * as faker from 'faker';
import { RolesEnum } from '@zorko/dto';
import { ApiTestHelper } from './helper/api.test.helper';

describe('Users', () => {

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

    it('/GET users', async () => {
      const users = await Api.User.findMany();

      expect(users && users.length > 0).toBeTruthy();
    });

    it('CRUD - create, read by id and delete', async () => {
      expect.assertions(3);
      userId = await Api.User.createOne(user);
      expect(userId && userId.length > 0).toBeTruthy();

      const actualUser = await Api.User.findOne(userId);
      expect(actualUser).toEqual({
        id: userId,
        email: user.email,
        roles: [RolesEnum.User]
      });

      await Api.User.removeOne(actualUser.id);

      try {
        await Api.User.findOne(actualUser.id);
      } catch (e) {
        expect(e.response.status).toEqual(404);
      }
    });
  });

  // TODO: add tests for not admin
});
