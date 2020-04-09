import { async, TestBed } from '@angular/core/testing';
import { StateControlsModule } from './state-controls.module';

describe('StateControlsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StateControlsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StateControlsModule).toBeDefined();
  });
});
