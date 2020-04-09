import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCardComponent } from './toggle-card.component';

describe('ToggleCardComponent', () => {
  let component: ToggleCardComponent;
  let fixture: ComponentFixture<ToggleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
