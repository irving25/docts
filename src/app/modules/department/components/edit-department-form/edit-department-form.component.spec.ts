import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartmentFormComponent } from './edit-department-form.component';

describe('EditDepartmentFormComponent', () => {
  let component: EditDepartmentFormComponent;
  let fixture: ComponentFixture<EditDepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
