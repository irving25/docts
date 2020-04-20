import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsDepartmentBtnComponent } from './actions-department-btn.component';

describe('ActionsDepartmentBtnComponent', () => {
  let component: ActionsDepartmentBtnComponent;
  let fixture: ComponentFixture<ActionsDepartmentBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsDepartmentBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsDepartmentBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
