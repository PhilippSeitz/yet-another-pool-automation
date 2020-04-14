import { Test, TestingModule } from '@nestjs/testing';
import { GpioMockService } from './gpio-mock.service';

describe('GpioMockService', () => {
  let service: GpioMockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpioMockService]
    }).compile();

    service = module.get<GpioMockService>(GpioMockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
