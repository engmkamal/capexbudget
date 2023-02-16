import { TestBed } from '@angular/core/testing';

import { HttpajaxService } from './httpajax.service';

describe('HttpajaxService', () => {
  let service: HttpajaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpajaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
