import { Module, Logger } from '@nestjs/common';

import { TempCollectorService } from './temp-collector.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TempCollectorService, Logger]
})
export class AppModule {}
