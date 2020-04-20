import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../shared/modules/app.material.module';

import {ActionsRecruiterBtnComponent} from './components/actions-recruiter-btn/actions-recruiter-btn.component';
import { CreateRecruiterFormComponent } from './components/create-recruiter-form/create-recruiter-form.component';
import {DeleteRecruiterFormComponent} from './components/delete-recruiter-form/delete-recruiter-form.component';
import {EditRecruiterFormComponent} from './components/edit-recruiter-form/edit-recruiter-form.component';
import { RecruiterDetailComponent } from './components/recruiter-detail/recruiter-detail.component';
import { RecruiterListComponent } from './components/recruiter-list/recruiter-list.component';
import { RecruiterBaseComponent } from './pages/recruiter-base/recruiter-base.component';



@NgModule({
  declarations: [
    RecruiterBaseComponent,
    RecruiterListComponent,
    RecruiterDetailComponent,
    CreateRecruiterFormComponent,
    EditRecruiterFormComponent,
    ActionsRecruiterBtnComponent,
    DeleteRecruiterFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    CreateRecruiterFormComponent,
    EditRecruiterFormComponent,
    DeleteRecruiterFormComponent
  ],
})
export class RecruiterModule { }
