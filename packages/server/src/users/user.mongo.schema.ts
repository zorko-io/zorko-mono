import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { User } from '@zorko/dto';

export interface UserMongoDocument extends Document {
  id: any;
  email: string;
  password: string;
  toUser(): User
}

export const UserMongoSchema = new mongoose.Schema<UserMongoDocument>({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    required: true
  },
});

UserMongoSchema.methods.toUser = function() {
   const result = this.toJSON();

   return {
     id: result._id.toString(),
     email: result.email,
     password: result.password,
     roles: result.roles
   }
};
