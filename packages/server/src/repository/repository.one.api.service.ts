import {
  CreateRepositoryParams, DeleteRepositoryParams, deleteRepositoryParamsValidationSchema,
  InputValidation,
  ReadRepositoryParams, readRepositoryParamsValidationSchema,
  RemoteOneRepositoryApi,
} from '@zorko/remote-api';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryMongoDocument } from './repository.mongo.schema';
import { Model } from 'mongoose';
import { Repository, repositoryValidationSchema } from '@zorko/dto';

@Injectable()
export class RepositoryOneApiService implements RemoteOneRepositoryApi{

  constructor(
    @InjectModel('Repository')
    private readonly repositoryModel: Model<RepositoryMongoDocument>
  ) {}

  @InputValidation(repositoryValidationSchema())
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

  @InputValidation(readRepositoryParamsValidationSchema())
  async findOne(params: ReadRepositoryParams): Promise<Repository> {

    const repo = await this.repositoryModel.findOne({
      _id: params.id
    });

    if (!repo) {
      throw new NotFoundException(`Can't find repository by #id: ${params.id}`);
    }

    return repo.serialize();
  }

  @InputValidation(deleteRepositoryParamsValidationSchema())
  async removeOne(params: DeleteRepositoryParams): Promise<void> {
    const { id } = params;

    await this.findOne({ id });

    await this.repositoryModel.deleteOne({ _id: id });
  }

  updateOne(updateParams: any): Promise<any> {
    return undefined;
  }

}
