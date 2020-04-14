import { Module } from '@nestjs/common';
import { GpioController } from './controllers/gpio/gpio.controller';
import { GpioService } from './services/gpio/gpio.service';

@Module({
  controllers: [GpioController],
  providers: [GpioService],
  exports: []
})
export class ServerGpioModule {}
