import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User, UserDtoInterface } from '@zorko/dto';

export interface UserEntity extends UserDtoInterface, Document {
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

   return new User(result.email)
     .setId(result._id.toString())
     .setRoles(result.roles)
     .setPassword(result.password);
};
