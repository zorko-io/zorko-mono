import 'reflect-metadata';
import { ApiTestHelper } from '../helper/api.test.helper';
import { Users } from '../config';
import { repositoryFakeGenerator } from '@zorko/dto';

describe('RepositoryOneApi', () => {
   let Api;
   let actual;

  beforeEach(async () => {
    Api = await ApiTestHelper.loginAs(Users.JoeUser);
  });

  it('fails on read with wrong parameters', async () => {
      expect(() => {
          Api.Repository.findOne({ zzz: 'fddfdf'})
      }).toThrowErrorMatchingSnapshot()
  });

  it('CRUD - repository (skeleton)', async () => {
    let initResource = repositoryFakeGenerator.getOneRandomValidRepository({
      skipId: true
    });
    let resourceId = await Api.Repository.createOne(initResource);

    expect(resourceId).toBeTruthy();

    actual = await Api.Repository.findOne({
      id: resourceId
    });

    expect(actual).toEqual({
      ...initResource,
      id: resourceId
    });
  });

});
