import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCandidateFormComponent } from './create-candidate-form.component';

describe('CreateCandidateFormComponent', () => {
  let component: CreateCandidateFormComponent;
  let fixture: ComponentFixture<CreateCandidateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCandidateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
