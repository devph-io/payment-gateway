import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './modules/app.module';
import swaggerInit from './modules/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.set('trust proxy', 1);
  app.use(compression());
  app.use(helmet())
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))  
  app.use(csurf())
  app.use(
    rateLimit({
      max: 100, // limit each IP to 100 requests per windowMs
      windowMs: 10 * 60 * 1000, // 10 minutes
    }),
  );

  swaggerInit(app)
  await app.listen(process.env.APP_PORT, process.env.APP_HOST);
}
bootstrap();
