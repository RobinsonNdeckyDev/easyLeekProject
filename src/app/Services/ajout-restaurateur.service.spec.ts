import { TestBed } from '@angular/core/testing';

import { AjoutRestaurateurService } from './ajout-restaurateur.service';

describe('AjoutRestaurateurService', () => {
  let service: AjoutRestaurateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutRestaurateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
