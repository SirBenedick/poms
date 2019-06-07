import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDruckenComponent } from './pop-up-drucken.component';

describe('PopUpDruckenComponent', () => {
  let component: PopUpDruckenComponent;
  let fixture: ComponentFixture<PopUpDruckenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpDruckenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDruckenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
