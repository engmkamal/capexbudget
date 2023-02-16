import { TestBed } from '@angular/core/testing';

import { EmpInfoBindingService } from './emp-info-binding.service';

describe('EmpInfoBindingService', () => {
  let service: EmpInfoBindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpInfoBindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
