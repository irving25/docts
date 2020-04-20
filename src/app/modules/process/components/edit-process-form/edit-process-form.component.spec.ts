import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcessFormComponent } from './edit-process-form.component';

describe('EditProcessFormComponent', () => {
  let component: EditProcessFormComponent;
  let fixture: ComponentFixture<EditProcessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProcessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
