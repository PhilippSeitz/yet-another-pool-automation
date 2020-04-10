import { Test, TestingModule } from '@nestjs/testing';
import { GpioPinsService } from './gpio-pins.service';

describe('GpioPinsService', () => {
  let service: GpioPinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpioPinsService]
    }).compile();

    service = module.get<GpioPinsService>(GpioPinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
