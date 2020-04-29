import { Module, Logger } from '@nestjs/common';

import { TempCollectorService } from './temp-collector.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ServerMqttModule } from '@pool/server/mqtt';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServerMqttModule.forRoot('tempCollector')
  ],
  providers: [TempCollectorService, Logger]
})
export class AppModule {}
