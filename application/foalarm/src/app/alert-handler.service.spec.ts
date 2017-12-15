import { TestBed, inject } from '@angular/core/testing';

import { AlertHandlerService } from './alert-handler.service';

describe('AlertHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertHandlerService]
    });
  });

  it('should be created', inject([AlertHandlerService], (service: AlertHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
