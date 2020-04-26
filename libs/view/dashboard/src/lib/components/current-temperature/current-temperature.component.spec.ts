import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTemperatureComponent } from './current-temperature.component';

describe('CurrentTemperatureComponent', () => {
  let component: CurrentTemperatureComponent;
  let fixture: ComponentFixture<CurrentTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentTemperatureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
