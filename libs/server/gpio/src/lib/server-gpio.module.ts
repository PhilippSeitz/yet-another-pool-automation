import { Module, Logger } from '@nestjs/common';
import { GpioService } from './services/gpio/gpio.service';
import { GpioMockService } from './services/gpio-mock/gpio-mock.service';

import { environment } from '@env/server';
import { ServerMqttModule } from '@pool/server/mqtt';

@Module({
  imports: [ServerMqttModule.forRoot('gpioCollector')],
  providers: [
    environment.production
      ? GpioService
      : { provide: GpioService, useClass: GpioMockService },
    Logger
  ],
  exports: [GpioService]
})
export class ServerGpioModule {}
