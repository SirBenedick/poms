import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FAQPopUpComponent } from './faqpop-up.component';

describe('FAQPopUpComponent', () => {
  let component: FAQPopUpComponent;
  let fixture: ComponentFixture<FAQPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FAQPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
