import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrinterComponent } from './new-printer.component';

describe('NewPrinterComponent', () => {
  let component: NewPrinterComponent;
  let fixture: ComponentFixture<NewPrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
