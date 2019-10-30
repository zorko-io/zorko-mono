import { CreateRepositoryParams, ReadRepositoryParams, RemoteOneRepositoryApi } from '@zorko/remote-api';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryMongoDocument } from './repository.mongo.schema';
import { Model } from 'mongoose';
import { Repository } from '@zorko/dto';

@Injectable()
export class RepositoryOneApiService implements RemoteOneRepositoryApi{

  constructor(
    @InjectModel('Repository')
    private readonly repositoryModel: Model<RepositoryMongoDocument>
  ) {}

  async createOne(params: CreateRepositoryParams): Promise<string> {

    const existingRepo = await this.repositoryModel.findOne({
      name: params.name,
      owner: params.owner
    });

    if (existingRepo){
      // TODO: use common approach for such errors
      throw Error('Repository with given name and owner already exists');
    }

    let newModel = new this.repositoryModel({
      name: params.name,
      description: params.description,
      owner: params.owner
    });

    newModel = await newModel.save();

    return newModel.serialize().id;
  }

  async findOne(params: ReadRepositoryParams): Promise<Repository> {

    const repo = await this.repositoryModel.findOne({
      _id: params.id
    });

    return repo.serialize();
  }

  removeOne(deleteParams: any): Promise<void> {
    return undefined;
  }

  updateOne(updateParams: any): Promise<any> {
    return undefined;
  }

}
