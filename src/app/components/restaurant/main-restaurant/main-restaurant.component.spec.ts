import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRestaurantComponent } from './main-restaurant.component';

describe('MainRestaurantComponent', () => {
  let component: MainRestaurantComponent;
  let fixture: ComponentFixture<MainRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainRestaurantComponent]
    });
    fixture = TestBed.createComponent(MainRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
