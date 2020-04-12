import { Controller, Get } from '@nestjs/common';
import { GpioPinsService } from '../../services/gpio-pins/gpio-pins.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller('controls')
export class ControlsController {
  constructor(private gpio: GpioPinsService) {}

  @Get()
  getControls() {
    return of(this.gpio.controls).pipe(delay(5000));
  }
}
