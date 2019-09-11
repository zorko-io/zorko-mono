import 'reflect-metadata';
import { ApiTestHelper } from './helper/api.test.helper';
import { Users } from './config';
import { TokenDto, UserProfileDto } from '@zorko/dto';

describe('User Profile', () => {
   let Api;
   let token: TokenDto;
   let userProfile: UserProfileDto;

  beforeEach(async () => {
    Api = ApiTestHelper.create();
    token = await Api.createToken({
      email: Users.JoeUser.email,
      password: Users.JoeUser.password
    });
    Api = await Api.loginAs(Users.JoeUser);
  });

  it('gets user profile', async () => {
    userProfile = await Api.UserProfile.findOne({
      login: 'test'
    });

    expect(userProfile).toEqual({
      id: '321323123',
      login: 'test'
    });
  })

});
