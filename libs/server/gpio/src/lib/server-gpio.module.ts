import { Module } from '@nestjs/common';
import { GpioController } from './controllers/gpio/gpio.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [GpioController],
  imports: [
    ClientsModule.register([
      { name: 'GPIO_SERVICE', transport: Transport.MQTT }
    ])
  ],
  providers: [],
  exports: []
})
export class ServerGpioModule {}
