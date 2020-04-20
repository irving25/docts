import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentBaseComponent } from './department-base.component';

describe('DepartmentBaseComponent', () => {
  let component: DepartmentBaseComponent;
  let fixture: ComponentFixture<DepartmentBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
