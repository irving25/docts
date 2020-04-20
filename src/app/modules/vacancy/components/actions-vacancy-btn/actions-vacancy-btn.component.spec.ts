import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsVacancyBtnComponent } from './actions-vacancy-btn.component';

describe('ActionsVacancyBtnComponent', () => {
  let component: ActionsVacancyBtnComponent;
  let fixture: ComponentFixture<ActionsVacancyBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsVacancyBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsVacancyBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
