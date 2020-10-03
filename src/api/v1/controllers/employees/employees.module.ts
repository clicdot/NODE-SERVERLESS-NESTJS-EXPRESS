import { Module } from '@nestjs/common';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './services/employees.service';
import { DynamodbService } from '../../../../common/services/dynamodb/dynamodb.service';

@Module({
  controllers: [
    EmployeesController
  ],
  providers: [
    EmployeesService,
    DynamodbService
  ]
})
export class EmployeesModule {}
