import { Module } from '@nestjs/common';
import { ControlsGateway } from './gateways/controls.gateway';

@Module({
  controllers: [],
  providers: [ControlsGateway],
  exports: []
})
export class ServerControlsModule {}
