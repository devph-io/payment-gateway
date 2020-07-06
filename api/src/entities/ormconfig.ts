import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const getConfig = (env: ConfigService) => {
  const config: ConnectionOptions = {
    type : 'postgres',
    host: env.get('TYPEORM_HOST'),
    port: env.get<number>('TYPEORM_PORT'),
    username: env.get('TYPEORM_USERNAME'),
    password: env.get('TYPEORM_PASSWORD'),
    database: env.get('TYPEORM_DATABASE'),
    entities: [`${__dirname}/**/*{.ts,.js}`],
    synchronize: env.get<boolean>('TYPEORM_SYNCHRONIZE'),
    migrationsRun: env.get<boolean>('TYPEORM_MIGRATIONS_RUN'),
    logging: env.get<boolean>('TYPEORM_LOGGING'),
    logger: 'file',
  };

  return config
}

export = getConfig;
