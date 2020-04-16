import { Injectable, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GpioMockService {
  constructor(private logger: Logger) {
    this.logger.setContext('GPIO');
  }

  on(id: number) {
    return of('test').pipe(tap(() => this.logger.log(`on: ${id}`)));
  }

  off(id: number) {
    return of('test').pipe(tap(() => this.logger.log(`off: ${id}`)));
  }
}
