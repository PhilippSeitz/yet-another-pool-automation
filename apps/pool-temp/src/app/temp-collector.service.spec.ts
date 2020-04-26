import { Test } from '@nestjs/testing';

import { TempCollectorService } from './temp-collector.service';

describe('TempCollectorService', () => {
  let service: TempCollectorService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TempCollectorService]
    }).compile();

    service = app.get<TempCollectorService>(TempCollectorService);
  });

  describe('getData', () => {
    it('should return "Welcome to pool-temp!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to pool-temp!' });
    });
  });
});
