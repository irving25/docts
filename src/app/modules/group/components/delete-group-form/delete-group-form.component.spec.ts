import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGroupFormComponent } from './delete-group-form.component';

describe('DeleteGroupFormComponent', () => {
  let component: DeleteGroupFormComponent;
  let fixture: ComponentFixture<DeleteGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
