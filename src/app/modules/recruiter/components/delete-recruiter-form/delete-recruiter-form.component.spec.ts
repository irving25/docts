import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecruiterFormComponent } from './delete-recruiter-form.component';

describe('DeleteRecruiterFormComponent', () => {
  let component: DeleteRecruiterFormComponent;
  let fixture: ComponentFixture<DeleteRecruiterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRecruiterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecruiterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
