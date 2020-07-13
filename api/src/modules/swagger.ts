import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import constants from '../common/constants';

const swaggerInit = app => {
  const options = new DocumentBuilder()
    .setTitle(constants.SWAGGER.TITLE)
    .setDescription(constants.SWAGGER.DESCRIPTION)
    .setVersion(constants.SWAGGER.VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

export default swaggerInit;
