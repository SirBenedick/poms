import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieloeschenComponent } from './kategorieloeschen.component';

describe('KategorieloeschenComponent', () => {
  let component: KategorieloeschenComponent;
  let fixture: ComponentFixture<KategorieloeschenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorieloeschenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorieloeschenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
