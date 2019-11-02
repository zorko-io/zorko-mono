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
        // TODO: why ts doesnt show error here ?
          Api.Repository.findOne({ zzz: 'fddfdf'})
      }).toThrowErrorMatchingSnapshot()
  });

  it('CRUD - repository (skeleton)', async () => {
    expect.assertions(3);

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

    await Api.Repository.removeOne({ id: resourceId });

    try {
      await Api.Repository.findOne({
        id: resourceId
      });
    } catch (e) {
      expect(e.response.status).toEqual(404);
    }
  });

});
