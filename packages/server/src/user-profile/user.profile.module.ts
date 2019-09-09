import { Module } from '@nestjs/common';
import { UserProfileController } from './user.profile.controller';
import { UserProfileService } from './user.profile.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService]
})
export class UserProfileModule {}
