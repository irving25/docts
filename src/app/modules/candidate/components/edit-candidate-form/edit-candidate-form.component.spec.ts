import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateFormComponent } from './edit-candidate-form.component';

describe('EditCandidateFormComponent', () => {
  let component: EditCandidateFormComponent;
  let fixture: ComponentFixture<EditCandidateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCandidateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
