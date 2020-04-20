import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacancyFormComponent } from './edit-vacancy-form.component';

describe('EditVacancyFormComponent', () => {
  let component: EditVacancyFormComponent;
  let fixture: ComponentFixture<EditVacancyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVacancyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVacancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
