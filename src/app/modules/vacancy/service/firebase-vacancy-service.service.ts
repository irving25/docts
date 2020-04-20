import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';

import {Observable} from 'rxjs';

import {Vacancy} from '../models/vacancy.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseVacancyServiceService {
  private basePath = '/vacancies';
  items: FirebaseListObservable<Vacancy[]> = null; //  list of objects
  item: FirebaseObjectObservable<Vacancy> = null; //   single object


  constructor(private db: AngularFireDatabase) {
  }

  createVacancy(vacancy: Vacancy) {
    const vacancies = this.db.list('vacancies');
    return vacancies.push({
      name: vacancy.name,
      department: vacancy.department,
      group: vacancy.group,
      labels: [],
      level: vacancy.level,
      quantityAvailable: vacancy.quantityAvailable,
      softSkill: vacancy.softSkill,
      hardSkill: vacancy.hardSkill,
      salaryRange: [0, 0],
      timeStamp: new Date(),
      active: vacancy.active
    });
  }

  getVacanciesList() {
    return this.db
      .list<Vacancy>('/vacancies');
  }

  getObservableVacancies() {
    // return this.db.list<Vacancy>('/vacancies', ref => ref.orderByChild('size'));
    return this.db
      .list<Vacancy>('/vacancies')
      .valueChanges();
  }

  getVacanciesRef(): Observable<any> {
    // return this.db.list<Vacancy>('/vacancies', ref => ref.orderByChild('size'));
    return this.db
      .list<Vacancy>('/vacancies')
      .snapshotChanges()
      // con el .map realizamos una transformacion de los datos, se toma el key y el data para
      // crear objetos de tipo Vacancy con su llave de identificación firebase.
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, ...data};
        });
      });
  }

  getVacanciesStateChanges() {
    // return this.db.list<Vacancy>('/vacancies', ref => ref.orderByChild('size'));
    return this.db
      .list<Vacancy>('/vacancies')
      .stateChanges();
  }

  // Return a single observable item
  getVacancy(key: string): AngularFireObject<Vacancy> {
    const vacancyPath = `${this.basePath}/${key}`;
    return this.db.object(vacancyPath);
  }

  editVacancy(vacancy: Vacancy): void {
    console.log('edited vacancy data : ', vacancy);
    this.db.list('vacancies')
      .update(vacancy.key, {
        name: vacancy.name,
        department: vacancy.department,
        group: vacancy.group,
        level: vacancy.level,
        quantityAvailable: vacancy.quantityAvailable,
      })
      .then(() => alert('vacancy edition requested: ' + vacancy.key) + ' !');
  }

  deleteVacancy(key: string): void {
    console.log('deteleting vacancy with key: ', key);
    this.db.list('/vacancies/' + key)
      .remove()
      .then(() => alert('vacancy deletion requested: ' + key) + ' !');
  }


}
