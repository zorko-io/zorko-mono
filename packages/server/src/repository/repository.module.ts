import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { RepositoryController } from './repository.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule
    // MongooseModule.forFeature([{name: 'User', schema: UserMongoSchema}])
  ],
  controllers: [
    RepositoryController
  ],
  providers: [
    // UserOneApiService,
    // UserManyApiService
  ],
  exports: [
    // UserOneApiService, UserManyApiService
  ]
})
export class RepositoryModule {}
