import 'reflect-metadata';
import { ApiTestHelper } from './helper/api.test.helper';
import { UserProfiles, Users } from './config';
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

    expect(userProfile).toEqual(UserProfiles.JoeUserProfile);
  });

  it('fails on create already existing profile', async () => {
    expect.assertions(1);
    const login = 'test';

    try {
      await Api.UserProfile.createOne({
        login
      })
    } catch (error) {
      expect(error.response.data).toEqual({
        statusCode: 403,
        error: 'Forbidden',
        message: `Can't create user profile for #login ${login}, because it's already exists`
      });
    }
  })

});
