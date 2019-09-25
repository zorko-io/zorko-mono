import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { UserProfileInterface } from '@zorko/dto';

export interface UserProfileMongoDocument extends Document, UserProfileInterface {
  id?: any;
}

export const UserProfileMongoSchema = new mongoose.Schema<UserProfileMongoDocument>({
  login: { type: String, unique: true, required: true},
  pickedRepositories:{type: Array, required: true}
});
