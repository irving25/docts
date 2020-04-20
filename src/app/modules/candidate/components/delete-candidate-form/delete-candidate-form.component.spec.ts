import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCandidateFormComponent } from './delete-candidate-form.component';

describe('DeleteCandidateFormComponent', () => {
  let component: DeleteCandidateFormComponent;
  let fixture: ComponentFixture<DeleteCandidateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCandidateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCandidateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
