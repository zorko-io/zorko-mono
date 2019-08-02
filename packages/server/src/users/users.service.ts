import { Model } from 'mongoose';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, RolesEnum, UserDto } from '@zorko/dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserEntity>) {}

  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists')
    }

    const hasRoles = user.roles ? user.roles : false;

    // TODO: move to model layer, use mongoose plugin
    const hashPassword = await bcrypt.hash(user.password, 10);
    const createdUser = new this.userModel({
      ...user,
      password: hashPassword,
      roles: hasRoles ? user.roles : [RolesEnum.User]
    });
    const result = await createdUser.save();
    return result.toUser();
  }

  async update(userUpdates: UserDto): Promise<User> {

    let password;

    // TODO: move to model layer, use mongoose plugin
    if (userUpdates.password) {
      password = await bcrypt.hash(userUpdates.password, 10);
    }
    let nextUser = await this.userModel.findById(userUpdates.id);

    const response = await nextUser.updateOne(
      {email: userUpdates.email},
      {password: password ? password : nextUser.password}
    );

    if (response.ok) {
      nextUser = await this.userModel.findById(userUpdates.id);
    } else {
      throw Error(`Can't update user`)
    }

    return nextUser.toUser();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Can't find user by #id: ${id}`)
    }
    await this.userModel.remove({_id: id});
  }

  async removeAll(): Promise<number> {
     const result = await this.userModel.deleteMany({});
     return result.n;
  }

  async findAll(): Promise<User[]> {
    const models = await this.userModel.find();
    return models.map(model => model.toUser());
  }

  async findOneById(id: string): Promise<User | undefined> {
    const userModel = await this.userModel.findById(id);
    return userModel && userModel.toUser()
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const userModel = await this.userModel.findOne({
      email
    });

    return userModel &&  userModel.toUser();
  }

}
