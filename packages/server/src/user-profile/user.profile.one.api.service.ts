import {
  CreateUserProfileParams,
  RemoteOneUserProfileApi,
  ReadUserProfileParams
} from '@zorko/remote-api';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile, UserProfileDto } from '@zorko/dto';
import { UserProfileMongoDocument } from './user.profile.mongo.schema';

@Injectable()
export class UserProfileOneApiService implements RemoteOneUserProfileApi {

  constructor(@InjectModel('UserProfile') private readonly userProfileModel: Model<UserProfileMongoDocument>){}

  async findOne(params: ReadUserProfileParams): Promise<UserProfileDto> {

    const { login } = params;

    let userProfileDocument = await this.userProfileModel.findOne({ login });

    if (userProfileDocument) {

      const userProfile = new UserProfile()
        .setId(userProfileDocument.id)
        .setLogin(userProfileDocument.login);


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

  updateOne(updateParams: unknown): Promise<any> {
    return undefined;
  }
}
