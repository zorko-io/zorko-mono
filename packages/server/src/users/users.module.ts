import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserOneApiService } from './user.one.api.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoSchema } from './user.mongo.schema';
import { ConfigModule } from '../config/config.module';
import { UserManyApiService } from './user.many.api.service';
import { UserModelFactory } from '@zorko/dto';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{
      name: 'User', schema: UserMongoSchema
    }])
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UserModelFactory,
      // TODO: wire with encrption settings here
      useValue: new UserModelFactory()
    },
    UserOneApiService,
    UserManyApiService
  ],
  exports: [UserOneApiService, UserManyApiService]
})
export class UsersModule {}
