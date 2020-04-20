import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsGroupBtnComponent } from './actions-group-btn.component';

describe('ActionsGroupBtnComponent', () => {
  let component: ActionsGroupBtnComponent;
  let fixture: ComponentFixture<ActionsGroupBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsGroupBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsGroupBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
