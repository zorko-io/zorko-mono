import {
  CreateUserProfileParams,
  RemoteUserProfileApi,
  ReadUserProfileParams,
  UpdateUserProfileParams,
} from '@zorko/remote-api';
import { Injectable } from '@nestjs/common';
import { UserProfileDocument } from './user.profile.document';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from '@zorko/dto';

@Injectable()
export class UserProfileService implements RemoteUserProfileApi {

  constructor(@InjectModel('UserProfile') private readonly userProfileModel: Model<UserProfileDocument>){}

  async findOne(params: ReadUserProfileParams): Promise<UpdateUserProfileParams> {

    const { login } = params;

    let userProfileDocument = await this.userProfileModel.findOne({ login });

    if (userProfileDocument) {

      const userProfile = new UserProfile()
        .setId(userProfileDocument.id)
        .setLogin(userProfileDocument.login);

      userProfile
        .getPickedRepositories()
        .setItems([]);  // TODO: add real repositories preview

      return userProfile.toDTO();
    }
    return null;
  }

  async createOne(params: CreateUserProfileParams): Promise<string> {
    // TODO: connect to mongo and store user profile here
    // TODO: create profile during user creation ()

    const { login } = params;

    let userProfileDocument = await this.userProfileModel.findOne({ login });

    if (userProfileDocument){
      throw {
        message: `Can't create user profile for #login ${login}, because it's already exists`
      };
    }

    // const userProfile = new UserProfile(login);

    userProfileDocument = await this.userProfileModel.create({
       login,
       pickedRepositories: []  // TODO: search over repos and put ids here
    });

    return userProfileDocument.id;
  }

  removeOne(deleteParams: unknown): Promise<void> {
    return undefined;
  }

  updateOne(updateParams: unknown): Promise<unknown> {
    return undefined;
  }
}
