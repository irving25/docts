import { TestBed } from '@angular/core/testing';

import { FirebaseCandidateServiceService } from './firebase-candidate-service.service';

describe('FirebaseCandidateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseCandidateServiceService = TestBed.get(FirebaseCandidateServiceService);
    expect(service).toBeTruthy();
  });
});
