import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';

import {Observable} from 'rxjs';

import { Process } from '../../models/process';


@Injectable({
  providedIn: 'root'
})
export class FirebaseProcessServiceService {
  private basePath = '/process';
  items: FirebaseListObservable<Process[]> = null;
  item: FirebaseObjectObservable<Process> = null;


  constructor(private db: AngularFireDatabase) { }

createProcess(process: Process){
  const processs = this.db.list('processs');
  return processs.push({
    fecha_creacion: process.fecha_creacion,
    fecha_modificacion: process.fecha_modificacion,
    estatus_general: process.estatus_general,
    actividad_actual: process.actividad_actual,
    id_reclutador: process.id_reclutador,
    id_candidato: process.id_candidato,
    id_examen: process.id_examen,
    lista_actividades: process.lista_actividades,
  });
}

getProcesssList() {
  return this.db
    .list<Process>('/processs');
}

getObservableProcesss() {
  return this.db
    .list<Process>('/processs')
    .valueChanges();
}

getProcesssRef(): Observable<any> {
  return this.db
    .list<Process>('/processs')
    .snapshotChanges()
    .map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, ...data};
      });
    });
}

getProcesssStateChanges() {
  return this.db
    .list<Process>('/processs')
    .stateChanges();
}
getProcess(key: string): AngularFireObject<Process> {
  const processPath = `${this.basePath}/${key}`;
  return this.db.object(processPath);
}

editProcess(process: Process): void {
  console.log('edited process data : ', process);
  this.db.list('processs')
    .update(process.key, {
      fecha_creacion: process.fecha_creacion,
    fecha_modificacion: process.fecha_modificacion,
    estatus_general: process.estatus_general,
    actividad_actual: process.actividad_actual,
    id_reclutador: process.id_reclutador,
    id_candidato: process.id_candidato,
    id_examen: process.id_examen,
    lista_actividades: process.lista_actividades,
    })
    .then(() => alert('process edition requested: ' + process.key) + ' !');
}

deleteProcess(key: string): void {
  console.log('deteleting process with key: ', key);
  this.db.list('/processs/' + key)
    .remove()
    .then(() => alert('process deletion requested: ' + key) + ' !');
}
}


