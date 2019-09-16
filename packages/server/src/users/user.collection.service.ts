import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
} from '@zorko/dto';
import { UserEntity } from './schemas/user.schema';
import {
  CreateUserCollectionParams,
  DeleteUserCollectionParams,
  ReadUserCollectionParams,
  RemoteManyUserApi,
  UpdateUserCollectionParams,
} from '@zorko/remote-api';

@Injectable()
export class UserCollectionService implements RemoteManyUserApi {
  constructor(@InjectModel('User') private readonly userModel: Model<UserEntity>) {}

  async removeMany(deleteParams: DeleteUserCollectionParams): Promise<string> {
     let deleteCount = 0;
     if (deleteParams.items.length === 0){
       // remove all
       const result = await this.userModel.deleteMany({});
       deleteCount = result.n
     }
     return String(deleteCount);
  }

  async findMany(readParams: ReadUserCollectionParams): Promise<UpdateUserCollectionParams> {
    const models = await this.userModel.find();
    return {
      items: models.map(model => model.toUser().toDTO())
    };
  }

  createMany(createParams: CreateUserCollectionParams): Promise<string> {
    return undefined;
  }

  updateMany(updateParams: UpdateUserCollectionParams): Promise<ReadUserCollectionParams> {
    return undefined;
  }

}
