import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintedordersComponent } from './printedorders.component';

describe('PrintedordersComponent', () => {
  let component: PrintedordersComponent;
  let fixture: ComponentFixture<PrintedordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintedordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
