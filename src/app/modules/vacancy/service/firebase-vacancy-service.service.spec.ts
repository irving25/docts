import { TestBed } from '@angular/core/testing';

import { FirebaseVacancyServiceService } from './firebase-vacancy-service.service';

describe('FirebaseVacancyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseVacancyServiceService = TestBed.get(FirebaseVacancyServiceService);
    expect(service).toBeTruthy();
  });
});
