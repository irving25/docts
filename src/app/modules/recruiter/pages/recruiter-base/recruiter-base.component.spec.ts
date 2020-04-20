import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterBaseComponent } from './recruiter-base.component';

describe('RecruiterBaseComponent', () => {
  let component: RecruiterBaseComponent;
  let fixture: ComponentFixture<RecruiterBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
