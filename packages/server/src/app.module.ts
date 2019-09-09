import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserProfileController } from './user-profile/user.profile.controller';
import { UserProfileModule } from './user-profile/user.profile.module';

// TODO: find on how to reuse once created
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(configService.get('MONGO_URL')),
    AuthModule,
    UsersModule,
    UserProfileModule
  ],
  controllers: [
    UsersController,
    UserProfileController
  ],
  providers: [AppService],
})
export class AppModule {}
