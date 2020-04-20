import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsRecruiterBtnComponent } from './actions-recruiter-btn.component';

describe('ActionsRecruiterBtnComponent', () => {
  let component: ActionsRecruiterBtnComponent;
  let fixture: ComponentFixture<ActionsRecruiterBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsRecruiterBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsRecruiterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
