import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { RolesEnum, User } from '@zorko/dto';

export interface UserMongoDocument extends Document {
  id: any;
  email: string;
  hashPassword: string;
  login: string;
  roles: RolesEnum[];
  serialize(): User
}

export const UserMongoSchema = new mongoose.Schema<UserMongoDocument>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    required: true
  },
});

UserMongoSchema.methods.serialize = function() {
   const result = this.toJSON();

   return {
     id: result._id.toString(),
     email: result.email,
     login: result.login,
     hashPassword: result.hashPassword,
     roles: result.roles
   }
};
