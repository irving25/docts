import { TestBed } from '@angular/core/testing';

import { FirebaseDepartmentServiceService } from './firebase-department-service.service';

describe('FirebaseDepartmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDepartmentServiceService = TestBed.get(FirebaseDepartmentServiceService);
    expect(service).toBeTruthy();
  });
});
