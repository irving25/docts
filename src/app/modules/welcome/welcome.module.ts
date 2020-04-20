import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ProcessModule } from './../process/process.module';
import {DepartmentModule} from './../department/department.module';
import {VacancyModule} from '../vacancy/vacancy.module';
import {CandidateModule} from './../../modules/candidate/candidate.module';
import {GroupModule} from './../../modules/group/group.module';
import {RecruiterModule} from './../../modules/recruiter/recruiter.module';
import {MaterialModule} from '../../shared/modules/app.material.module';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {NavService} from './services/nav.service';
import { AppUserComponent } from './components/app-user/app-user.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {MenuComponent} from './components/menu/menu.component';
import {OtroComponent} from './components/otro/otro.component';
import {SidenavComponent} from './pages/sidenav/sidenav.component';



@NgModule({
  declarations: [SidenavComponent, DashboardComponent, MenuComponent, HeaderComponent,
    OtroComponent,
    AppUserComponent,
    FooterComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    VacancyModule,
    MaterialModule,
    DepartmentModule,
    GroupModule,
    RecruiterModule,
    CandidateModule,
    ProcessModule
    ],
  providers: [
    NavService
  ]
})
export class WelcomeModule {
}
