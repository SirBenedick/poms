import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeueKategorieComponent } from './neue-kategorie.component';

describe('NeueKategorieComponent', () => {
  let component: NeueKategorieComponent;
  let fixture: ComponentFixture<NeueKategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeueKategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeueKategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
