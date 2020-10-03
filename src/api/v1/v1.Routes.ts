import { EmployeesModule } from './controllers/employees/employees.module';
import { Routes } from 'nest-router';

import { TestModule } from './controllers/test/test.module';

export const v1Routes: Routes = [
  {
    path: '/v1',
    children: [
      {
        path: '/employees',
        module: EmployeesModule,
      },
      {
        path: '/test',
        module: TestModule,
      },
    ],
  },
];
