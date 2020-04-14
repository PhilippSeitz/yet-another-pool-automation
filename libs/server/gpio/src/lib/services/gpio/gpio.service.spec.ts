import { Test, TestingModule } from '@nestjs/testing';
import { GpioService } from './gpio.service';

describe('GpioService', () => {
  let service: GpioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpioService]
    }).compile();

    service = module.get<GpioService>(GpioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
