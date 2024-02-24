import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilRestaurantComponent } from './accueil-restaurant.component';

describe('AccueilRestaurantComponent', () => {
  let component: AccueilRestaurantComponent;
  let fixture: ComponentFixture<AccueilRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilRestaurantComponent]
    });
    fixture = TestBed.createComponent(AccueilRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
