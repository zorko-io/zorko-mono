import { CreateRepositoryParams, RemoteOneRepositoryApi } from '@zorko/remote-api';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryMongoDocument } from './repository.mongo.schema';
import { Model } from 'mongoose';

@Injectable()
export class RepositoryOneApiService implements RemoteOneRepositoryApi{

  constructor(
    @InjectModel('Repository')
    private readonly repositoryModel: Model<RepositoryMongoDocument>
  ) {}

  async createOne(createParams: CreateRepositoryParams): Promise<string> {

    const existingRepo = await this.repositoryModel.findOne({
      name: createParams.name,
      owner: createParams.owner
    });

    if (existingRepo){
      throw Error('Repository with given name and owner already exists');
    }

    let newModel = new this.repositoryModel({
      name: createParams.name,
      description: createParams.description,
      owner: createParams.owner
    });

    newModel = await newModel.save();

    return newModel.serialize().id;
  }

  findOne(searchParams: any): Promise<any> {
    return undefined;
  }

  removeOne(deleteParams: any): Promise<void> {
    return undefined;
  }

  updateOne(updateParams: any): Promise<any> {
    return undefined;
  }

}
