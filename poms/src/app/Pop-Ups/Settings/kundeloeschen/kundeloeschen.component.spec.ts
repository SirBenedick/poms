import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundeloeschenComponent } from './kundeloeschen.component';

describe('KundeloeschenComponent', () => {
  let component: KundeloeschenComponent;
  let fixture: ComponentFixture<KundeloeschenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundeloeschenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundeloeschenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
