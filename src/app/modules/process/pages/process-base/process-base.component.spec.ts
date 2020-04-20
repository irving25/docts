import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBaseComponent } from './process-base.component';

describe('ProcessBaseComponent', () => {
  let component: ProcessBaseComponent;
  let fixture: ComponentFixture<ProcessBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
