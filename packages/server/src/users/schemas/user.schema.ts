import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '@zorko/dto';

export interface UserEntity extends User, Document {
  id: any;
  toUser (): User
}

export const UserSchema = new mongoose.Schema<UserEntity>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { type: Array, required: true },
});

UserSchema.methods.toUser = function() {
   const result = this.toJSON();

   return {
     id: result._id.toString(),
     email: result.email,
     password: result.password,
     roles: result.roles
   }
};
