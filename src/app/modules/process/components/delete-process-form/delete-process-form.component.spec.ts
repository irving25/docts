import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProcessFormComponent } from './delete-process-form.component';

describe('DeleteProcessFormComponent', () => {
  let component: DeleteProcessFormComponent;
  let fixture: ComponentFixture<DeleteProcessFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProcessFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProcessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
