import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';

@Controller('gpio')
export class GpioController {
  constructor(@Inject('GPIO_SERVICE') client: ClientProxy) {
    client.send({ cmd: 'on' }, 'test asdf').subscribe();
  }

  @MessagePattern({ cmd: 'on' })
  accumulate(data) {
    console.log(data);
    return;
  }
}
