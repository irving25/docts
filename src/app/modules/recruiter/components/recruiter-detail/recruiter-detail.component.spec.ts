import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDetailComponent } from './recruiter-detail.component';

describe('RecruiterDetailComponent', () => {
  let component: RecruiterDetailComponent;
  let fixture: ComponentFixture<RecruiterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
