import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuerKundeComponent } from './neuer-kunde.component';

describe('NeuerKundeComponent', () => {
  let component: NeuerKundeComponent;
  let fixture: ComponentFixture<NeuerKundeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuerKundeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuerKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
