import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarzloeschenComponent } from './harzloeschen.component';

describe('HarzloeschenComponent', () => {
  let component: HarzloeschenComponent;
  let fixture: ComponentFixture<HarzloeschenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarzloeschenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarzloeschenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
