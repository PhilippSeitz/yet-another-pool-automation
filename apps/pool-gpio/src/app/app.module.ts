import { Module } from '@nestjs/common';
import { ServerGpioModule } from '@pool/server/gpio';

@Module({
  imports: [ServerGpioModule],
  controllers: [],
  providers: []
})
export class AppModule {}
