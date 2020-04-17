import { async, TestBed } from '@angular/core/testing';
import { ViewHeaderModule } from './view-header.module';

describe('ViewHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ViewHeaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ViewHeaderModule).toBeDefined();
  });
});
