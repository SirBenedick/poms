import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostprintGroupActionComponent } from './postprint-group-action.component';

describe('PostprintGroupActionComponent', () => {
  let component: PostprintGroupActionComponent;
  let fixture: ComponentFixture<PostprintGroupActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostprintGroupActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostprintGroupActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
