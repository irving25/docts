import { TestBed } from '@angular/core/testing';

import { FirebaseGroupServiceService } from './firebase-group-service.service';

describe('FirebaseGroupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseGroupServiceService = TestBed.get(FirebaseGroupServiceService);
    expect(service).toBeTruthy();
  });
});
