import { async, TestBed } from '@angular/core/testing';
import { ViewDashboardModule } from './view-dashboard.module';

describe('ViewDashboardModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ViewDashboardModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ViewDashboardModule).toBeDefined();
  });
});
