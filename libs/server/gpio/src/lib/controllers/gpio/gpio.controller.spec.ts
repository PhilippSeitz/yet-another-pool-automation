import { Test, TestingModule } from '@nestjs/testing';
import { GpioController } from './gpio.controller';

describe('Gpio Controller', () => {
  let controller: GpioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpioController]
    }).compile();

    controller = module.get<GpioController>(GpioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
