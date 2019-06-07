import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpVanikComponent } from './pop-up-vanik.component';

describe('PopUpVanikComponent', () => {
  let component: PopUpVanikComponent;
  let fixture: ComponentFixture<PopUpVanikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpVanikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpVanikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
