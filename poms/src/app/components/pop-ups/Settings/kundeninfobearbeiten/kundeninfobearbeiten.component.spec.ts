import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundeninfobearbeitenComponent } from './kundeninfobearbeiten.component';

describe('KundeninfobearbeitenComponent', () => {
  let component: KundeninfobearbeitenComponent;
  let fixture: ComponentFixture<KundeninfobearbeitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundeninfobearbeitenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundeninfobearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
