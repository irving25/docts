import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyBaseComponent } from './vacancy-base.component';

describe('VacancyBaseComponent', () => {
  let component: VacancyBaseComponent;
  let fixture: ComponentFixture<VacancyBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
