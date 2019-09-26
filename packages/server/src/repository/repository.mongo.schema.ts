import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { Repository  } from '@zorko/dto';

export interface RepositoryMongoDocument extends Document, Repository {
  id: any;
  serialize(): Repository
}

export const RepositoryMongoSchema = new mongoose.Schema<RepositoryMongoDocument>({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
});

RepositoryMongoSchema.methods.serialize = function() {
  const result = this.toJSON();

  return {
    id: result._id.toString(),
    description: result.description,
    owner: result.owner,
    name: result.name
  }
};
