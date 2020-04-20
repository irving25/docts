import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';

import { Observable } from 'rxjs';

import { Group } from './../models/group';
import { GroupLevel } from './../models/group-level.enum';


@Injectable({
  providedIn: 'root'
})
export class FirebaseGroupServiceService {
  private basePath = '/group';
  items: FirebaseListObservable<Group[]> = null; //  list of objects
  item: FirebaseObjectObservable<Group> = null;

  constructor(private db: AngularFireDatabase) {
   }

   createGroup(group: Group) {
    const groups = this.db.list('group');
    return groups.push({
      name: group.name,
      description: group.description,
      timeStamp: new Date(),
      active: false
    });
  }

  getGroupList() {
    return this.db
      .list<Group>('/group');
  }

  getObservableGroup() {
    return this.db
      .list<Group>('/group')
      .valueChanges();
  }

  getGroupsRef(): Observable<any> {
    return this.db
      .list<Group>('/group')
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return {key, ...data};
        });
      });
  }

  getGroupsStateChanges() {
    return this.db
      .list<Group>('/group')
      .stateChanges();
  }

  getGroup(key: string): AngularFireObject<Group> {
    const groupPath = `${this.basePath}/${key}`;
    return this.db.object(groupPath);
  }

  editGroup(group: Group): void {
    console.log('edited group data : ', group);
    this.db.list('group')
      .update(group.key, {
        name: group.name,
        description: group.description,
      })
      .then(() => alert('group edition requested: ' + group.key) + ' !');
  }

  deleteGroup(key: string): void {
    console.log('deteleting group with key: ', key);
    this.db.list('/group/' + key)
      .remove()
      .then(() => alert('group deletion requested: ' + key) + ' !');
  }

}
