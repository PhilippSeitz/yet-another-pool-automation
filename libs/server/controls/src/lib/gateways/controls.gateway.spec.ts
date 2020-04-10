import { Test, TestingModule } from '@nestjs/testing';
import { ControlsGateway } from './controls.gateway';

describe('ControlsGateway', () => {
  let gateway: ControlsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlsGateway]
    }).compile();

    gateway = module.get<ControlsGateway>(ControlsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
