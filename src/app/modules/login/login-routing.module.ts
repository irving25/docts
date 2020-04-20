import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginEmailComponent} from './pages/login-email/login-email.component';


const routes: Routes = [
  {
    path: '',
    component: LoginEmailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
