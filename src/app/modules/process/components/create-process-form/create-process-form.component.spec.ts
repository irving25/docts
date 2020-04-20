import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcessFormComponent } from './create-process-form.component';

describe('CreateProcessFormComponent', () => {
  let component: CreateProcessFormComponent;
  let fixture: ComponentFixture<CreateProcessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProcessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
