import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacancyBaseComponent} from './pages/vacancy-base/vacancy-base.component';
import {MaterialModule} from '../../shared/modules/app.material.module';
import {VacanciesListComponent} from './components/vacancies-list/vacancies-list.component';
import {VacancyDetailComponent} from './components/vacancy-detail/vacancy-detail.component';
import {CreateVacancyFormComponent} from './components/create-vacancy-form/create-vacancy-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditVacancyFormComponent} from './components/edit-vacancy-form/edit-vacancy-form.component';
import {ActionsVacancyBtnComponent} from './components/actions-vacancy-btn/actions-vacancy-btn.component';
import {DeleteVacancyFormComponent} from './components/delete-vacancy-form/delete-vacancy-form.component';


@NgModule({
  declarations: [VacancyBaseComponent, VacanciesListComponent, VacancyDetailComponent,
    CreateVacancyFormComponent, EditVacancyFormComponent, ActionsVacancyBtnComponent, DeleteVacancyFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [CreateVacancyFormComponent, EditVacancyFormComponent, DeleteVacancyFormComponent
  ],
})
export class VacancyModule {
}
