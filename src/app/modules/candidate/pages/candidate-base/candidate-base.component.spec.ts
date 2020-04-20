import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateBaseComponent } from './candidate-base.component';

describe('CandidateBaseComponent', () => {
  let component: CandidateBaseComponent;
  let fixture: ComponentFixture<CandidateBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
