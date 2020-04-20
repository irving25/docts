import { TestBed } from '@angular/core/testing';

import { FirebaseRecruiterServiceService } from './firebase-recruiter-service.service';

describe('FirebaseRecruiterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseRecruiterServiceService = TestBed.get(FirebaseRecruiterServiceService);
    expect(service).toBeTruthy();
  });
});
