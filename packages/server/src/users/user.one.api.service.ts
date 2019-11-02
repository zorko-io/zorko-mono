import { Model } from 'mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum, User, UserModelFactory } from '@zorko/dto';
import * as bcrypt from 'bcrypt';
import {
  CreateUserParams,
  DeleteUserParams,
  ReadUserParams,
  RemoteOneUserApi,
  UpdateUserParams,
} from '@zorko/remote-api';
import { UserMongoDocument } from './user.mongo.schema';

const DEFAULT_CRYPT_SALT = 10;

@Injectable()
export class UserOneApiService implements RemoteOneUserApi {
  constructor(
    private readonly userDomainModelFactory: UserModelFactory,
    @InjectModel('User') private readonly userMongoModel: Model<UserMongoDocument>)
  {}

  async createOne(user: CreateUserParams): Promise<string> {
    const existingUser = await this.findOne({ email: user.email });
    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    let newUserModel = this.userDomainModelFactory.create(user);

    if (!newUserModel.hasRoles()){
      newUserModel.setRoles([RolesEnum.User]);
    }

    // TODO: delegate it down to domain model
    const hashPassword = await bcrypt.hash(user.password, DEFAULT_CRYPT_SALT);

    const newUser: User = newUserModel.toDTO();

    const userModel = new this.userMongoModel({
      email: newUser.email,
      login: newUser.login,
      password: hashPassword,
      roles: newUser.roles
    });

    const result = await userModel.save();

    return result._id.toString();
  }

  async updateOne(params: UpdateUserParams): Promise<User> {

    let password;
    let result;
    let nextUser = params.user;

    if (nextUser.password) {
      password = await bcrypt.hash(nextUser.password, DEFAULT_CRYPT_SALT);
    }
    let userModel = await this.userMongoModel.findById(nextUser.id);

    const response = await userModel.updateOne(
      { email: nextUser.email },
      { password: password ? password : nextUser.password }
    );

    if (response.ok) {
      result = await this.findOne({ id: nextUser.id });
    } else {
      throw Error(`Can't update user`)
    }

    if (!result) {
      throw Error(`Can't find user after update`)
    }

    return result.toUser().toDTO();
  }

  async findOne(params: ReadUserParams): Promise<User | undefined> {

    let { email, id } = params;
    let model;

    if (email){
      model = await this.userMongoModel.findOne({
        email: params.email
      });
    } else if(id){
      model = await this.userMongoModel.findById(id);
    }

    if (!model){
      return;
    }

    return model.toUser();
  }

  async removeOne(deleteParams: DeleteUserParams): Promise<void> {
    const { id } = deleteParams;
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Can't find user by #id: ${id}`)
    }
    await this.userMongoModel.remove({_id: id});
  }
}
