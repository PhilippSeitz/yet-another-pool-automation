import { Module, Logger } from '@nestjs/common';
import { ControlsGateway } from './gateways/controls.gateway';
import { GpioPinsService } from './services/gpio-pins/gpio-pins.service';
import { ControlsController } from './controllers/controls/controls.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ControlsController],
  providers: [ControlsGateway, GpioPinsService, Logger],
  imports: [
    ClientsModule.register([
      {
        name: 'GPIO_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://mqtt:1883'
        }
      }
    ])
  ],
  exports: []
})
export class ServerControlsModule {}
