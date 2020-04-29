import { Controller, Get } from '@nestjs/common';
import { GpioPinsService } from '../../services/gpio-pins/gpio-pins.service';

@Controller('controls')
export class ControlsController {
  constructor(private gpio: GpioPinsService) {}

  @Get()
  getControls() {
    return this.gpio.controls;
  }
}
