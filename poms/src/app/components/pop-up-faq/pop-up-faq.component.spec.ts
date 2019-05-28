import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFAQComponent } from './pop-up-faq.component';

describe('PopUpFAQComponent', () => {
  let component: PopUpFAQComponent;
  let fixture: ComponentFixture<PopUpFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
