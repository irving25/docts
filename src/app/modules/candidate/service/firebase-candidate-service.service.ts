import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';

import {Observable} from 'rxjs';

import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCandidateServiceService {
  private basePath = 'candidate';
  items: FirebaseListObservable<Candidate[]> = null;
  item: FirebaseObjectObservable<Candidate> = null;

  constructor( private db: AngularFireDatabase) { }

  createCandidate(candidate: Candidate){
    const candidates = this.db.list('candidates');
    return candidates.push({
      nombres: candidate.nombres,
      apellidoP: candidate.apellidoP,
      apellidoM: candidate.apellidoM,
      estadoC: candidate.estadoC,
      rfc: candidate.rfc,
      nss: candidate.nss,
      telefonoP: candidate.telefonoP,
      telefonoS: candidate.telefonoS,
      email: candidate.email,
      gradoE: candidate.gradoE,
      titulado: candidate.titulado,
      fecha_egreso: candidate.fecha_egreso,
    });
  }

getCandidatesList() {
  return this.db
    .list<Candidate>('/candidates');
}

getObservableCandidates() {
  return this.db
    .list<Candidate>('/candidates')
    .valueChanges();
}

getCandidatesRef(): Observable<any> {
  return this.db
    .list<Candidate>('/candidates')
    .snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, ...data};
      });
    });
}

getCandidatesStateChanges() {
  return this.db
    .list<Candidate>('/candidates')
    .stateChanges();
}
getCandidate(key: string): AngularFireObject<Candidate> {
  const candidatePath = `${this.basePath}/${key}`;

  return this.db.object(candidatePath);
  }


editCandidate(candidate: Candidate): void {
  console.log('edited candidate data: ', candidate);
  this.db.list('candidates')
  .update(candidate.key, {
    nombres: candidate.nombres,
    apellidoP: candidate.apellidoP,
    apellidoM: candidate.apellidoM,
    estadoC: candidate.estadoC,
    rfc: candidate.rfc,
    nss: candidate.nss,
    telefonoP: candidate.telefonoP,
    telefonoS: candidate.telefonoS,
    email: candidate.email,
    gradoE: candidate.gradoE,
    titulado: candidate.titulado,
    fecha_egreso: candidate.fecha_egreso,
  })
  .then((value) => alert('candidate edition requested: ' + candidate.key) + ' !');
}
deleteCandidate(key: string): void {
  console.log('deteleting candidate with key: ', key);
  this.db.list('/candidates/' + key)
    .remove()
    .then(() => alert('candidate deletion requested: ' + key) + ' !');
}
}
