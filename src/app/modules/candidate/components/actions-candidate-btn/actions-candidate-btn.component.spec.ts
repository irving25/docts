import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsCandidateBtnComponent } from './actions-candidate-btn.component';

describe('ActionsCandidateBtnComponent', () => {
  let component: ActionsCandidateBtnComponent;
  let fixture: ComponentFixture<ActionsCandidateBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsCandidateBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsCandidateBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
