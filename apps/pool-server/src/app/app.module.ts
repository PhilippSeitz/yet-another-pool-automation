import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerControlsModule } from '@pool/server/controls';

@Module({
  imports: [ServerControlsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
