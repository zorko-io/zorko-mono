import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ConfigModule } from '../config/config.module';
import { UserCollectionService } from './user.collection.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [
    UserService,
    UserCollectionService
  ],
  exports: [UserService, UserCollectionService]
})
export class UsersModule {}
