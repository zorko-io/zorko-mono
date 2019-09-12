import { Module } from '@nestjs/common';
import { UserProfileController } from './user.profile.controller';
import { UserProfileService } from './user.profile.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './user.profile.schema';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{name: 'UserProfile', schema: UserProfileSchema}])
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService]
})
export class UserProfileModule {}
