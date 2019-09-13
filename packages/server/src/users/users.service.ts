import { Model } from 'mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, RolesEnum, User, UserDto, UserDtoInterface } from '@zorko/dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './schemas/user.schema';

const DEFAULT_CRYPT_SALT = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserEntity>) {}

  async createOne(user: CreateUserDto): Promise<string> {
    const existingUser = await this.findOne({ email: user.email });
    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    const hasRoles = user.roles ? user.roles : false;
    let roles = user.roles;

    if (!hasRoles){
      roles = [RolesEnum.User]
    }

    const hashPassword = await bcrypt.hash(user.password, DEFAULT_CRYPT_SALT);

    const userModel = new this.userModel({
      ...user,
      password: hashPassword,
      roles
    });

    const result = await userModel.save();

    return result._id.toString();
  }

  async updateOne(nextUser: UserDtoInterface): Promise<UserDtoInterface> {

    let password;
    let result;

    if (nextUser.password) {
      password = await bcrypt.hash(nextUser.password, DEFAULT_CRYPT_SALT);
    }
    let userModel = await this.userModel.findById(nextUser.id);

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

  async findOne(params: {email?: string, id?: string}): Promise<UserDtoInterface | undefined> {

    let { email, id } = params;
    let model;

    if (email){
      model = await this.userModel.findOne({
        email: params.email
      });
    } else if(id){
      model = await this.userModel.findById(id);
    }

    if (!model){
      return;
    }

    return model.toUser().toDTO();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Can't find user by #id: ${id}`)
    }
    await this.userModel.remove({_id: id});
  }

  async removeAll(): Promise<number> {
     const result = await this.userModel.deleteMany({});
     return result.n;
  }

  async findAll(): Promise<UserDtoInterface[]> {
    const models = await this.userModel.find();
    return models.map(model => model.toUser().toDTO());
  }

}
