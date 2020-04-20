import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecruiterFormComponent } from './create-recruiter-form.component';

describe('CreateRecruiterFormComponent', () => {
  let component: CreateRecruiterFormComponent;
  let fixture: ComponentFixture<CreateRecruiterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecruiterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecruiterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
