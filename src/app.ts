import { Server } from 'http';
import { createServer } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as helmet from 'helmet';
import { GlobalInterceptor } from './common/interceptor/global.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
import { HttpExceptionFilter } from './common/filters/errors.exception';
import { ResponseService } from './common/services/response/response.service';

let cachedServer: Server;

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

export async function bootstrap(): Promise<Server> {
  if (!cachedServer) {
    try {
      const responseSet = new ResponseService();

      const expressApp = express();
      const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
      nestApp.use(eventContext());

      nestApp.use(helmet({
        contentSecurityPolicy: false,
      }));

      // nestApp configuration
      nestApp.setGlobalPrefix('api');
      nestApp.useGlobalFilters(new HttpExceptionFilter(responseSet));
      nestApp.useGlobalInterceptors(new GlobalInterceptor());
      nestApp.useGlobalInterceptors(new TransformInterceptor(responseSet));
      nestApp.useGlobalInterceptors(new ErrorsInterceptor());

      // Swagger Docs
      const options = new DocumentBuilder()
        .setTitle(process.env.SWAGGER_TITLE)
        .setDescription(process.env.SWAGGER_DESCR)
        .setVersion(process.env.SWAGGER_VS)
        .addTag('Swagger')
        .build();
      const document = SwaggerModule.createDocument(nestApp, options);
      SwaggerModule.setup('swagger', nestApp, document);

      await nestApp.init();
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(cachedServer);
}
