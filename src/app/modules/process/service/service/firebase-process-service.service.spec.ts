import { TestBed } from '@angular/core/testing';

import { FirebaseProcessServiceService } from './firebase-process-service.service';

describe('FirebaseProcessServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseProcessServiceService = TestBed.get(FirebaseProcessServiceService);
    expect(service).toBeTruthy();
  });
});
