import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/modules/app.material.module';


import { ProcessBaseComponent } from './pages/process-base/process-base.component';
import { CreateProcessFormComponent } from './components/create-process-form/create-process-form.component';
import { DeleteProcessFormComponent } from './components/delete-process-form/delete-process-form.component';
import { EditProcessFormComponent } from './components/edit-process-form/edit-process-form.component';
import { ProcessListComponent } from './components/process-list/process-list.component';



@NgModule({
  declarations: [
    ProcessBaseComponent, 
    CreateProcessFormComponent, 
    DeleteProcessFormComponent, 
    EditProcessFormComponent, 
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    CreateProcessFormComponent,
    EditProcessFormComponent,
    DeleteProcessFormComponent
  ],
})
export class ProcessModule { }
