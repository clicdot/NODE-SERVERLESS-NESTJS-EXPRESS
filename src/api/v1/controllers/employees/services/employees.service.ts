import { Injectable, BadRequestException } from '@nestjs/common';
import { DynamodbService } from '../../../../../common/services/dynamodb/dynamodb.service';
import { DBConstants } from '../../../../../common/constants/app.db.constants';

@Injectable()
export class EmployeesService {
  tablename = 'employee';

  constructor(
    private ddb: DynamodbService
  ) {}

  find(): Promise<any> {
    return this.ddb.scan(DBConstants.DBTABLE(this.tablename)).catch(e => {
      // console.log(e);
      throw new BadRequestException(e.message);
    });
  }

  findById(id: number): Promise<any> {
    return this.ddb.get(DBConstants.DBTABLE(this.tablename), {
      'EMPLOYEEOBJID': id
    }).catch(e => {
      console.log(e);
      throw new BadRequestException(e.message);
    });
  }
}
