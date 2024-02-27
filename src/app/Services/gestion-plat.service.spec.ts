import { TestBed } from '@angular/core/testing';

import { GestionPlatService } from './gestion-plat.service';

describe('GestionPlatService', () => {
  let service: GestionPlatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPlatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
