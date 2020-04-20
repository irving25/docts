import { GroupLevel } from './group-level.enum';


export class Group {
  key: string;
  id: string;
  name: string;
  description: string;
  timeStamp: Date;
  active: boolean;
  /*
  softSkill: string[];
  hardSkill: string[];
  // tslint:disable-next-line:ban-types
  salaryRange: number [];

  group: any;
*/

  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.active = false;
    this.timeStamp = new Date();
  }

}
