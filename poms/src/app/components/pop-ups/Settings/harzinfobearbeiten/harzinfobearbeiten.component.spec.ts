import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarzinfobearbeitenComponent } from './harzinfobearbeiten.component';

describe('HarzinfobearbeitenComponent', () => {
  let component: HarzinfobearbeitenComponent;
  let fixture: ComponentFixture<HarzinfobearbeitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarzinfobearbeitenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarzinfobearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
