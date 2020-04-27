import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getLast24h();
  }

  @Get('24h')
  getLast24h() {
    return this.appService.getMinMax24();
  }

  @Get('now')
  getCurrentTemperature() {
    return this.appService.getCurrentTemperature();
  }
}
