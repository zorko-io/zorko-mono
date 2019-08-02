import * as mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Document } from 'mongoose';
import * as assert from 'assert';

export interface UserEntity extends User, Document {
   id: any;
   toUser(): User
}

export const UserSchema = new mongoose.Schema<UserEntity>({
   email: {type: String, unique: true, required: true},
   password: {type: String, required: true},
   roles: {type: Array, required: true}
});

UserSchema.methods.toUser = function() {
   const result = this.toJSON();

   if (!result) {
      return;
   }

   assert(result.email, 'User should have email');
   assert(result.password, 'User should have password');

   return  {
      id: result._id.toString(),
      email: result.email,
      password: result.password,
      roles: result.roles
   };
};
