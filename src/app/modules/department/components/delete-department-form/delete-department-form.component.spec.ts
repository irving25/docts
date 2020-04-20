import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepartmentFormComponent } from './delete-department-form.component';

describe('DeleteDepartmentFormComponent', () => {
  let component: DeleteDepartmentFormComponent;
  let fixture: ComponentFixture<DeleteDepartmentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDepartmentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
