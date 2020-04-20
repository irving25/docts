import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { ProcessBaseComponent } from '../process/pages/process-base/process-base.component';
import { CandidateBaseComponent } from '../candidate/pages/candidate-base/candidate-base.component';
import { DepartmentBaseComponent } from './../department/pages/department-base/department-base.component';
import { GroupBaseComponent } from './../group/pages/group-base/group-base.component';
import { RecruiterBaseComponent } from '../recruiter/pages/recruiter-base/recruiter-base.component';
import {VacancyBaseComponent} from '../vacancy/pages/vacancy-base/vacancy-base.component';
import {AuthGuard} from '../../shared/services/authentication/authguard.service';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {OtroComponent} from './components/otro/otro.component';
import {SidenavComponent} from './pages/sidenav/sidenav.component';



const routes: Routes = [
  {
    path: 'menu', component: SidenavComponent, canActivate: [AuthGuard],
    children:
      [
        {
          path: '',
          component: DashboardComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'otros',
          component: OtroComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'vacantes',
          component: VacancyBaseComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'departamentos',
          component: DepartmentBaseComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'grupos',
          component: GroupBaseComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'reclutadores',
          component: RecruiterBaseComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'candidatos',
          component: CandidateBaseComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
        {
          path: 'procesos',
          component: ProcessBaseComponent,
          canActivate: [AuthGuard],
          outlet: 'content'
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {
}
