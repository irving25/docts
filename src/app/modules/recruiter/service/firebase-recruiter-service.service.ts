import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';

import {Observable} from 'rxjs';

import { Recruiter } from '../models/recruiter';


@Injectable({
  providedIn: 'root'
})
export class FirebaseRecruiterServiceService {
  private basePath = '/recruiter';
  items: FirebaseListObservable<Recruiter[]> = null;
  item: FirebaseObjectObservable<Recruiter> = null;


  constructor(private db: AngularFireDatabase) { }

createRecruiter(recruiter: Recruiter) {
  const recruiters = this.db.list('recruiters');
  return recruiters.push({
    namel: recruiter.namel,
    lastname: recruiter.lastname,
    nationality: recruiter.nationality,
    age: recruiter.age,
    gender: recruiter.gender,
    birth_date: recruiter.birth_date,
    rfc: recruiter.rfc,
    ssc: recruiter.ssc,
    start_date_labor: recruiter.start_date_labor,
    end_date_labor: recruiter.end_date_labor,
    active: recruiter.active,
    intern: recruiter.intern,
    phone: recruiter.phone,
    cellphone: recruiter.cellphone,
    social_networks: [],
    reference_people: [],
  });
}

getRecruitersList() {
  return this.db
    .list<Recruiter>('/recruiters');
}

getObservableRecruiters() {
  return this.db
    .list<Recruiter>('/recruiters')
    .valueChanges();
}

getRecruitersRef(): Observable<any> {
  return this.db
    .list<Recruiter>('/recruiters')
    .snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, ...data};
      });
    });
}

getRecuitersStateChanges() {
  return this.db
    .list<Recruiter>('/recruiters')
    .stateChanges();
}
getRecruiter(key: string): AngularFireObject<Recruiter> {
  const recruiterPath = `${this.basePath}/${key}`;
  return this.db.object(recruiterPath);
}

editRecruiter(recruiter: Recruiter): void {
  console.log('edited recruiter data : ', recruiter);
  this.db.list('recruiters')
    .update(recruiter.key, {
      namel: recruiter.namel,
      lastname: recruiter.lastname,
      nationality: recruiter.nationality,
      age: recruiter.age,
      gender: recruiter.gender,
      birth_date: recruiter.birth_date,
      rfc: recruiter.rfc,
      ssc: recruiter.ssc,
      start_date_labor: recruiter.start_date_labor,
      end_date_labor: recruiter.end_date_labor,
      active: recruiter.active,
      intern: recruiter.intern,
      phone: recruiter.phone,
      cellphone: recruiter.cellphone,
      social_networks: [],
      reference_people: [],
    })
    .then(() => alert('recrter edition requested: ' + recruiter.key) + ' !');
}

deleteRecruiter(key: string): void {
  console.log('deteleting recruiter with key: ', key);
  this.db.list('/recruiters/' + key)
    .remove()
    .then(() => alert('recruiter deletion requested: ' + key) + ' !');
}
}
