import { EmployeesModule } from './controllers/employees/employees.module';
import { BoundariesModule } from './boundaries/boundaries.module';
import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { TestModule } from './controllers/test/test.module';

import { v1Routes } from './v1.Routes';

@Module({
  imports: [
    RouterModule.forRoutes(v1Routes),
    BoundariesModule,
    EmployeesModule,
    TestModule,
  ],
  controllers: [

  ],
  providers: [

  ]
})
export class V1Module { }
