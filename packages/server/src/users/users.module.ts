import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserOneApiService } from './user.one.api.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoSchema } from './user.mongo.schema';
import { ConfigModule } from '../config/config.module';
import { UserManyApiService } from './user.many.api.service';
import { UserModelFactory } from '@zorko/dto';
import { BCryptUserPasswordEncrypter } from './bcrypt.user.password.encrypter';

const DEFAULT_CRYPT_SALT = 10;

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserMongoSchema
    }])
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: UserModelFactory,
      useValue: new UserModelFactory(
        new BCryptUserPasswordEncrypter({
          salt: DEFAULT_CRYPT_SALT
        })
      )
    },
    UserOneApiService,
    UserManyApiService
  ],
  exports: [
    UserOneApiService,
    UserManyApiService,
    UserModelFactory
  ]
})
export class UsersModule {}
