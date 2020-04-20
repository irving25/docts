import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../../shared/modules/app.material.module';
import { CreateCandidateFormComponent } from '../candidate/components/create-candidate-form/create-candidate-form.component';
import {AuthService} from '../../shared/services/authentication/auth.service';

import {LoginRoutingModule} from './login-routing.module';

import {LoginEmailComponent} from './pages/login-email/login-email.component';


@NgModule({
  declarations: [LoginEmailComponent, CreateCandidateFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService
  ],
  entryComponents: [
    CreateCandidateFormComponent
  ]
})
export class LoginModule {
}
