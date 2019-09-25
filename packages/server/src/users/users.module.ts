import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserOneApiService } from './user.one.api.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoSchema } from './user.mongo.schema';
import { ConfigModule } from '../config/config.module';
import { UserManyApiService } from './user.many.api.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{name: 'User', schema: UserMongoSchema}])
  ],
  controllers: [UsersController],
  providers: [
    UserOneApiService,
    UserManyApiService
  ],
  exports: [UserOneApiService, UserManyApiService]
})
export class UsersModule {}
