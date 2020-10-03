import { Injectable } from '@nestjs/common';

@Injectable()
export class DBConstants {

  public static TABLES = {
    EMPLOYEE: 'ocs-employee-',
    ROUTE: 'ocs-route-',
    CUSTOMERORDER: 'ocs-customerorder-',
    CUSTOMERORDEREVENT: 'ocs-customerorder-event-',
    CUSTOMERINFO: 'ocs-customerinfo-',
    LANDFILL: 'ocs-landfill-',
    LAUNCHGROUP: 'ocs-launchgroup-',
    LOADTYPE: 'ocs-loadtype-'
  };

  public static DBTABLE(name: string): string | any {
    try {
      return `${DBConstants.TABLES[name.toUpperCase()]}${process.env.MODE === 'DEV' || process.env.MODE === 'QA' ? 'qa': process.env.MODE.toLowerCase()}`;
    } catch (e) {
      // Error Handling : need better
      console.log(e);
    }
  }
}
