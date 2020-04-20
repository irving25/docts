import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';

import { Observable } from 'rxjs';

import { Department } from './../models/department';
import { DepartmentLevel } from './../models/department-level.enum';



@Injectable({
  providedIn: 'root'
})
export class FirebaseDepartmentServiceService {
  private basePath = '/department';
  items: FirebaseListObservable<Department[]> = null; //  list of objects
  item: FirebaseObjectObservable<Department> = null;


  constructor(private db: AngularFireDatabase) {
  }

  createDepartment(department: Department) {
    const departments = this.db.list('department');
    return departments.push({
      name: department.name,
      description: department.description,
      timeStamp: new Date(),
      active: false
    });
  }

  getDepartmentList() {
    return this.db
      .list<Department>('/department');
  }

  getObservableDepartment() {
    return this.db
      .list<Department>('/department')
      .valueChanges();
  }

  getDepartmentsRef(): Observable<any> {
    return this.db
      .list<Department>('/department')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, ...data};
        });
      });
  }

  getDepartmentsStateChanges() {
    return this.db
      .list<Department>('/department')
      .stateChanges();
  }

  getDepartment(key: string): AngularFireObject<Department> {
    const departmentPath = `${this.basePath}/${key}`;
    return this.db.object(departmentPath);
  }

  editDepartment(department: Department): void {
    console.log('edited department data : ', department);
    this.db.list('department')
      .update(department.key, {
        name: department.name,
        description: department.description,
      })
      .then(() => alert('department edition requested: ' + department.key) + ' !');
  }

  deleteDepartment(key: string): void {
    console.log('deteleting department with key: ', key);
    this.db.list('/department/' + key)
      .remove()
      .then(() => alert('department deletion requested: ' + key) + ' !');
  }
}
