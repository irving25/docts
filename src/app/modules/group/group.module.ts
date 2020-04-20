import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../shared/modules/app.material.module';

import { ActionsGroupBtnComponent } from './components/actions-group-btn/actions-group-btn.component';
import { CreateGroupFormComponent } from './components/create-group-form/create-group-form.component';
import { DeleteGroupFormComponent } from './components/delete-group-form/delete-group-form.component';
import { EditGroupFormComponent } from './components/edit-group-form/edit-group-form.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupBaseComponent } from './pages/group-base/group-base.component';


@NgModule({
  declarations: [CreateGroupFormComponent,
    GroupDetailComponent,
    GroupListComponent,
    GroupBaseComponent,
    EditGroupFormComponent,
    DeleteGroupFormComponent,
    ActionsGroupBtnComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [CreateGroupFormComponent, EditGroupFormComponent,
    DeleteGroupFormComponent, ]
})
export class GroupModule { }
