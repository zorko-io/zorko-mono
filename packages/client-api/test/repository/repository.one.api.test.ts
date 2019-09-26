import 'reflect-metadata';
import { ApiTestHelper } from '../helper/api.test.helper';
import { Users } from '../config';
import { repositoryFakeGenerator } from '@zorko/dto';

describe('RepositoryOneApi', () => {
   let Api;

  beforeEach(async () => {
    Api = await ApiTestHelper.loginAs(Users.JoeUser);
  });

  it('CRUD - repository (skeleton)', async () => {
    const result = await Api.Repository.createOne(
      repositoryFakeGenerator.getOneRandomValidRepository()
    );

    expect(result).toBeTruthy();
  });

});
