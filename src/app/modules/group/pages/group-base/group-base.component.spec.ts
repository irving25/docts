import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBaseComponent } from './group-base.component';

describe('GroupBaseComponent', () => {
  let component: GroupBaseComponent;
  let fixture: ComponentFixture<GroupBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
