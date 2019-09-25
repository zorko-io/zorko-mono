import 'reflect-metadata';
import { ApiTestHelper } from '../helper/api.test.helper';
import { Users } from '../config';

describe('RepositoryManyApi', () => {
   let Api;

  beforeEach(async () => {
    Api = await ApiTestHelper.loginAs(Users.JoeUser);
  });

  it('searches for prepared repositories (skeleton)', async () => {
    // TODO: create repos here
    const result = await Api.Repositories.findMany(2434234);
    expect(result).toBeUndefined();
  });

});
