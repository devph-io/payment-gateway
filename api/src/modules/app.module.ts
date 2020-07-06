import { Module, Global, CacheModule, CacheInterceptor, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DraftModule } from './draft/draft.module';
import * as getORMConfig from '../entities/ormconfig';
import { ReactionInterceptor } from '../common/interceptors/reaction. interceptor';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

const shared = [
  CacheModule.register(),
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => getORMConfig(config),
    inject: [ConfigService],
  }),
  TypeOrmModule.forFeature([]),
];

@Global()
@Module({
  imports: [...shared, DraftModule],
  exports: shared,
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ReactionInterceptor,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
