import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoComponent } from './resto.component';

describe('RestoComponent', () => {
  let component: RestoComponent;
  let fixture: ComponentFixture<RestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoComponent]
    });
    fixture = TestBed.createComponent(RestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
