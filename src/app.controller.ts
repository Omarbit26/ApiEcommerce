import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Helloword API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Object {
    return this.appService.getHello();
  }
}
