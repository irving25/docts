import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './../../shared/modules/app.material.module';

import { ActionsDepartmentBtnComponent } from './components/actions-department-btn/actions-department-btn.component';
import { CreateDepartmentFormComponent } from './components/create-department-form/create-department-form.component';
import { DeleteDepartmentFormComponent } from './components/delete-department-form/delete-department-form.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EditDepartmentFormComponent } from './components/edit-department-form/edit-department-form.component';
import { DepartmentBaseComponent } from './pages/department-base/department-base.component';


@NgModule({
  declarations: [CreateDepartmentFormComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    DepartmentBaseComponent,
    ActionsDepartmentBtnComponent,
    EditDepartmentFormComponent,
    DeleteDepartmentFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [CreateDepartmentFormComponent, EditDepartmentFormComponent, DeleteDepartmentFormComponent
  ],
})
export class DepartmentModule { }
