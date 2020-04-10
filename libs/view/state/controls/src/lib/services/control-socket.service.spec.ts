import { TestBed } from '@angular/core/testing';

import { ControlSocketService } from './control-socket.service';

describe('ControlSocketService', () => {
  let service: ControlSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
