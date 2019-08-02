import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

// TODO: find on how to reuse once created
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot(configService.get('MONGO_URL')),
    AuthModule,
    UsersModule
  ],
  controllers: [
    UsersController
  ],
  providers: [AppService],
})
export class AppModule {}
