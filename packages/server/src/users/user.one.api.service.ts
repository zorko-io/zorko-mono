import { Model } from 'mongoose';
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum, User, UserModelFactory } from '@zorko/dto';
import {
  CreateUserParams,
  DeleteUserParams,
  InputValidation,
  ReadUserParams,
  RemoteOneUserApi,
  UpdateUserParams,
  updateUserParamsValidationSchema,
} from '@zorko/remote-api';
import { UserMongoDocument } from './user.mongo.schema';

@Injectable()
export class UserOneApiService implements RemoteOneUserApi {
  constructor(
    private readonly userDomainModelFactory: UserModelFactory,
    @InjectModel('User') private readonly userMongoModel: Model<UserMongoDocument>)
  {}

  async createOne(user: CreateUserParams): Promise<string> {
    const existingUser = await this.findOne({ email: user.email });
    if (existingUser) {
      throw new ForbiddenException('User already exists')
    }

    let newUserModel = this.userDomainModelFactory.create(user);

    if (!newUserModel.hasRoles()){
      newUserModel.setRoles([RolesEnum.User]);
    }

    await newUserModel.encryptPassword();

    const newUser: User = newUserModel.toDTO();

    const userMongoModel = new this.userMongoModel({
      email: newUser.email,
      login: newUser.login,
      hashPassword: newUser.hashPassword,
      roles: newUser.roles
    });

    const result = await userMongoModel.save();

    return result._id.toString();
  }

  @InputValidation(updateUserParamsValidationSchema())
  async updateOne(params: UpdateUserParams): Promise<User> {
    let nextUser: User = params;
    let nextUserModel = this.userDomainModelFactory.create(nextUser);

    const prevUser = await this.findOne({
      id: nextUserModel.getId()
    });

    if (!prevUser){
      throw new ForbiddenException('User was not created yet, create it first');
    }

    const prevUserModel = this.userDomainModelFactory.create(prevUser);

    if (nextUserModel.shouldEncryptPassword()) {
      await nextUserModel.encryptPassword();
    }

    nextUserModel = prevUserModel.merge(nextUserModel);

    nextUser = nextUserModel.toDTO();

    const userMongoDoc = await this.userMongoModel.findById(nextUser.id);

    userMongoDoc.email = nextUser.email;
    userMongoDoc.hashPassword = nextUser.hashPassword;
    userMongoDoc.login = nextUser.login;
    userMongoDoc.roles = nextUser.roles;

    try{
      await userMongoDoc.save();
    } catch (error) {
      if (error.code == 11000) {
        throw new ForbiddenException(
          `Can't update uniq field which is already exist, probably it's about #login`
        )
      }
    }

    return userMongoDoc.serialize();
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

    return model.serialize();
  }

  async removeOne(deleteParams: DeleteUserParams): Promise<void> {
    const { id } = deleteParams;
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Can't find user by #id: ${id}`)
    }
    await this.userMongoModel.deleteOne({_id: id});
  }
}
