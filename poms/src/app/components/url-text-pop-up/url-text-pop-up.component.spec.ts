import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlTextPopUpComponent } from './url-text-pop-up.component';

describe('UrlTextPopUpComponent', () => {
  let component: UrlTextPopUpComponent;
  let fixture: ComponentFixture<UrlTextPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlTextPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlTextPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
