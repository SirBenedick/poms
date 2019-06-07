import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieinfobearbeitenComponent } from './kategorieinfobearbeiten.component';

describe('KategorieinfobearbeitenComponent', () => {
  let component: KategorieinfobearbeitenComponent;
  let fixture: ComponentFixture<KategorieinfobearbeitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorieinfobearbeitenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorieinfobearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
