import { Module, Logger } from '@nestjs/common';
import { ControlsGateway } from './gateways/controls.gateway';
import { GpioPinsService } from './services/gpio-pins/gpio-pins.service';
import { ControlsController } from './controllers/controls/controls.controller';

@Module({
  controllers: [ControlsController],
  providers: [ControlsGateway, GpioPinsService, Logger],
  exports: []
})
export class ServerControlsModule {}
