import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
import { TerminusModule } from '@nestjs/terminus';
import { V1Module } from './api/v1/v1.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthcheckController } from './api/controllers/healthcheck/healthcheck.controller';
import { TokenController } from './api/controllers/token.controller';

import { ResponseService } from './common/services/response/response.service';


import * as fs from 'fs-extra';
let config = {};

try {
  if (fs.existsSync(__dirname + '/.env')) {
    config = {
      envFilePath: __dirname + '/.env'
    };
  }
} catch(err) {
  config = {
    ignoreEnvFile: true
  };
}

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot(config),
    V1Module
  ],
  controllers: [
    AppController,
    HealthcheckController,
    TokenController
  ],
  providers: [
    AppService,
    ResponseService
  ],
})
export class AppModule {}
