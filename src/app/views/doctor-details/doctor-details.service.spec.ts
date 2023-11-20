import { TestBed } from '@angular/core/testing';

import { DoctorDetailsService } from './doctor-details.service';

describe('DoctorDetailsService', () => {
  let service: DoctorDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
