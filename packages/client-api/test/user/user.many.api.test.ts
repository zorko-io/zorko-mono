import 'reflect-metadata';
import { Users } from '../config';
import { ApiTestHelper } from '../helper/api.test.helper';

describe('UserManyApi', () => {

  describe('Admin', () => {
    let Api;

    beforeAll(async () => {
      Api = await ApiTestHelper.loginAs(Users.AdminUser);
    });

    it('/GET users', async () => {
      const users = await Api.Users.findMany();

      expect(users && users.items.length > 0).toBeTruthy();
    });

  });
});
