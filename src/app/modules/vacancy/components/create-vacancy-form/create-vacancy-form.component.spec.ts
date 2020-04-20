import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVacancyFormComponent } from './create-vacancy-form.component';

describe('CreateVacancyFormComponent', () => {
  let component: CreateVacancyFormComponent;
  let fixture: ComponentFixture<CreateVacancyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVacancyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVacancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
