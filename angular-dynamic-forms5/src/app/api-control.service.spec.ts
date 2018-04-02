import { TestBed, inject } from '@angular/core/testing';

import { ApiControlService } from './api-control.service';

describe('ApiControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiControlService]
    });
  });

  it('should be created', inject([ApiControlService], (service: ApiControlService) => {
    expect(service).toBeTruthy();
  }));
});
