import { async, TestBed } from '@angular/core/testing';
import { ViewSharedModule } from './view-shared.module';

describe('ViewSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ViewSharedModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ViewSharedModule).toBeDefined();
  });
});
