import { TestBed } from '@angular/core/testing';

import { PlatService } from './menu.service';

describe('PlatService', () => {
  let service: PlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
