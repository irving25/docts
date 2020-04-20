import { DepartmentLevel } from './department-level.enum';

export class Department {

  key: string;
  id: string;
  name: string;
  description: string;
  timeStamp: Date;
  active = true;

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.active = true;
    this.timeStamp = new Date();
  }
}
