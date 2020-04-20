import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVacancyFormComponent } from './delete-vacancy-form.component';

describe('DeleteVacancyFormComponent', () => {
  let component: DeleteVacancyFormComponent;
  let fixture: ComponentFixture<DeleteVacancyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVacancyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVacancyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
