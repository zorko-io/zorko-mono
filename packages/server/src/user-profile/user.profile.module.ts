import { Module } from '@nestjs/common';
import { UserProfileController } from './user.profile.controller';
import { UserProfileOneApiService } from './user.profile.one.api.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileMongoSchema } from './user.profile.mongo.schema';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{name: 'UserProfile', schema: UserProfileMongoSchema}])
  ],
  controllers: [UserProfileController],
  providers: [UserProfileOneApiService],
  exports: [UserProfileOneApiService]
})
export class UserProfileModule {}
