import 'reflect-metadata';
import { ApiTestHelper } from '../helper/api.test.helper';
import { UserProfiles, Users } from '../config';
import { TokenDto, UserProfileDto } from '@zorko/dto';

describe('UserProfileOneApi', () => {
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

    expect(userProfile).toMatchObject(UserProfiles.JoeUserProfile);
  });

  it('fails on create already existing profile', async () => {
    expect.assertions(1);
    const login = 'test';

    try {
      await Api.UserProfile.createOne({
        login
      })
    } catch (error) {
      expect(error).toMatchSnapshot();
    }
  })

});
