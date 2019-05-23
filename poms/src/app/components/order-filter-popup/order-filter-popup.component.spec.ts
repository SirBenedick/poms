import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFilterPopupComponent } from './order-filter-popup.component';

describe('OrderFilterPopupComponent', () => {
  let component: OrderFilterPopupComponent;
  let fixture: ComponentFixture<OrderFilterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFilterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
