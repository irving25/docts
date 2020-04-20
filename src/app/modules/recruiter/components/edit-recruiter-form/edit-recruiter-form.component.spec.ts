import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecruiterFormComponent } from './edit-recruiter-form.component';

describe('EditRecruiterFormComponent', () => {
  let component: EditRecruiterFormComponent;
  let fixture: ComponentFixture<EditRecruiterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecruiterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecruiterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
