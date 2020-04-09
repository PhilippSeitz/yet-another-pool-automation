import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunDiagramComponent } from './run-diagram.component';

describe('RunDiagramComponent', () => {
  let component: RunDiagramComponent;
  let fixture: ComponentFixture<RunDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
