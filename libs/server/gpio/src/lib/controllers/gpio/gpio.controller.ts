import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GpioService } from '../../services/gpio/gpio.service';

@Controller('gpio')
export class GpioController {
  constructor(private gpio: GpioService) {}

  @MessagePattern({ cmd: 'on' })
  on(id: number) {
    return this.gpio.on(id);
  }

  @MessagePattern({ cmd: 'off' })
  off(id: number) {
    return this.gpio.off(id);
  }
}
