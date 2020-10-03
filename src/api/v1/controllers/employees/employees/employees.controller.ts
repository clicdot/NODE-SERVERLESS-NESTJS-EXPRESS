import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from '../services/employees.service';

@Controller()
export class EmployeesController {
  constructor(private readonly appService: EmployeesService) {}

  @Get()
  get(): Promise<any> {
    // throw new UnauthorizedException();
    return this.appService.find();
  }

  @Get('/:id')
  // @ApiParam({
  //   name: 'id'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Sample record found',
  //   // type: Program
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Not Found: Sample not found'
  // })
  findById(@Param() id): Promise<any> {
    console.log(id);
    return this.appService.findById(id.id);
  }
}
