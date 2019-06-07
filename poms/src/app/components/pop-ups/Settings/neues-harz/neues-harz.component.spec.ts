import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuesHarzComponent } from './neues-harz.component';

describe('NeuesHarzComponent', () => {
  let component: NeuesHarzComponent;
  let fixture: ComponentFixture<NeuesHarzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuesHarzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuesHarzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
