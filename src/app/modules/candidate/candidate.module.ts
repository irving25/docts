import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../shared/modules/app.material.module';

import { ActionsCandidateBtnComponent } from './components/actions-candidate-btn/actions-candidate-btn.component';
import { CandidateDetailComponent } from './components/candidate-detail/candidate-detail.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CreateCandidateFormComponent } from './components/create-candidate-form/create-candidate-form.component';
import { DeleteCandidateFormComponent } from './components/delete-candidate-form/delete-candidate-form.component';
import { EditCandidateFormComponent } from './components/edit-candidate-form/edit-candidate-form.component';
import { CandidateBaseComponent } from './pages/candidate-base/candidate-base.component';



@NgModule({
  declarations: [
    ActionsCandidateBtnComponent,
    CreateCandidateFormComponent,
    DeleteCandidateFormComponent,
    CandidateDetailComponent,
    CandidateListComponent,
    EditCandidateFormComponent,
    CandidateBaseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    CreateCandidateFormComponent,
    DeleteCandidateFormComponent,
    EditCandidateFormComponent
    ],
})
export class CandidateModule { }
