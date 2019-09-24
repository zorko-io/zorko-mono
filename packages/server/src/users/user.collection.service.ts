import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  User,
  UserCollection,
  defaultUserCollectionFactory
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

  async removeMany(deleteParams: DeleteUserCollectionParams): Promise<number> {
     let deleteCount = 0;
     if (deleteParams.items.length === 0){
       // remove all
       const result = await this.userModel.deleteMany({});
       deleteCount = result.n
     }
     return deleteCount;
  }

  async findMany(readParams: ReadUserCollectionParams): Promise<UserCollection> {
    const models = await this.userModel.find();
    const collection = defaultUserCollectionFactory.create(models.map(model => model.toUser()), {
      limit: readParams.limit,
      offset: readParams.offset,
      total: models.length
    });

    return collection.toDTO();
  }

  async createMany(createParams: CreateUserCollectionParams): Promise<string[]> {
    return ['1', '2'];
  }

  updateMany(updateParams: UpdateUserCollectionParams): Promise<UserCollection> {
    return undefined;
  }

}
