import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNeuerDruckerComponent } from './pop-up-neuer-drucker.component';

describe('PopUpNeuerDruckerComponent', () => {
  let component: PopUpNeuerDruckerComponent;
  let fixture: ComponentFixture<PopUpNeuerDruckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpNeuerDruckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpNeuerDruckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
