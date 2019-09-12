import { Document } from 'mongoose';
import { UserProfileInterface } from '@zorko/dto';

export interface UserProfileDocument extends Document, UserProfileInterface {
  id?: any;
}
