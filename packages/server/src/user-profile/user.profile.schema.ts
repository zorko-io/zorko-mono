import * as mongoose from "mongoose";
import { UserProfileDocument } from './user.profile.document';

export const UserProfileSchema = new mongoose.Schema<UserProfileDocument>({
  login: { type: String, unique: true, required: true},
  pickedRepositories:{type: Array, required: true}
});
