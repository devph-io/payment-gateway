import {
  Module,
  Global,
  CacheModule,
  CacheInterceptor,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Internal dependencies
import { PublicModule } from './public/public.module';
import * as getORMConfig from '../config/orm.config';
import * as getJWTConfig from '../config/jwt.config';
import { ReactionInterceptor } from '../common/interceptors/reaction.interceptor';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { User } from '../entities/User.entity';

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
  TypeOrmModule.forFeature([User]),
  PassportModule,
  JwtModule.registerAsync({
    useFactory: async (config: ConfigService) => getJWTConfig(config),
    inject: [ConfigService],
  }),
];

@Global()
@Module({
  imports: [...shared, PublicModule],
  exports: shared,
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ReactionInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
