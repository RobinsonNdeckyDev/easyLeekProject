import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRestoComponent } from './profil-resto.component';

describe('ProfilRestoComponent', () => {
  let component: ProfilRestoComponent;
  let fixture: ComponentFixture<ProfilRestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilRestoComponent]
    });
    fixture = TestBed.createComponent(ProfilRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
