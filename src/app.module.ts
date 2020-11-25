import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import * as config from "./config.json";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth.middleware';
import { ApiModule } from './api/api.module';

console.log('config.mongodb_url', config.mongodb_url)

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../dist'),
    }),
    MongooseModule.forRoot(config.mongodb_url),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/api');
  }
}