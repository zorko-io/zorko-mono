import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { RepositoryController } from './repository.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryMongoSchema } from './repository.mongo.schema';
import { RepositoryOneApiService } from './repository.one.api.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    MongooseModule.forFeature([{
      name: 'Repository',
      schema: RepositoryMongoSchema
    }])
  ],
  controllers: [
    RepositoryController
  ],
  providers: [
    RepositoryOneApiService
  ],
  exports: []
})
export class RepositoryModule {}
