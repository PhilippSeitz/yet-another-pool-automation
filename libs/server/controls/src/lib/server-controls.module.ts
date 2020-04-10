import { Module } from '@nestjs/common';
import { ControlsGateway } from './gateways/controls.gateway';
import { GpioPinsService } from './services/gpio-pins/gpio-pins.service';

@Module({
  controllers: [],
  providers: [ControlsGateway, GpioPinsService],
  exports: []
})
export class ServerControlsModule {}
