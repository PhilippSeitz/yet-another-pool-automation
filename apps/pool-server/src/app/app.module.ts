import { Module, Logger } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerControlsModule } from '@pool/server/controls';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ServerControlsModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
